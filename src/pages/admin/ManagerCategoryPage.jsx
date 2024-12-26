import React, { useEffect, useState } from "react";
import Sidebar from "../../components/admin/SideBar";
import Header from "../../components/admin/Header";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ConfirmDeletePopup from "../../components/admin/ConfirmDeletePopup"; // Import component mới
import { createCategory, deleteCategory, getCategories, updateCategory } from "../../api/product/category";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManagerCategoryPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách danh mục:", error);
      }
    };
    fetchCategories();
  }, []);


  const handleAddCategory = () => {
    setSelectedCategoryId(null);
    setCategoryName("");
    setIsPopupOpen(true);
    setError("");
  };

  const handleSaveCategory = async (e) => {
    e.preventDefault();
    try {
      if (selectedCategoryId) {
        await updateCategory(selectedCategoryId, categoryName);
        const data = await getCategories();
        setCategories(data);
        toast.success("Đã cập nhật danh mục");
      } else {
        await createCategory(categoryName);
        const data = await getCategories();
        setCategories(data);
        toast.success("Đã thêm danh mục");
      }
      setIsPopupOpen(false);
      setCategoryName("");
    } catch (error) {
      setError(error.data)
      console.error("Lỗi khi lưu danh mục:", error);
    }
  };

  const handleDeleteClick = (id) => {
    setSelectedCategoryId(id);
    setIsConfirmDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteCategory(selectedCategoryId);
      setCategories(categories.filter((category) => category.id !== selectedCategoryId));
      setIsConfirmDeleteOpen(false);
      toast.success("Đã xóa thành công")
    } catch (error) {
      console.error("Lỗi khi xóa danh mục:", error);
    }
  };

  const handleCancelDelete = () => {
    setIsConfirmDeleteOpen(false);
  };

  const handleViewDetails = (id) => {
    const category = categories.find((category) => category.id === id);
    setSelectedCategoryId(category.id);
    setCategoryName(category.category);
    setIsPopupOpen(true);
    setError("");
  };

  const filteredCategories = categories.filter((category) =>
    category.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
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
                placeholder="Tìm kiếm danh mục ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 pl-5 border outline-none border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200"
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <i className="fas fa-search"></i>
              </span>
            </div>
            <div>
              <button
                onClick={handleAddCategory}
                className="bg-greenlight text-white font-semibold py-2 px-4 rounded-lg hover:bg-green transition"
              >
                Thêm mới danh mục
              </button>
              <ToastContainer position="top-right" autoClose={1000} />

            </div>
          </div>

          <div className="overflow-auto rounded-lg shadow">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 text-left bg-gray-100 font-semibold text-gray-600">ID</th>
                  <th className="py-2 px-4 text-left bg-gray-100 font-semibold text-gray-600">Tên danh mục</th>
                  <th className="py-2 px-4 text-left bg-gray-100 font-semibold text-gray-600"></th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.map((category) => (
                  <tr key={category.id} className="border-b">
                    <td className="py-3 px-4 font-medium text-gray-800">{category.id}</td>
                    <td className="py-3 px-4 font-medium text-gray-800">{category.category}</td>
                    <td className="py-3 px-4 flex justify-center items-center space-x-2">
                      <button
                        onClick={() => handleViewDetails(category.id)}
                        className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
                      >
                        <EditOutlinedIcon />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(category.id)}
                        className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
                      >
                        <DeleteOutlineIcon />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {isPopupOpen && (
            <div className="!m-0 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <form onSubmit={handleSaveCategory} className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <h2 className="text-xl font-semibold mb-4">
                  {selectedCategoryId ? "Cập nhật danh mục" : "Thêm danh mục mới"}
                </h2>
                {error && <div className="m-1 text-sm text-red-500">{error}</div>}
                <input
                  type="text"
                  placeholder="Tên danh mục"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="w-full mb-3 p-3 border border-gray-300 rounded-lg focus:outline-none"
                  required
                />
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setIsPopupOpen(false)}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                  >
                    Hủy
                  </button>
                  <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    {selectedCategoryId ? "Cập nhật" : "Lưu"}
                  </button>
                </div>
              </form>
            </div>
          )}

          <ConfirmDeletePopup
            isOpen={isConfirmDeleteOpen}
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
            itemType={"danh mục"}
          />
        </main>
      </div>
    </div>
  );
};

export default ManagerCategoryPage;
