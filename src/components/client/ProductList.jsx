import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";
import { getProducts } from "../../api/product/product";
import { Alert, Snackbar } from "@mui/material";

const ProductList = ({ filters }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const query = Object.entries(filters)
          .map(
            ([key, value]) =>
              `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
          )
          .join("&");
        console.log("Query:", query); // Debug xem query có đúng không
        const data = await getProducts(query);
        setProducts(data);
      } catch (err) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [filters]);

  return (
    <div className="w-4/5">
      <div className="flex text-lg font-medium rounded justify-between items-center p-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <div>
          <div>Tổng số: {products.length} sản phẩm</div>
        </div>
        <div className="flex gap-x-4 items-center">
          <div className="hover:text-red-500">
            <GridViewIcon style={{ fontSize: "35px" }} />
          </div>
          <div className="hover:text-red-500">
            <ViewListIcon style={{ fontSize: "35px" }} />
          </div>
        </div>
        <div className="flex gap-x-4 items-center">
          <span>Sắp xếp theo:</span>
          <select className="bg-gray-50 text-base border-2 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 block p-2 pr-5 outline-none">
            <option value="name">Tên</option>
            <option value="price">Giá</option>
          </select>
        </div>
      </div>
      {loading && <p>Loading...</p>}
      {error && (
        <Alert severity="error">
          <strong>Error:</strong> {error}
        </Alert>
      )}
      <div className="flex items-center gap-x-6 flex-wrap">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} widthClass="w-56" />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
