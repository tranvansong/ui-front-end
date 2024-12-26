import React, { useEffect, useState } from "react";
import { getBrands } from "../../api/product/brand";
import { getCategories } from "../../api/product/category";
import { getColors } from "../../api/product/color";
import { getProductsByBrand, getProductsByCategory } from "../../api/product/product";

const ProductSideBar = ({ filters, updateFilters, applyFilters, clearFilters }) => {
  const [sizes, setSizes] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [brandCounts, setBrandCounts] = useState({});
  const [categoryCounts, setCategoryCounts] = useState({});

  useEffect(() => {
    const fetchSizes = () => {
      setSizes([
        {size : "XS"},
        { size: "S" },
        { size: "M" },
        { size: "L" },
        { size: "XL" },
        { size: "2XL" },
      ]);
    };

    const fetchBrandsAndCounts = async () => {
      try {
        const brandsData = await getBrands();
        const counts = {};
        for (const brand of brandsData) {
          const products = await getProductsByBrand(brand.brand);
          if (products.length > 0) {
            counts[brand.brand] = products.length;
          }
        }
        setBrands(brandsData);
        setBrandCounts(counts);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    const fetchCategoriesAndCounts = async () => {
      try {
        const categoriesData = await getCategories();
        const counts = {};
        for (const category of categoriesData) {
          const products = await getProductsByCategory(category.category);
          console.log(products)
          if (products.length > 0) {
            counts[category.category] = products.length;
          }
        }
        setCategories(categoriesData);
        setCategoryCounts(counts);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchColors = async () => {
      try {
        const colorsData = await getColors();
        setColors(colorsData);
      } catch (error) {
        console.error("Error fetching colors:", error);
      }
    };

    fetchSizes();
    fetchBrandsAndCounts();
    fetchCategoriesAndCounts();
    fetchColors();
  }, []);

  const handleFilterChange = (filterName, value) => {
    updateFilters({ [filterName]: value });
  };

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handlePriceChange = (e, type) => {
    const value = e.target.value.replace(/\./g, ""); // Remove dots
    updateFilters({ [type]: value ? Number(value) : "" });
  };

  const applyFormattedFilters = () => {
    const formattedFilters = {
      ...filters,
      minPrice: filters.minPrice
        ? filters.minPrice.toString().replace(/\./g, "")
        : "",
      maxPrice: filters.maxPrice
        ? filters.maxPrice.toString().replace(/\./g, "")
        : "",
    };
    applyFilters(formattedFilters);
  };

  return (
    <div className="text-base w-1/5 p-5 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] h-fit">
      {/* Categories Section */}
      <div className="mb-10">
        <h2 className="text-lg font-bold uppercase mb-4">Danh mục</h2>
        {categories.map((category, index) => (
          <div key={index} className="flex justify-between items-center mb-2">
            <div className="flex items-center space-x-2">
              <input
                id={`category-checkbox-${index}`}
                type="checkbox"
                className="w-4 h-4 accent-orange bg-gray-100 border-gray-300 rounded focus:ring-orange"
                checked={filters.categories.includes(category.category)}
                onChange={() =>
                  handleFilterChange(
                    "categories",
                    filters.categories.includes(category.category)
                      ? filters.categories.filter((c) => c !== category.category)
                      : [...filters.categories, category.category]
                  )
                }
              />
              <label
                htmlFor={`category-checkbox-${index}`}
                className="text-base"
              >
                {category.category}
              </label>
            </div>
            <div>({categoryCounts[category.category] || 0})</div>
          </div>
        ))}
      </div>

      <div className="mb-10">
        <h2 className="text-lg font-bold uppercase mb-4">Thương hiệu</h2>
        {brands.map((brand, index) => (
          <div key={index} className="flex justify-between items-center mb-2">
            <div className="flex items-center space-x-2">
              <input
                id={`brand-checkbox-${index}`}
                type="checkbox"
                className="w-4 h-4 accent-orange bg-gray-100 border-gray-300 rounded focus:ring-orange"
                checked={filters.brands.includes(brand.brand)}
                onChange={() =>
                  handleFilterChange(
                    "brands",
                    filters.brands.includes(brand.brand)
                      ? filters.brands.filter((b) => b !== brand.brand)
                      : [...filters.brands, brand.brand]
                  )
                }
              />
              <label htmlFor={`brand-checkbox-${index}`} className="text-base">
                {brand.brand}
              </label>
            </div>
            <div>({brandCounts[brand.brand] || 0})</div>
          </div>
        ))}
      </div>

      {/* Colors Section */}
      <div className="mb-10">
        <h2 className="text-lg font-bold uppercase mb-4">Màu sắc</h2>
        <div className="flex gap-2 flex-wrap">
          {colors.map((color, index) => (
            <div
              key={index}
              className={`cursor-pointer p-1 text-center rounded-full w-8 h-8 transition-all duration-300 ${
                filters.colors.includes(color.color)
                  ? "border shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset]"
                  : "border border-slate-500"
              }`}
              style={{ backgroundColor: color.colorCode }}
              onClick={() =>
                handleFilterChange(
                  "colors",
                  filters.colors.includes(color.color)
                    ? filters.colors.filter((c) => c !== color.color)
                    : [...filters.colors, color.color]
                )
              }
            ></div>
          ))}
        </div>
      </div>

      {/* Price Section */}
      <div className="mb-10">
        <h2 className="text-lg font-bold uppercase mb-4">Giá</h2>
        <div className="flex justify-between items-center">
          <input
            type="text"
            id="min"
            placeholder="Từ"
            value={filters.minPrice ? formatNumber(filters.minPrice) : ""}
            onChange={(e) => handlePriceChange(e, "minPrice")}
            className="w-1/2 px-2 py-1.5 text-gray-900 border text-base border-slate-500 rounded focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
          <span className="mx-2">-</span>
          <input
            type="text"
            id="max"
            placeholder="Đến"
            value={filters.maxPrice ? formatNumber(filters.maxPrice) : ""}
            onChange={(e) => handlePriceChange(e, "maxPrice")}
            className="w-1/2 px-2 py-1.5 text-gray-900 border text-base border-slate-500 rounded focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
      </div>

      {/* Size Section */}
      <div className="mb-10">
        <h2 className="text-lg font-bold uppercase mb-4">Size</h2>
        <div className="grid grid-cols-4 gap-3">
          {sizes.map((sizeObj, index) => (
            <div
              key={index}
              className={`cursor-pointer border border-slate-400 text-base p-1 text-center rounded ${
                filters.sizes.includes(sizeObj.size)
                  ? "bg-red-500 text-white"
                  : "bg-white"
              }`}
              onClick={() =>
                handleFilterChange(
                  "sizes",
                  filters.sizes.includes(sizeObj.size)
                    ? filters.sizes.filter((s) => s !== sizeObj.size)
                    : [...filters.sizes, sizeObj.size]
                )
              }
            >
              {sizeObj.size}
            </div>
          ))}
        </div>
      </div>

      {/* Actions Section */}
      <div className="flex justify-between items-center">
        <button
          onClick={applyFormattedFilters}
          className="bg-green text-white text-md font-medium py-2 px-4 rounded"
        >
          Áp dụng
        </button>
        <button
          onClick={clearFilters}
          className="text-md bg-red-600 text-white font-medium py-2 px-4 rounded"
        >
          Xóa bộ lọc
        </button>
      </div>
    </div>
  );
};

export default ProductSideBar;
