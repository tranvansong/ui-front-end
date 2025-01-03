import React from "react";
import LocationSelector from "./LocationSelector";

const UserInfoForm = ({ name, setName, phone, setPhone, email, setEmail, address, setAddress, location, setLocation, errors }) => {
  return (
    <div className="shipment-info">
      <input    
        type="text"
        placeholder="Tên người nhận"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-2 border border-gray-200 text-base w-full shadow mt-5 outline-none focus:border-bluelight"
      />
      {errors.name && <p className="text-red-500">{errors.name}</p>}

      <input
        type="text"
        placeholder="Số điện thoại"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="p-2 border border-gray-200 text-base w-full shadow mt-5 outline-none focus:border-bluelight"
      />
      {errors.phone && <p className="text-red-500">{errors.phone}</p>}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 border border-gray-200 text-base w-full shadow mt-5 outline-none focus:border-bluelight"
      />
      {errors.email && <p className="text-red-500">{errors.email}</p>}

      <input
        type="text"
        placeholder="Số nhà, thôn, xóm"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="p-2 border border-gray-200 text-base w-full shadow mt-5 outline-none focus:border-bluelight"
      />
      {errors.address && <p className="text-red-500">{errors.address}</p>}

      <div className="mt-5">
        <LocationSelector onLocationChange={setLocation} />
        {errors.location && <p className="text-red-500">{errors.location}</p>}
      </div>
    </div>
  );
}

export default UserInfoForm;
