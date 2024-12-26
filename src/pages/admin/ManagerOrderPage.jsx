import React, { useEffect, useState } from "react";
import Sidebar from "../../components/admin/SideBar";
import Header from "../../components/admin/Header";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllOrders } from "../../api/order/order";
import { useNavigate } from "react-router-dom";

const ManagerOrderPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const [orders, setOrders] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getAllOrders();
        setOrders(data);
      } catch (error) {
        toast.error(error.data)
      }
    };
    fetchOrders();
  }, []);
  // Filter orders based on search term
  const filteredOrders = orders.filter(
    (order) =>
      order.orderCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleViewOrderDetails = (orderCode) => {
    navigate(`/admin/orders/order-details/${orderCode}`)
  };

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

  const formatCurrency = (amount) => {
    return amount.toLocaleString();
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          isProfileDropdownOpen={isProfileDropdownOpen}
          setIsProfileDropdownOpen={setIsProfileDropdownOpen}
        />
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl font-semibold mb-6 text-gray-800">
              Quản lý Đơn Hàng
            </h1>

            <div className="mb-4">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Tìm kiếm theo Mã Đơn Hàng hoặc Số điện thoại"
                className="w-full border px-4 py-2 outline-none rounded-md focus:ring-2 focus:ring-blue-300"
              />
            </div>

            {/* Orders table */}
            <table className="min-w-full bg-white table-auto shadow-md rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-3 text-left text-gray-700 border-b">
                    Mã Đơn Hàng
                  </th>
                  <th className="px-4 py-3 text-left text-gray-700 border-b">
                    Khách Hàng
                  </th>
                  <th className="px-4 py-3 text-left text-gray-700 border-b">
                    Số Điện Thoại
                  </th>
                  <th className="px-4 py-3 text-left text-gray-700 border-b">
                    Tổng Tiền
                  </th>
                  <th className="px-4 py-3 text-left text-gray-700 border-b">
                    Trạng Thái
                  </th>
                  <th className="px-4 py-3 text-left text-gray-700 border-b">
                    Ngày Đặt
                  </th>
                  <th className="px-4 py-3 text-left text-gray-700 border-b">
                    Hành Động
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 border-b text-gray-700">
                        {order.orderCode}
                      </td>
                      <td className="px-4 py-3 border-b text-gray-700">
                        {order.receiverName}
                      </td>
                      <td className="px-4 py-3 border-b text-gray-700">
                        {order.phoneNumber}
                      </td>
                      <td className="px-4 py-3 border-b text-gray-700">
                        {formatCurrency(order.totalPayment)} VND
                      </td>
                      <td className="px-4 py-3 border-b">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {statusMapping[order.status] || "Không xác định"}
                        </span>
                      </td>
                      <td className="px-4 py-3 border-b text-gray-700">
                        {order.orderDate}
                      </td>
                      <td className="px-4 py-3 border-b">
                        <button
                          onClick={() => handleViewOrderDetails(order.orderCode)}
                          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
                        >
                          Xem Chi Tiết
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-4 py-2 text-center border-b text-gray-500"
                    >
                      Không có đơn hàng nào
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
      <ToastContainer position="top-right" autoClose={1000} />
    </div>
  );
};

export default ManagerOrderPage;
