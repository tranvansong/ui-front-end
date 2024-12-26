import React, { useEffect, useState } from "react"; 
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/client/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { authMessage, setAuthMessage, login } = useAuth();

  useEffect(() => {
    if (authMessage) {
      const timer = setTimeout(() => setAuthMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [authMessage, setAuthMessage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (error) {
      console.error("Đăng nhập thất bại:", error);
      setError("Đăng nhập không thành công. Vui lòng kiểm tra lại email và mật khẩu.");
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
          <Link
            to="/home"
            className="bg-white text-slate-900 font-semibold rounded-3xl py-4 px-10 hover:bg-slate-900 hover:text-white transition duration-300"
          >
            Khám phá cửa hàng
          </Link>
        </div>
      </div>

      <div className="lg:p-36 md:p-52 sm:p-20 p-8 w-full lg:w-1/2">
        <h1 className="text-2xl font-semibold mb-4">Đăng nhập</h1>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        {authMessage && <div className="text-red-500 mb-2">{authMessage}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">
              Email <span className="text-orange">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
            />
          </div>
          <div className="mb-6 text-blue-500">
            <Link to="/forgot-password" className="hover:underline">
              Quên mật khẩu?
            </Link>
          </div>
          <button
            type="submit"
            className="bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-md py-2 px-4 w-full"
          >
            Đăng nhập
          </button>
        </form>
        <div className="mt-6 text-green-500 text-center">
          <span>Bạn chưa có tài khoản ?</span>
          <Link to="/register" className="hover:underline text-blue-600 ml-2">
            Đăng ký ngay
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
