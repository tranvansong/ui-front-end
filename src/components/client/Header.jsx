import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import AccessibleForwardIcon from "@mui/icons-material/AccessibleForward";
import { useAuth } from "../../context/client/AuthContext";
import { getCartByUserId } from "../../api/carts/cart";

const Header = () => {
  const { user, logout } = useAuth();
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef(null);
  const navigate = useNavigate();
  console.log(user);

  const [cartLength, setCartLength] = useState(0);
  useEffect(() => {
    const fetchCart = async () => {
      const cartData = await getCartByUserId(user?.userId);
      setCartLength(cartData.cartItemsResponse.length);
    }
    fetchCart();
  }, []);

  const handleClickOutside = (event) => {
    if (
      profileDropdownRef.current &&
      !profileDropdownRef.current.contains(event.target)
    ) {
      setIsProfileDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/all-products?keyword=${searchQuery}`);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between px-12 py-2 gap-10 text-lg bg-slate-100">
        <div>
          <Link to="/home" className="font-extrabold text-3xl">
            SHOP. CLOTHES
          </Link>
        </div>
        <div>
          <nav className="flex items-center text-white font-semibold">
            <ul className="flex space-x-2">
              <li className="p-3 text-slate-700 hover:text-gray-500 transition-all">
                <Link to="/home">Trang chủ</Link>
              </li>
              <li
                className="relative inline-block p-3 text-slate-700 hover:text-gray-500 transition-all"
                onMouseEnter={() => setIsProductDropdownOpen(true)}
                onMouseLeave={() => setIsProductDropdownOpen(false)}
              >
                <div className="cursor-pointer">
                  Cửa hàng
                  <KeyboardArrowDownIcon />
                </div>
                {isProductDropdownOpen && (
                  <div className="absolute bg-gray-100 min-w-40 z-10 shadow-lg rounded-sm overflow-hidden">
                    <Link
                      to="/all-products"
                      className="block text-lg py-2 px-3 text-slate-700 transition-all hover:bg-gray-200"
                    >
                      Tất cả sản phẩm
                    </Link>
                    <a
                      href="#home"
                      className="block text-lg py-2 px-3 text-slate-700 transition-all hover:bg-gray-200"
                    >
                      Xu hướng
                    </a>
                  </div>
                )}
              </li>
              <li className="p-3 text-slate-700 hover:text-gray-500 transition-all">
                <Link to="/contact">Liên hệ</Link>
              </li>
              <li className="p-3 text-slate-700 hover:text-gray-500 transition-all">
                <Link to="/about">Về chúng tôi</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="w-1/4">
          <form onSubmit={handleSearchSubmit}>
            <label
              htmlFor="search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only"
            >
              Tìm kiếm
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <SearchIcon style={{ fontSize: "25px" }} />
              </div>
              <input
                type="search"
                id="search"
                className="w-full p-2 pl-12 text-lg text-gray-900 border border-slate-500 rounded-md outline-none"
                placeholder="Tìm sản phẩm ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1"
              >
                Search
              </button>
            </div>
          </form>
        </div>
        <div className="flex items-center gap-5">
          <Link to="/cart" className="relative cursor-pointer">
            <LocalMallOutlinedIcon
              style={{ fontSize: "30px", color: "black" }}
            />
            <span className="absolute animate-bounce right-0 top-1 w-4 h-4 place-content-center text-center rounded-full bg-yellow text-xs">
              {cartLength}
            </span>
          </Link>

          {user ? (
            <div className="relative" ref={profileDropdownRef}>
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <AccessibleForwardIcon />
                <KeyboardArrowDownOutlinedIcon />
              </button>
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-4 text-sm bg-slate-50 rounded-lg shadow-lg py-2">
                  <button className="flex items-center px-4 py-2 hover:bg-gray-100 w-full">
                    {user.email}
                  </button>
                  <Link to="/order-history" className="px-4 py-2 hover:bg-gray-100 w-full cursor-pointer">Lịch sử mua hàng</Link>
                  {user.role === "ADMIN" && (
                    <Link
                      to="/admin/dashboard"
                      className="flex items-center px-4 py-2 hover:bg-gray-100 w-full"
                    >
                      Dashboard
                    </Link>
                  )}
                  <button
                    className="flex items-center px-4 py-2 hover:bg-gray-100 w-full text-red-600"
                    onClick={logout}
                  >
                    <LogoutOutlinedIcon className="mr-2" /> Đăng xuất
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="cursor-pointer">
              <AccountCircleOutlinedIcon style={{ fontSize: "30px" }} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
