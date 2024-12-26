import React, { useEffect, useState } from "react";
import Sidebar from "../../components/admin/SideBar";
import Header from "../../components/admin/Header";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import { Link, useLocation } from "react-router-dom";
import ConfirmDeletePopup from "../../components/admin/ConfirmDeletePopup";
import { deleteUser, getAllAccounts } from "../../api/users/user";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManagerAccountPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [selectedAccountId, setSelectedAccountId] = useState(null);

  const location = useLocation();

  useEffect(() => {
    if (location.state?.message) {
      toast.success(location.state.message);
    }
  }, [location]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllAccounts();
        setAccounts(data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách user:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = (id) => {
    setIsConfirmDeleteOpen(true);
    setSelectedAccountId(id);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteUser(selectedAccountId);
      await deteteUserInfo(selectedAccountId);
      toast.success("Xóa tài khoản thành công");
    } catch (error) {
      alert(error.data);
    }
    setAccounts(accounts.filter((account) => account.id !== selectedAccountId));
    setIsConfirmDeleteOpen(false);
  };

  const handleCancelDelete = () => {
    setIsConfirmDeleteOpen(false);
  };

  const filteredAccounts = accounts.filter((account) =>
    account.email.toLowerCase().includes(searchTerm.toLowerCase()) || account.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          isProfileDropdownOpen={isProfileDropdownOpen}
          setIsProfileDropdownOpen={setIsProfileDropdownOpen}
        />
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-1/3">
              <input
                type="text"
                placeholder="Tìm kiếm tài khoản..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 pl-5 border outline-none border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200"
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <i className="fas fa-search"></i>
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/admin/accounts/new"
                className="bg-green text-white font-semibold py-2 px-4 rounded-lg hover:bg-greenlight transition"
              >
                Thêm mới tài khoản
              </Link>
            </div>
          </div>

          {/* Account Table */}
          <div className="overflow-auto rounded-lg shadow">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 text-left bg-gray-100 font-semibold text-gray-600">
                    ID
                  </th>
                  <th className="py-2 px-4 text-left bg-gray-100 font-semibold text-gray-600">
                    Email
                  </th>
                  <th className="py-2 px-4 text-left bg-gray-100 font-semibold text-gray-600">
                    Vai trò
                  </th>
                  <th className="py-2 px-4 text-left bg-gray-100 font-semibold text-gray-600"></th>
                </tr>
              </thead>
              <tbody>
                {filteredAccounts.map((account) => (
                  <tr key={account.id} className="border-b">
                    <td className="py-3 px-4 font-medium text-gray-800">
                      {account.id}
                    </td>
                    <td className="py-3 px-4 font-medium text-gray-800">
                      {account.email}
                    </td>
                    <td className="py-3 px-4 text-gray-600">{account.role}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-x-2">
                        {account.role === "ADMIN" && (
                          <Link
                            to={`/admin/accounts/info-detail/credentialId/${account.id}`}
                            className="bg-amber-500 text-white px-3 py-2 rounded hover:bg-amber-600"
                          >
                            <VisibilityIcon />
                          </Link>
                        )}
                        <Link
                          to={`/admin/accounts/view/${account.id}`}
                          className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
                        >
                          <EditOutlinedIcon />
                        </Link>
                        <button
                          onClick={() => handleDelete(account.id)}
                          className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
                        >
                          <DeleteOutlineIcon />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
        <ConfirmDeletePopup
          isOpen={isConfirmDeleteOpen}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          itemType={"tài khoản"}
        />
        <ToastContainer position="top-right" autoClose={1000} />
      </div>
    </div>
  );
};

export default ManagerAccountPage;
