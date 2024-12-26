import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createUser,
  getRoles,
  getUserById,
  updateUser,
} from "../../api/users/user";
import Sidebar from "../../components/admin/SideBar";
import Header from "../../components/admin/Header";

const AccountFormPage = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [error, setError] = useState("");
  const [roles, setRoles] = useState([]);

  const { id } = useParams();
  const [user, setUser] = useState({
    email: "",
    password: "",
    role: "",
  });
  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        try {
          const userData = await getUserById(id);
          setUser(userData);
        } catch (error) {
          alert(error.message);
        }
      };
      fetchUser();
    }

    const fetchRoles = async () => {
      try {
        const roleData = await getRoles();
        setRoles(roleData);
      } catch (error) {
        alert("Không thể lấy danh sách vai trò");
      }
    };
    fetchRoles();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      console.log("Update User:", user);
      await updateUser(id, user);
      navigate("/admin/accounts", {
        state: { message: "Đã cập nhật tài khoản nhân viên" },
      });
    } else {
      try {
        console.log("Create User:", user);
        await createUser(user);
        navigate("/admin/accounts", {
          state: { message: "Đã tạo tài khoản nhân viên" },
        });
      } catch (error) {
        setError(error.data);
        console.error("Lỗi khi lưu thương hiệu:", error);
      }
    }
  };

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
        <main className="flex-1 flex items-center justify-center w-full overflow-y-auto p-6 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md w-1/2">
            <h2 className="text-2xl font-semibold mb-4">
              {id ? "Chỉnh sửa tài khoản" : "Tạo mới tài khoản"}
            </h2>
            <form onSubmit={handleSubmit}>
              {error && (
                <div className="mb-2 text-red-600 p-3 bg-red-100 rounded-md">
                  {error}
                </div>
              )}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={user.email}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border rounded-lg outline-none focus:ring focus:ring-blue-200"
                  placeholder="Nhập email"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Mật khẩu
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={user.password}
                  onChange={handleInputChange}
                  required={!id} // Mật khẩu bắt buộc nếu là tạo mới.
                  className="w-full p-3 border rounded-lg outline-none focus:ring focus:ring-blue-200"
                  placeholder="Nhập mật khẩu"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="role"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Vai trò
                </label>
                <select
                  id="role"
                  name="role"
                  value={user.role}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border rounded-lg outline-none focus:ring focus:ring-blue-200"
                >
                  <option value="" disabled>
                    Chọn vai trò
                  </option>
                  {roles.map((role) => (
                    <option key={role.id} value={role.name}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => navigate("/admin/accounts")}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                >
                  Hủy
                </button>

                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Lưu
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AccountFormPage;
