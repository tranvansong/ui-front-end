import React from "react";
import { Link } from "react-router-dom";

const UnknownPage = () => {
  return (
    <div>
      <h1>403 - Không có quyền truy cập</h1>
      <p>Bạn không có quyền truy cập vào trang này.</p>
      <Link to="/home">Quay lại trang chủ</Link>
    </div>
  );
};

export default UnknownPage;
