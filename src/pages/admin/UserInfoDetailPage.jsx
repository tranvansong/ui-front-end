import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Sidebar from "../../components/admin/SideBar";
import Header from "../../components/admin/Header";
import { getUserInfoById } from "../../api/users/user";

const UserInfoDetailPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getUserInfoById(id);
        setUserInfo(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserInfo();
  }, [id]);

  // Handle navigate back
  const handleGoBack = () => {
    navigate(-1); // Quay lại trang trước đó
  };

  const handleUpdate = () => {
    navigate(`/admin/accounts/info-detail/update/credentialId/${id}`, {
      state: { userInfo },
    });
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
          {isLoading ? (
            <p>Đang tải thông tin...</p>
          ) : userInfo ? (
            <div className="bg-white p-6 rounded shadow">
              <h1 className="text-2xl font-semibold mb-4">Chi tiết Admin</h1>
              <div className="space-y-4">
                <p>
                  <strong>ID:</strong> {userInfo.id}
                </p>
                <p>
                  <strong>Credential ID:</strong> {id}
                </p>
                <p>
                  <strong>Tên:</strong> {userInfo.name}
                </p>
                <p>
                  <strong>Giới tính:</strong> {userInfo.gender}
                </p>
                <p>
                  <strong>Ngày sinh:</strong> {userInfo.birthDate}
                </p>
                <p>
                  <strong>Số điện thoại:</strong> {userInfo.phone}
                </p>
                <p>
                  <strong>Email:</strong> {userInfo.email}
                </p>
                <p>
                  <strong>Địa chỉ:</strong> {userInfo.address}
                </p>
              </div>

              <div className="mt-6 flex space-x-4">
                <button
                  onClick={handleGoBack}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                >
                  Trở về
                </button>
                <button
                  onClick={handleUpdate}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                  Cập nhật
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-4 bg-white p-6 rounded shadow">
              <p className="text-gray-600">Không có thông tin chi tiết nào.</p>
              <Link
                to={`/admin/accounts/info-detail/new/credentialId/${id}`}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Tạo mới thông tin Admin
                  </Link>
                  <button
                  onClick={handleGoBack}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                >
                  Trở về
                </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default UserInfoDetailPage;
