// components/admin/Header.js
import React from "react";
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useAuth } from "../../context/client/AuthContext";

const Header = ({ isProfileDropdownOpen, setIsProfileDropdownOpen }) => {
  const { user, logout } = useAuth();
  console.log(user)
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="flex items-center justify-between px-6 py-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          Giao diện quản lý
        </h2>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full bg-gray-100 transition duration-300 hover:bg-gray-500">
            <NotificationsOutlinedIcon style={{ fontSize: "25px" }} />
          </button>
          <div className="relative">
            <button
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              className="flex items-center space-x-3 focus:outline-none"
            >
              <span className="font-medium">{user?.email}</span>
              <KeyboardArrowDownOutlinedIcon />
            </button>
            {isProfileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                <button className="flex items-center px-4 py-2 hover:bg-gray-100 w-full">
                  <SettingsOutlinedIcon className="mr-2" /> Settings
                </button>
                <button className="flex items-center px-4 py-2 hover:bg-gray-100 w-full text-red-600">
                  <LogoutOutlinedIcon onClick={logout} className="mr-2" /> Đăng xuất
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
