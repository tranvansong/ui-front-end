import React from "react";
import { Link } from "react-router-dom";

const ViewAllBtn = ({ link }) => {
  return (
    <div className='flex justify-center mt-10'>
      <div
        // to={link}
        className="inline-block text-black text-base px-12 py-3 border border-slate-400 cursor-pointer rounded-3xl hover:bg-slate-200 hover:text-slate-700 transition duration-300"
      >
        View All
      </div>
    </div>
  );
};

export default ViewAllBtn;
