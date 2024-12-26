import React, { useState, useEffect } from "react";
import Sidebar from "../../components/admin/SideBar";
import Header from "../../components/admin/Header";
import { useParams } from "react-router-dom";
import {
  cancelOrder,
  confirmOrder,
  deliveredOrder,
  deliveringOrder,
  getOrderByOrderCode,
} from "../../api/order/order";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManagerOrderDetailPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [orderDetail, setOrderDetail] = useState(null);
  const { orderCode } = useParams();
  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const data = await getOrderByOrderCode(orderCode);
        setOrderDetail(data);
      } catch (error) {
        toast.error("Không thể tải dữ liệu đơn hàng");
      }
    };

    fetchOrderDetail();
  }, [orderCode]);

  const handleConfirmOrder = async () => {
    try {
      await confirmOrder(orderCode);
      const data = await getOrderByOrderCode(orderCode);
      setOrderDetail(data);
      toast.success("Đơn hàng đã được xác nhận!");
    } catch (error) {
      console.error(error);
      toast.error(error.data.message);
    }
  };

  const handleUpdateShipping = async () => {
    try {
      await deliveringOrder(orderCode);
      const data = await getOrderByOrderCode(orderCode);
      setOrderDetail(data);
      toast.success("Trạng thái đơn hàng đã cập nhật thành Đang giao!");
    } catch (error) {
      console.error(error);
      toast.error(error.data.message);
    }
  };

  const handleDeliveredOrder = async () => {
    try {
      await deliveredOrder(orderCode);
      const data = await getOrderByOrderCode(orderCode);
      setOrderDetail(data);
      toast.success("Trạng thái đơn hàng đã giao!");
    } catch (error) {
      console.error(error);
      toast.error(error.data.message);
    }
  }

  const handleCancelOrder = async () => {
    try {
      await cancelOrder(orderCode);
      const data = await getOrderByOrderCode(orderCode);
      setOrderDetail(data);
      toast.success("Đơn hàng đã được hủy!");
    } catch (error) {
      console.error(error);
      toast.error(error.data.response);
    }
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

  if (!orderDetail) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Đang tải...</div>
      </div>
    );
  }

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
          <div className="bg-white shadow-md rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-4">Chi Tiết Đơn Hàng</h1>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <p>
                <strong>Mã đơn hàng:</strong> {orderCode}
              </p>
              <p>
                <strong>Trạng thái:</strong>{" "}
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                    orderDetail.status
                  )}`}
                >
                  {statusMapping[orderDetail.status] || "Không xác định"}
                </span>
              </p>
              <p>
                <strong>Người nhận:</strong> {orderDetail.receiverName}
              </p>
              <p>
                <strong>Số điện thoại:</strong> {orderDetail.phoneNumber}
              </p>
              <p>
                <strong>Địa chỉ:</strong> {orderDetail.address}
              </p>
              <p>
                <strong>Ngày đặt:</strong> {orderDetail.orderDate}
              </p>
              {orderDetail.status === "CANCELLED" && (
                <p>
                  <strong>Ngày hủy:</strong>{" "}
                  {orderDetail.cancelDate || "Không xác định"}
                </p>
              )}
            </div>

            {/* Danh sách sản phẩm */}
            <h2 className="text-xl font-semibold mb-4">Danh Sách Sản Phẩm</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">Hình ảnh</th>
                    <th className="border px-4 py-2">Tên sản phẩm</th>
                    <th className="border px-4 py-2">Màu sắc</th>
                    <th className="border px-4 py-2">Số lượng</th>
                    <th className="border px-4 py-2">Size</th>
                    <th className="border px-4 py-2">Giá</th>
                    <th className="border px-4 py-2">Tổng</th>
                  </tr>
                </thead>
                <tbody>
                  {orderDetail.orderItemsResponse.map((item) => (
                    <tr key={item.id}>
                      <td className="border px-4 py-2">
                        <img
                          src={item.imageUrl}
                          alt={item.productName}
                          className="w-16 h-16 object-cover"
                        />
                      </td>
                      <td className="border px-4 py-2">{item.productName}</td>
                      <td className="border px-4 py-2 text-center">
                        {item.color}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {item.quantity}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {item.size}
                      </td>
                      <td className="border px-4 py-2">
                        {item.price.toLocaleString("vi-VN")} VND
                      </td>
                      <td className="border px-4 py-2">
                        {(item.price * item.quantity).toLocaleString("vi-VN")}{" "}
                        VND
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Tổng giá và phí vận chuyển */}
            <div className="flex justify-between items-center mt-6 border-t pt-4">
              <div>
                <p>
                  <strong>Phí vận chuyển:</strong>{" "}
                  {orderDetail.shippingFee.toLocaleString("vi-VN")} VND
                </p>
                <p className="mt-2 text-lg font-bold">
                  Tổng cộng: {orderDetail.totalPayment.toLocaleString("vi-VN")}{" "}
                  VND
                </p>
              </div>
            </div>

            {/* Nút chức năng */}
            <div className="flex gap-4 mt-6">
              {orderDetail.status === "PENDING" && (
                <button
                  onClick={handleConfirmOrder}
                  className="bg-greenlight text-white px-4 py-2 rounded hover:bg-green"
                >
                  Xác nhận đơn hàng
                </button>
              )}
              {orderDetail.status === "DELIVERING" && (
                <button
                  onClick={handleDeliveredOrder}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Xác nhận đã giao hàng
                </button>
              )}
              
              {orderDetail.status === "CONFIRMED" && (
                <button
                  onClick={handleUpdateShipping}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Xác nhận đang giao hàng
                </button>
              )}
              {orderDetail.status === "DELIVERED" || orderDetail.status !== "CANCELLED" && (
                <button
                  onClick={handleCancelOrder}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Hủy đơn hàng
                </button>
              )}
            </div>
          </div>
        </main>
      </div>
      <ToastContainer position="top-right" autoClose={1000} />
    </div>
  );
};

export default ManagerOrderDetailPage;
