// pages/admin/ManagerProductPage.js
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/admin/SideBar";
import Header from "../../components/admin/Header";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Link } from "react-router-dom";
import ConfirmDeletePopup from "../../components/admin/ConfirmDeletePopup";
import { deleteProduct, getProducts } from "../../api/product/product";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManagerProductPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách sản phẩm:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = (id) => {
    setIsConfirmDeleteOpen(true);
    setSelectedProductId(id);
  };

  const handleConfirmDelete = async () => {
    try {
      console.log(selectedProductId);
      await deleteProduct(selectedProductId);
      toast.success("Đã xóa sản phẩm thành công");
    } catch (error) {
      console.error(error);
      toast.error(error.data.message);
    }
    const data = await getProducts();
    setProducts(data);
    setIsConfirmDeleteOpen(false);
  };

  const handleCancelDelete = () => {
    setIsConfirmDeleteOpen(false);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
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
                placeholder="Tìm kiếm sản phẩm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 pl-5 border outline-none border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200"
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <i className="fas fa-search"></i>
              </span>
            </div>
            <Link
              to="/admin/products/new"
              className="bg-greenlight text-white font-semibold py-2 px-4 rounded-lg hover:bg-green transition"
            >
              Thêm mới sản phẩm
            </Link>
          </div>

          <div className="overflow-auto rounded-lg shadow">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 text-left bg-gray-100 font-semibold text-gray-600">
                    ID
                  </th>
                  <th className="py-2 px-4 text-left bg-gray-100 font-semibold text-gray-600">
                    Hình ảnh
                  </th>
                  <th className="py-2 px-4 text-left bg-gray-100 font-semibold text-gray-600">
                    Tên sản phẩm
                  </th>
                  <th className="py-2 px-4 text-left bg-gray-100 font-semibold text-gray-600">
                    Thương hiệu
                  </th>
                  <th className="py-2 px-4 text-left bg-gray-100 font-semibold text-gray-600">
                    Giá
                  </th>
                  <th className="py-2 px-4 text-left bg-gray-100 font-semibold text-gray-600">
                    Đã bán
                  </th>
                  <th className="py-2 px-4 text-left bg-gray-100 font-semibold text-gray-600"></th>
                </tr>
              </thead>
              {loading && <p className="px-4">Loading...</p>}
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b">
                    <td className="py-3 px-4 font-medium text-gray-800">
                      {product.id}
                    </td>
                    <td className="py-3 px-4">
                      <img
                        src={product.colors[0].images[0]?.image}
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                    </td>
                    <td className="py-3 px-4 font-medium text-gray-800">
                      {product.name}
                    </td>
                    <td className="py-3 px-4 text-gray-600">{product.brand}</td>
                    <td className="py-3 px-4 text-gray-600">
                      {product.price.toLocaleString()} VND
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {product.soldQuantity}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-x-2">
                        <Link
                          to={`/admin/products/update/${product.id}`}
                          className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
                        >
                          <EditOutlinedIcon />
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id)}
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
          itemType={"sản phẩm"}
        />
        <ToastContainer position="top-right" autoClose={1000} />
      </div>
    </div>
  );
};

export default ManagerProductPage;
