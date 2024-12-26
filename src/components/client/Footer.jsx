import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import visaImage from "../../assets/visa.png";
import mastercardImage from "../../assets/mastercard.png";
import paypalImage from "../../assets/paypal.png";
import applePayImage from "../../assets/applepay.png";
import ggPayImage from "../../assets/ggpay.png";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/client/AuthContext";

const Footer = () => {
  const { user, logout } = useAuth();

  // Handle logout action
  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <div className="flex justify-between mx-12 bg-slate-950 px-10 py-6 gap-10 rounded-lg">
        <h1 className="w-1/3 text-white text-4xl font-extrabold leading-tight">
          CẬP NHẬT VỀ ƯU ĐÃI MỚI NHẤT CỦA CHÚNG TÔI
        </h1>
        <form className="text-sm">
          <input
            type="email"
            placeholder="Nhập email"
            className="text-gray-900 w-full border border-slate-500 rounded-2xl outline-none px-4 py-3"
          />
          <button
            className="text-gray-900 font-bold w-full border mt-5 bg-white border-slate-500 rounded-2xl outline-none px-4 py-3"
            type="submit"
          >
            Đăng ký nhận thông tin
          </button>
        </form>
      </div>
      <div className="bg-slate-50 px-12">
        <div className="flex pt-10 space-x-10">
          <div className="w-1/4">
            <Link to="/home" className="font-extrabold text-3xl mb-5">
              SHOP. CLOTHES
            </Link>
            <div className="mb-5">
              Chúng tôi có những bộ quần áo phù hợp với phong cách của bạn và
              bạn có thể tự hào khi mặc. Từ phụ nữ đến đàn ông.
            </div>
            <ul className="flex items-center justify-start space-x-5">
              <li className="my-3">
                <a
                  href="https://www.facebook.com/tranvan.song2706"
                  target="_blank"
                  className="hover:text-blue-950"
                >
                  <FacebookIcon style={{ fontSize: "30px" }} />
                </a>
              </li>
              <li className="my-3">
                <a
                  href="https://www.instagram.com/brave_bumblebee27/"
                  target="_blank"
                  className="hover:text-red-950"
                >
                  <InstagramIcon style={{ fontSize: "30px" }} />
                </a>
              </li>
              <li className="my-3">
                <a
                  href="https://x.com/nonameboy22933"
                  target="_blank"
                  className="hover:text-slate-950"
                >
                  <XIcon style={{ fontSize: "30px" }} />
                </a>
              </li>
            </ul>
          </div>
          <div className="w-1/5">
            <div className="uppercase text-lg mb-5 font-bold">Cửa hàng</div>
            <ul>
              <li className="my-3">
                <Link to="/about" className="hover:text-slate-950">
                  Về chúng tôi
                </Link>
              </li>
              <li className="my-3">
                <a href="#" className="hover:text-slate-950">
                  Tính năng
                </a>
              </li>
              <li className="my-3">
                <Link to="/feedback" className="hover:text-slate-950">
                  Feedback
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-1/5">
            <div className="uppercase text-lg mb-5 font-bold">Cá nhân</div>
            <ul>
              <li className="my-3">
                {user ? (
                  // Hiển thị "Đăng xuất" nếu người dùng đã đăng nhập
                  <button onClick={handleLogout} className="hover:text-slate-950">
                    Đăng xuất
                  </button>
                ) : (
                  // Nếu chưa đăng nhập, hiển thị "Đăng nhập"
                  <Link to="/login" className="hover:text-slate-950">
                    Đăng nhập
                  </Link>
                )}
              </li>
              <li className="my-3">
                <a href="#" className="hover:text-slate-950">
                  Giỏ hàng
                </a>
              </li>
            </ul>
          </div>
          <div className="w-1/4">
            <div className="uppercase text-lg mb-5 font-bold">Liên hệ</div>
            <ul>
              <li className="my-3">
                <span className="hover:text-slate-950">
                  Email: songtv.b20cn570@stu.ptit.edu.vn
                </span>
              </li>
              <li className="my-3">
                <span className="hover:text-slate-950">
                  Số điện thoại: 01234 567890
                </span>
              </li>
              <li className="my-3">
                <span className="hover:text-slate-950">
                  Địa chỉ: Học viện công nghệ Bưu Chính Viễn Thông, Hà Đông, Hà
                  Nội
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-full h-px bg-slate-200 mt-10"></div>
        <div className="flex justify-end">
          <div className="flex justify-between items-center w-1/5 my-5">
            <img
              className="w-9 h-3 object-contain"
              src={visaImage}
              alt="visa logo"
            />
            <img
              className="w-9 h-3 object-contain"
              src={mastercardImage}
              alt="mastercard logo"
            />
            <img
              className="w-9 h-5 object-contain"
              src={paypalImage}
              alt="paypal logo"
            />
            <img
              className="w-9 h-3 object-contain"
              src={applePayImage}
              alt="apple logo"
            />
            <img
              className="w-9 h-3 object-contain"
              src={ggPayImage}
              alt="googlepay logo"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
