import React, { useState, useEffect } from "react";
import Header from "../../components/client/Header";
import Footer from "../../components/client/Footer";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/client/AuthContext";
import { getOrdersByUserId } from "../../api/order/order";

export const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // Dùng để lọc đơn hàng
  const navigate = useNavigate();
  const { user } = useAuth();
  const userId = user?.userId;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await getOrdersByUserId(userId);
        setOrders(response);
        console.log(response)
      } catch (error) {
        console.error("Error fetching order history:", error);
        toast.error("Không thể tải lịch sử đơn hàng");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  const handleViewOrder = (orderCode) => {
    navigate(`/order-detail/${orderCode}`);
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.orderCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const statusMapping = {
    PENDING: "Đang chờ xử lý",
    CONFIRMED: "Đã xác nhận",
    DELIVERED: "Đã giao hàng",
    DELIVERING: "Đang giao hàng",
    CANCELLED: "Đã hủy",
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-amber-200 text-amber-800";
      case "CONFIRMED":
        return "bg-purple-200 text-purple-800";
      case "DELIVERED":
        return "bg-blue-200 text-blue-800";
      case "DELIVERING":
        return "bg-emerald-200 text-emerald-800";
      case "CANCELLED":
        return "bg-red-200 text-red-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <div>
      <Header />
      <main className="p-6 bg-gray-50">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Lịch Sử Đơn Hàng
        </h1>

        <div className="mb-4 flex justify-center">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm kiếm theo mã đơn hàng hoặc trạng thái"
            className="w-1/2 p-2 border border-gray-300 outline-none rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {loading ? (
          <div className="text-center">Đang tải...</div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center text-gray-600">
            Bạn chưa có đơn hàng nào hoặc không tìm thấy kết quả.
          </div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow-md">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-3 text-left">Mã Đơn Hàng</th>
                  <th className="border p-3 text-left">Ngày Đặt</th>
                  <th className="border p-3 text-left">Trạng Thái</th>
                  <th className="border p-3 text-left">Tổng Tiền</th>
                  <th className="border p-3 text-center">Hành Động</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.orderId} className="hover:bg-gray-50">
                    <td className="border p-3">{order.orderCode}</td>
                    <td className="border p-3">
                      {order.orderDate}
                    </td>
                    <td className="border p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {statusMapping[order.status] || "Không xác định"}
                      </span>
                    </td>
                    <td className="border p-3">
                      {order.totalPayment.toLocaleString()} VND
                    </td>
                    <td className="border p-3 text-center">
                      <button
                        onClick={() => handleViewOrder(order.orderCode)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
                      >
                        Xem Chi Tiết
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};
