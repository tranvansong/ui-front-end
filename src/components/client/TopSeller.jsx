import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import ViewAllBtn from "./ViewAllBtn";
import { getTopSellerProducts } from "../../api/product/product";

const TopSeller = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getTopSellerProducts();
      setProducts(data.slice(0, 4));
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="my-16 px-12">
      <div className="text-5xl font-bold text-center">Sản phẩm bán chạy</div>
      <div className="flex w-full gap-12 items-center flex-wrap my-10">
        {loading && <p>Loading...</p>}
        {products.map((product) => (
          <ProductCard key={product.id} product={product} widthClass="w-72" />
        ))}
      </div>
      {/* <ViewAllBtn link={"hello"} /> */}
    </div>
  );
};

export default TopSeller;
