import React from "react";
import Header from "../../components/client/Header";
import Footer from "../../components/client/Footer";
import { Link, useParams } from "react-router-dom";

export const OrderSuccessPage = () => {
  const { orderCode } = useParams();

  return (
    <div>
      <Header />
      <main className="bg-gray-50 flex flex-col items-center justify-center p-6">
        <div className="bg-white p-8 shadow-md rounded-lg w-full max-w-lg text-center">
          <h1 className="text-3xl font-bold text-green-600 mb-4">Đặt Hàng Thành Công!</h1>
          <p className="text-xl mb-6">Cảm ơn bạn đã đặt hàng tại cửa hàng chúng tôi.</p>
          <p className="text-lg mb-6">
            Mã đơn hàng của bạn là: <span className="font-bold text-blue-500">{orderCode}</span>
          </p>
          <p className="text-lg mb-4">Chúng tôi sẽ xử lý đơn hàng và thông báo cho bạn khi có cập nhật mới.</p>
          
          <div className="flex justify-center gap-4 mt-6">
            <a
              href="/"
              className="px-6 py-3 bg-blue-500 text-white rounded-lg text-lg hover:bg-blue-600"
            >
              Quay lại trang chủ
            </a>
            <Link
              to={`/order-detail/${orderCode}`}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg text-lg hover:bg-gray-300"
            >
              Xem đơn hàng của tôi
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
