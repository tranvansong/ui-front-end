import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/client/Header";
import Footer from "../../components/client/Footer";
import { cancelOrder, getOrderByOrderCode } from "../../api/order/order";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmDeletePopup from "../../components/admin/ConfirmDeletePopup";

const OrderDetailPage = () => {
  const { orderCode } = useParams();
  const [orderDetail, setOrderDetail] = useState(null);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const data = await getOrderByOrderCode(orderCode);
        setOrderDetail(data);
      } catch (error) {
        toast.error(error.data);
      }
    };

    fetchOrderDetail();
  }, [orderCode]);

  const handleCancelOrderClick = () => {
    setIsConfirmDeleteOpen(true);
  };
  const handleCancelDelete = () => {
    setIsConfirmDeleteOpen(false);
  };

  const handleCancelOrder = async () => {
    try {
      await cancelOrder(orderCode);
      setIsConfirmDeleteOpen(false);
      toast.success("Đơn hàng đã được hủy thành công!");
      const data = await getOrderByOrderCode(orderCode);
      setOrderDetail(data);
    } catch (error) {
      toast.error("Hủy đơn hàng thất bại. Vui lòng thử lại!");
    }
  };

  if (!orderDetail) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Đang tải...</div>
      </div>
    );
  }

  const {
    status,
    totalPayment,
    receiverName,
    phoneNumber,
    email,
    address,
    orderMethod,
    shippingMethod,
    shippingFee,
    orderDate,
    cancelDate,
    orderItemsResponse,
  } = orderDetail;

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
        <h1 className="text-3xl font-bold text-center mb-6">
          Chi Tiết Đơn Hàng
        </h1>

        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Thông Tin Đơn Hàng</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p>
              <strong>Mã đơn hàng:</strong> {orderCode}
            </p>
            <p>
              <strong>Trạng thái:</strong>{" "}
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                  status
                )}`}
              >
                {statusMapping[status] || "Không xác định"}
              </span>
            </p>
            <p>
              <strong>Tổng tiền:</strong> {totalPayment.toLocaleString()} VND
            </p>
            <p>
              <strong>Phí vận chuyển:</strong> {shippingFee.toLocaleString()}{" "}
              VND
            </p>
            <p>
              <strong>Người nhận:</strong> {receiverName}
            </p>
            <p>
              <strong>Số điện thoại:</strong> {phoneNumber}
            </p>
            <p>
              <strong>Email:</strong> {email}
            </p>
            <p>
              <strong>Địa chỉ:</strong> {address}
            </p>
            <p>
              <strong>Phương thức thanh toán:</strong> {orderMethod}
            </p>
            <p>
              <strong>Phương thức vận chuyển:</strong> {shippingMethod}
            </p>
            <p>
              <strong>Ngày đặt:</strong> {orderDate}
            </p>
            {cancelDate && (
              <p>
                <strong>Ngày hủy:</strong> {cancelDate}
              </p>
            )}
          </div>
          {status === "PENDING" && (
            <div className="mt-4">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={handleCancelOrderClick}
              >
                Hủy Đơn Hàng
              </button>
            </div>
          )}
        </div>

        {/* Danh sách sản phẩm */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Sản Phẩm</h2>
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2">Hình Ảnh</th>
                <th className="border border-gray-300 p-2">Tên Sản Phẩm</th>
                <th className="border border-gray-300 p-2">Màu</th>
                <th className="border border-gray-300 p-2">Size</th>
                <th className="border border-gray-300 p-2">Số Lượng</th>
                <th className="border border-gray-300 p-2">Giá</th>
              </tr>
            </thead>
            <tbody>
              {orderItemsResponse.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-2">
                    <img
                      src={item.imageUrl}
                      alt={item.productName}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    {item.productName}
                  </td>
                  <td className="border border-gray-300 p-2">{item.color}</td>
                  <td className="border border-gray-300 p-2">{item.size}</td>
                  <td className="border border-gray-300 p-2">
                    {item.quantity}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {item.price.toLocaleString()} VND
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ConfirmDeletePopup
          isOpen={isConfirmDeleteOpen}
          onConfirm={handleCancelOrder}
          onCancel={handleCancelDelete}
          itemType={"Đơn hàng"}
        />
        <ToastContainer position="top-right" autoClose={1000} />
      </main>
      <Footer />
    </div>
  );
};

export default OrderDetailPage;
