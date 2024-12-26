import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../../api/auth";

const ResetPasswordPage = () => {
  const location = useLocation();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }

    try {
      const response = await resetPassword(token, newPassword);
      console.log(response);
      setSuccess("Đặt lại mật khẩu thành công!");
      setError("");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.log(err)
      setError(
        err?.data || "Có lỗi xảy ra. Vui lòng thử lại."
      );
      setSuccess("");
    }
  };

  return (
    <div className="bg-slate-50 flex justify-center items-center max-h-screen overflow-hidden">
      <div className="w-1/2 h-screen hidden lg:block relative">
        <img
          src="https://antonovich-design.ae/uploads/page/2022/4/antonovich-design-2022Bet5IXmKRFzW.webp"
          className="object-cover w-full h-full"
        />
        <div className="absolute top-4 left-4 text-white text-3xl font-bold">
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
        <h1 className="text-2xl font-semibold mb-4">Đặt lại mật khẩu</h1>
        <p className="text-gray-600 mb-6">
          Nhập mật khẩu mới của bạn để đặt lại.
        </p>

        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green mb-4">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-gray-600">
              Mật khẩu mới <span className="text-orange">*</span>
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-600">
              Xác nhận mật khẩu <span className="text-orange">*</span>
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-md py-2 px-4 w-full mt-4"
          >
            Đặt lại mật khẩu
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

export default ResetPasswordPage;
