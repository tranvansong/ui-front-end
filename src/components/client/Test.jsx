import React, { useState } from "react";
import UserInfoForm from "./UserInfoForm";

const Test = () => {
  // State để lưu thông tin người dùng
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState({});
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }
    if (!address) newErrors.address = "Address is required";
    if (
      !location.selectedTinh ||
      !location.selectedQuan ||
      !location.selectedPhuong
    ) {
      newErrors.location = "Please select location details";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckout = () => {
    if (validateForm()) {
      // Nếu form hợp lệ, gửi dữ liệu từ UserInfoForm
      const userInfo = { name, phone, email, address, location };
      console.log("Sending data to checkout: ", userInfo);
      // Thực hiện hành động gửi dữ liệu hoặc chuyển đến bước tiếp theo (ví dụ: thanh toán)
    } else {
      console.log("Form is invalid");
    }
  };

  return (
    <div>
      <UserInfoForm
        name={name}
        setName={setName}
        phone={phone}
        setPhone={setPhone}
        email={email}
        setEmail={setEmail}
        address={address}
        setAddress={setAddress}
        location={location}
        setLocation={setLocation}
        errors={errors}
      />
      <button
        onClick={handleCheckout}
        className="checkout-btn p-3 bg-blue-500 text-white"
      >
        Checkout
      </button>
    </div>
  );
};

export default Test;
