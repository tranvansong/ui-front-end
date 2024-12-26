import React, { useState, useEffect } from "react";
import Sidebar from "../../components/admin/SideBar";
import Header from "../../components/admin/Header";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { createUserInfo, updateUserInfo } from "../../api/users/user";

const UserInfoDetailFormPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { credentialId } = useParams();
  const location = useLocation(); // Lấy thông tin location
  const { userInfo: passedUserInfo } = location.state || {}; // Lấy userInfo từ state đã truyền
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    id: "", // ID có thể tự động từ backend
    credentialId: credentialId, // Dữ liệu credentialId, chỉ để đọc
    name: "",
    gender: "",
    birthDate: "",
    phone: "",
    email: "",
    address: "",
  });

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [day, month, year] = dateStr.split("/");
    return `${year}-${month}-${day}`;
  };

  // Khi component mount, nếu có userInfo được truyền qua state, cập nhật giá trị cho userInfo
  useEffect(() => {
    if (passedUserInfo) {
      setUserInfo((prevState) => ({
        ...prevState,
        ...passedUserInfo,
        birthDate: formatDate(passedUserInfo.birthDate), // Chuyển ngày sinh khi nhận thông tin
      }));
    }
  }, [passedUserInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (userInfo.id) {
        await updateUserInfo(userInfo.id, userInfo);
        toast.success("Cập nhật thông tin admin thành công!");
  
        setTimeout(() => {
          navigate("/admin/accounts");
        }, 1000);
      } else {
        await createUserInfo(userInfo);
        toast.success("Tạo mới thông tin admin thành công!");
  
        setTimeout(() => {
          navigate("/admin/accounts");
        }, 1000);
      }
    } catch (error) {
      toast.error(
        error.data
      );
    }
  };
  

  const handleCancel = () => {
    navigate(-1); // Quay lại trang trước đó
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

        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="bg-white p-6 rounded shadow">
            <h1 className="text-2xl font-semibold mb-6">
              Tạo mới thông tin Admin
            </h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700">ID</label>
                  <input
                    type="text"
                    name="id"
                    value={userInfo.id}
                    readOnly
                    onChange={handleChange}
                    className="w-full border outline-none focus:ring focus:ring-blue-200 rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
                    placeholder="Tự động sinh bởi hệ thống"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Credential ID</label>
                  <input
                    type="text"
                    name="credentialId"
                    value={userInfo.credentialId}
                    readOnly
                    className="w-full border outline-none focus:ring focus:ring-blue-200 rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Tên</label>
                  <input
                    type="text"
                    name="name"
                    value={userInfo.name}
                    onChange={handleChange}
                    className="w-full border outline-none focus:ring focus:ring-blue-200 rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Giới tính</label>
                  <select
                    name="gender"
                    value={userInfo.gender}
                    onChange={handleChange}
                    className="w-full border outline-none focus:ring focus:ring-blue-200 rounded px-3 py-2"
                    required
                  >
                    <option value="">-- Chọn giới tính --</option>
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                    <option value="Khác">Khác</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700">Ngày sinh</label>
                  <input
                    type="date"
                    name="birthDate"
                    value={userInfo.birthDate}
                    onChange={handleChange}
                    className="w-full border outline-none focus:ring focus:ring-blue-200 rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Số điện thoại</label>
                  <input
                    type="tel"
                    name="phone"
                    value={userInfo.phone}
                    onChange={handleChange}
                    className="w-full border outline-none focus:ring focus:ring-blue-200 rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Email cá nhân</label>
                  <input
                    type="email"
                    name="email"
                    value={userInfo.email}
                    onChange={handleChange}
                    className="w-full border outline-none focus:ring focus:ring-blue-200 rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Địa chỉ</label>
                  <input
                    type="text"
                    name="address"
                    value={userInfo.address}
                    onChange={handleChange}
                    className="w-full border outline-none focus:ring focus:ring-blue-200 rounded px-3 py-2"
                    required
                  />
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                  Lưu
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
      <ToastContainer position="top-right" autoClose={1000} />
    </div>
  );
};

export default UserInfoDetailFormPage;
