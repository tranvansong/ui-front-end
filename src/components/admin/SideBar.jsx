import React from "react";
import { Link, NavLink } from "react-router-dom";
import NavItem from "./NavItem";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import BakeryDiningOutlinedIcon from '@mui/icons-material/BakeryDiningOutlined';

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => (
  <aside
    className={`${
      isSidebarOpen ? "w-64" : "w-20"
    } bg-white shadow-lg transition-all duration-300 ease-in-out`}
  >
    <div className="flex items-center justify-between p-4 border-b">
      <Link to='/home'
        className={`${
          !isSidebarOpen && "hidden"
        } font-bold text-xl text-gray-800`}
      >
        SHOP.CLOTHES
      </Link>
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="p-2 rounded-lg hover:bg-gray-100"
      >
        {isSidebarOpen ? (
          <KeyboardArrowLeftOutlinedIcon size={24} />
        ) : (
          <MenuOutlinedIcon size={24} />
        )}
      </button>
    </div>
    <nav className="p-4 space-y-2">
      <NavLink
        to="/admin/dashboard"
        className={({ isActive }) =>
          isActive ? "font-semibold text-blue-600" : "hover:bg-gray-100"
        }
      >
        <NavItem
          icon={<HomeOutlinedIcon />}
          label="Dashboard"
          isOpen={isSidebarOpen}
        />
      </NavLink>
      <NavLink
        to="/admin/products"
        className={({ isActive }) =>
          isActive ? "font-semibold text-blue-600" : "hover:bg-gray-100"
        }
      >
        <NavItem
          icon={<ShoppingBagOutlinedIcon />}
          label="Sản phẩm"
          isOpen={isSidebarOpen}
        />
      </NavLink>
      <NavLink
        to="/admin/categories"
        className={({ isActive }) =>
          isActive ? "font-semibold text-blue-600" : "hover:bg-gray-100"
        }
      >
        <NavItem
          icon={<CategoryOutlinedIcon />}
          label="Danh mục"
          isOpen={isSidebarOpen}
        />
      </NavLink>
      <NavLink
        to="/admin/brands"
        className={({ isActive }) =>
          isActive ? "font-semibold text-blue-600" : "hover:bg-gray-100"
        }
      >
        <NavItem
          icon={<BakeryDiningOutlinedIcon />}
          label="Thương hiệu"
          isOpen={isSidebarOpen}
        />
      </NavLink>
      <NavLink
        to="/admin/orders"
        className={({ isActive }) =>
          isActive ? "font-semibold text-blue-600" : "hover:bg-gray-100"
        }
      >
        <NavItem
          icon={<ShoppingCartOutlinedIcon />}
          label="Đơn hàng"
          isOpen={isSidebarOpen}
        />
      </NavLink>
      <NavLink
        to="/admin/statistics"
        className={({ isActive }) =>
          isActive ? "font-semibold text-blue-600" : "hover:bg-gray-100"
        }
      >
        <NavItem
          icon={<BarChartOutlinedIcon />}
          label="Thống kê"
          isOpen={isSidebarOpen}
        />
      </NavLink>
      <NavLink
        to="/admin/accounts"
        className={({ isActive }) =>
          isActive ? "font-semibold text-blue-600" : "hover:bg-gray-100"
        }
      >
        <NavItem
          icon={<PeopleOutlineOutlinedIcon />}
          label="Tài khoản"
          isOpen={isSidebarOpen}
        />
      </NavLink>
      <NavLink
        to="/admin/settings"
        className={({ isActive }) =>
          isActive ? "font-semibold text-blue-600" : "hover:bg-gray-100"
        }
      >
        <NavItem
          icon={<SettingsOutlinedIcon />}
          label="Cài đặt"
          isOpen={isSidebarOpen}
        />
      </NavLink>
    </nav>
  </aside>
);

export default Sidebar;
