import React, { useState } from "react";
import { Link } from "react-router-dom";
import {forgotPassword} from "../../api/auth"
const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(""); 
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");
    try {
      const response = await forgotPassword(email);
      console.log(response)
      setMessage(response);
    } catch (err) {
      setError(err?.data|| "Đã có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  return (
    <div className="bg-slate-200 flex justify-center items-center max-h-screen overflow-hidden">
      <div className="w-1/2 h-screen hidden lg:block relative">
        <img
          src="https://antonovich-design.ae/uploads/page/2022/4/antonovich-design-2022Bet5IXmKRFzW.webp"
          className="object-cover w-full h-full"
        />
        <div className="absolute top-4 left-4 text-3xl font-bold text-white">
          SHOP.CLOTHES
        </div>
        <div className="absolute inset-0 flex justify-center items-center">
          <Link
            to="/home"
            className="bg-white text-slate-900 font-semibold rounded-3xl py-4 px-10 hover:bg-slate-900 hover:text-white transition duration-300"
          >
            Khám phá cửa hàng
          </Link>
        </div>
      </div>

      <div className="lg:p-36 md:p-52 sm:p-20 p-8 w-full lg:w-1/2">
        <h1 className="text-2xl font-semibold mb-4">Quên mật khẩu</h1>
        <p className="text-gray-600 mb-2">
          Vui lòng nhập email của bạn để chúng tôi có thể gửi lại mật khẩu.
        </p>
        <div className="mb-4">
        {message && <p className="text-green">{message}</p>}
        {error && <p className="text-red-600">{error}</p>}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">
              Email <span className="text-orange">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email} // Liên kết với state email
              onChange={(e) => setEmail(e.target.value)} // Cập nhật state email
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-md py-2 px-4 w-full mt-4"
          >
            Gửi yêu cầu
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/login" className="hover:underline text-blue-600">
            Quay lại trang đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
