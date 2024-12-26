import React, { useEffect, useState } from "react";
import Header from "../../components/client/Header";
import Footer from "../../components/client/Footer";
import ProductList from "../../components/client/ProductList";
import ProductSideBar from "../../components/client/ProductSideBar";
import { useNavigate, useLocation } from "react-router-dom";

const AllProductsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [filters, setFilters] = useState({
    categories: [],
    brands: [],
    minPrice: "",
    maxPrice: "",
    sizes: [],
    colors: [],
    keyword: "",
  });

  const [appliedFilters, setAppliedFilters] = useState(filters);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const keyword = params.get("keyword") || "";
    
    setFilters((prevFilters) => ({
      ...prevFilters,
      keyword: keyword,
    }));
    setAppliedFilters((prevFilters) => ({
      ...prevFilters,
      keyword: keyword,
    }));
  }, [location.search]);

  const updateFilters = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  const applyFilters = () => {
    setAppliedFilters(filters);
    updateURLWithFilters(filters);
  };

  const clearFilters = () => {
    const defaultFilters = {
      categories: [],
      brands: [],
      minPrice: "",
      maxPrice: "",
      sizes: [],
      colors: [],
      keyword: "",
    };
    setFilters(defaultFilters);
    setAppliedFilters(defaultFilters);
    updateURLWithFilters(defaultFilters);
  };

  const updateURLWithFilters = (filters) => {
    const query = new URLSearchParams();

    if (filters.keyword) {
      query.set("keyword", filters.keyword);
    }

    if (filters.categories.length > 0) {
      query.set("categories", filters.categories.join(","));
    }
    if (filters.brands.length > 0) {
      query.set("brands", filters.brands.join(","));
    }
    if (filters.sizes.length > 0) {
      query.set("sizes", filters.sizes.join(","));
    }
    if (filters.colors.length > 0) {
      query.set("colors", filters.colors.join(","));
    }
    if (filters.minPrice) {
      query.set("minPrice", filters.minPrice);
    }
    if (filters.maxPrice) {
      query.set("maxPrice", filters.maxPrice);
    }

    navigate(`?${query.toString()}`);
  };

  return (
    <div>
      <Header />
      <div className="flex gap-14 px-6 my-10">
        <ProductSideBar
          filters={filters}
          updateFilters={updateFilters}
          applyFilters={applyFilters}
          clearFilters={clearFilters}
        />
        <ProductList filters={appliedFilters} />
      </div>
      <Footer />
    </div>
  );
};

export default AllProductsPage;
