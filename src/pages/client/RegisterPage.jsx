import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // import useNavigate
import { register } from "../../api/auth";

const RegisterPage = () => {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // tạo đối tượng navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const repeatPassword = e.target.repeatPassword.value;

    // Kiểm tra mật khẩu và nhập lại mật khẩu có khớp không
    if (password !== repeatPassword) {
      setError("Mật khẩu và mật khẩu nhập lại không khớp.");
      return;
    }

    // Kiểm tra mật khẩu có ít nhất 6 ký tự không
    if (password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự.");
      return;
    }

    try {
      const result = await register(email, password, repeatPassword);
      console.log(result);
      if (result) {
        setSuccess("Đăng ký thành công! Quay lại trang đăng nhập");
        setError(null);
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (error) {
      console.log(error);
      setError(error.data);
      setSuccess(null);
    }
  };

  return (
    <div className="bg-slate-200 flex justify-center items-center max-h-screen overflow-hidden">
      <div className="w-1/2 h-screen hidden lg:block relative">
        <img
          src="https://antonovich-design.ae/uploads/page/2022/4/antonovich-design-2022Bet5IXmKRFzW.webp"
          alt="Placeholder"
          className="object-cover w-full h-full"
        />

        <div className="absolute top-4 left-4 text-white text-3xl font-bold">
          SHOP.CLOTHES
        </div>

        <div className="absolute inset-0 flex justify-center items-center">
          <Link to='/home' className="bg-white text-slate-900 font-semibold rounded-3xl py-4 px-10 hover:bg-slate-900 hover:text-white transition duration-300">
            Khám phá cửa hàng
          </Link>
        </div>
      </div>

      <div className="lg:p-36 md:p-52 sm:p-20 p-8 w-full lg:w-1/2">
        <h1 className="text-2xl font-semibold mb-4">Đăng ký tài khoản</h1>
        {success && <div className="my-4 text-green">{success}</div>}
        {error && <div className="my-4 text-red-500">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">
              Email <span className="text-orange">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-800">
              Mật khẩu <span className="text-orange">*</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="repeatPassword" className="block text-gray-800">
              Nhập lại mật khẩu <span className="text-orange">*</span>
            </label>
            <input
              type="password"
              id="repeatPassword"
              name="repeatPassword"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
            />
          </div>
          <button
            type="submit"
            className="bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-md py-2 px-4 w-full mt-4"
          >
            Đăng ký
          </button>
        </form>
        <div className="mt-6 text-green-500 text-center">
          <span>Bạn đã có tài khoản ?</span>
          <Link to='/login' className="hover:underline text-blue-600 ml-2">
            Đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
