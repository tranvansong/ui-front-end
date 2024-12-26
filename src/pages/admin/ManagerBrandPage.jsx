import React, { useEffect, useState } from "react";
import Sidebar from "../../components/admin/SideBar";
import Header from "../../components/admin/Header";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ConfirmDeletePopup from "../../components/admin/ConfirmDeletePopup";
import { createBrand, deleteBrand, getBrands, updateBrand } from "../../api/product/brand";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManagerBrandPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [brands, setBrands] = useState([]);
  const [selectedBrandId, setSelectedBrandId] = useState(null);
  const [brandName, setBrandName] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const data = await getBrands(); // Thay bằng URL API thực tế
        setBrands(data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách thương hiệu:", error);
      }
    };
    fetchBrands();
  }, []);


  const handleAddBrand = () => {
    setSelectedBrandId(null);
    setBrandName("");
    setIsPopupOpen(true);
    setError("");
  };

  const handleSaveBrand = async (e) => {
    e.preventDefault();
    try {
      if (selectedBrandId) {
        await updateBrand(selectedBrandId, brandName);
        const data = await getBrands();
        setBrands(data);
        toast.success("Đã cập nhật thương hiệu");
      } else {
        await createBrand(brandName);
        const data = await getBrands();
        setBrands(data);
        toast.success("Đã thêm thương hiệu");
      }
      setIsPopupOpen(false);
      setBrandName("");
    } catch (error) {
      setError(error.data)
      console.error("Lỗi khi lưu thương hiệu:", error);
    }
  };


  const handleDeleteClick = (id) => {
    setSelectedBrandId(id);
    setIsConfirmDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteBrand(selectedBrandId);
      setBrands(brands.filter((brand) => brand.id !== selectedBrandId));
      setIsConfirmDeleteOpen(false);
      toast.success("Đã xóa thành công")
    } catch (error) {
      console.error("Lỗi khi xóa thương hiệu:", error);
    }
  };

  const handleCancelDelete = () => {
    setIsConfirmDeleteOpen(false);
  };

  const handleViewDetails = (id) => {
    const brand = brands.find((brand) => brand.id === id);
    setSelectedBrandId(brand.id);
    setBrandName(brand.brand);
    setIsPopupOpen(true);
    setError("");
  };

  const filteredBrands = brands.filter((brand) =>
    brand.brand.toLowerCase().includes(searchTerm.toLowerCase())
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
                placeholder="Tìm kiếm sản phẩm ..."
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
                onClick={handleAddBrand}
                className="bg-greenlight text-white font-semibold py-2 px-4 rounded-lg hover:bg-green transition"
              >
                Thêm mới thương hiệu
              </button>
              <ToastContainer position="top-right" autoClose={1000} />
            </div>
          </div>

          <div className="overflow-auto rounded-lg shadow">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 text-left bg-gray-100 font-semibold text-gray-600">
                    ID
                  </th>
                  <th className="py-2 px-4 text-left bg-gray-100 font-semibold text-gray-600">
                    Tên thương hiệu
                  </th>
                  <th className="py-2 px-4 text-center bg-gray-100 font-semibold text-gray-600">
                    
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredBrands.map((brand) => (
                  <tr key={brand.id} className="border-b">
                    <td className="py-3 px-4 font-medium text-gray-800">
                      {brand.id}
                    </td>
                    <td className="py-3 px-4 font-medium text-gray-800">
                      {brand.brand}
                    </td>
                    <td className="py-3 px-4 flex justify-center items-center space-x-2">
                      <button
                        onClick={() => handleViewDetails(brand.id)}
                        className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
                      >
                        <EditOutlinedIcon />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(brand.id)}
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

          {/* Add/Edit Brand Popup */}
          {isPopupOpen && (
            <div className="!m-0 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <form
                onSubmit={handleSaveBrand}
                className="bg-white p-6 rounded-lg shadow-lg w-1/3"
              >
                <h2 className="text-xl font-semibold mb-4">
                  {selectedBrandId ? "Cập nhật thương hiệu" : "Thêm mới thương hiệu"}
                </h2>
                {error && <div className="m-1 text-sm text-red-500">{error}</div>}
                <input
                  type="text"
                  placeholder="Tên thương hiệu"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
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
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    {selectedBrandId ? "Cập nhật" : "Lưu"}
                  </button>
                </div>
              </form>
            </div>
          )}

          <ConfirmDeletePopup
            isOpen={isConfirmDeleteOpen}
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
            itemType={"thương hiệu"}
          />
        </main>
      </div>
    </div>
  );
};

export default ManagerBrandPage;
