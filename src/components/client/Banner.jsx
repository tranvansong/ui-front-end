import React from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="flex px-12 py-16 bg-banner bg-no-repeat bg-cover bg-scroll w-full h-screen">
      <div className="w-1/2">
        <h1 className="uppercase text-5xl font-extrabold pb-6">Find clothes that matches your style</h1>
        <div className="text-md text-slate-500 pb-6">Khám phá bộ sưu tập đa dạng các trang phục được thiết kế tinh tế của chúng tôi, giúp bạn thể hiện cá tính và phong cách của riêng mình.</div>
        <Link to='/all-products' className="inline-block text-sm px-12 py-3 bg-slate-900 text-white font-semibold rounded-2xl hover:bg-slate-700 transition-all cursor-pointer">
          Khám phá
        </Link>
        <div className="flex gap-7 mt-10">
          <div>
            <div className="text-4xl font-semibold">200+</div>
            <div className="text-base text-slate-500">Thương hiệu trong và ngoài nước</div>
          </div>
          <div>
            <div className="w-px h-full bg-slate-400"></div>
          </div>
          <div>
            <div className="text-4xl font-semibold">2,000+</div>
            <div className="text-base text-slate-500">Sản phẩm chất lượng cao</div>
          </div>
          <div>
            <div className="w-px h-full bg-slate-400"></div>
          </div>
          <div>
            <div className="text-4xl font-semibold">30,000+</div>
            <div className="text-base text-slate-500">Khách hàng hài lòng</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
