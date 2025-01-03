import React, { useContext, useState } from "react";
import LocationSelector from "./LocationSelector";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import DeliveryDiningOutlinedIcon from "@mui/icons-material/DeliveryDiningOutlined";
import SourceOutlinedIcon from "@mui/icons-material/SourceOutlined";
import QrCodeOutlinedIcon from "@mui/icons-material/QrCodeOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import UserInfoForm from "./UserInfoForm";
import { createOrder } from "../../api/order/order";
import { useAuth } from "../../context/client/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { emptyCart } from "../../api/carts/cart";
import { CircularProgress } from "@mui/material";

function ShipmentDetails({ cart }) {
  const { user } = useAuth();
  console.log(cart);
  const [shippingFee, setShippingFee] = useState(0);
  const [discount, setDiscount] = useState(0); // Assuming you have a way to get discount
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState({
    selectedTinh: "",
    selectedQuan: "",
    selectedPhuong: "",
  });
  const [shippingMethod, setShippingMethod] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const formatNumber = (value) => {
    return new Intl.NumberFormat("vi-VN").format(value);
  };

  const calculateTotal = () => {
    return cart.totalPrice + shippingFee - discount;
  };

  const validateForm = () => {
    setLoading(false);
    const newErrors = {};
    if (!name) newErrors.name = "Tên là bắt buộc";
    if (!phone) {
      newErrors.phone = "Số điện thoại là bắt buộc";
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = "Số điện thoại sai cú pháp";
    }
    if (!email) {
      newErrors.email = "Email là bắt buộc";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email sai cú pháp";
    }
    if (!address) newErrors.address = "Địa chỉ là bắt buộc";
    if (
      !location.selectedTinh ||
      !location.selectedQuan ||
      !location.selectedPhuong
    ) {
      newErrors.location = "Vui lòng chọn đầy đủ địa chỉ";
    }
    if (!shippingMethod)
      newErrors.shippingMethod = "Vui lòng chọn phương thức vận chuyển";
    if (!paymentMethod)
      newErrors.paymentMethod = "Vui lòng chọn phương thức thanh toán";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCompleteOrder = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setLoading(true);

      const orderItemRequests = cart.cartItems.map(
        ({ cartItemId, ...item }) => item
      );
      const orderDetails = {
        userId: user?.userId,
        receiverName: name,
        phoneNumber: phone,
        email,
        address,
        location: `${location.selectedPhuong}, ${location.selectedQuan}, ${location.selectedTinh}`,
        shippingMethod,
        orderMethod: paymentMethod,
        orderItemRequests,
        shippingFee,
        discount,
        totalPayment: calculateTotal(),
      };

      console.log("Order Details: ", orderDetails);

      try {
        const orderResponse = await createOrder(user?.userId, orderDetails);
        console.log("Order created successfully: ", orderResponse);
        await emptyCart(user?.userId);

        toast.success("Đặt hàng thành công");
        setTimeout(() => {
          navigate(`/order-success/${orderResponse.orderCode}`);
        }, 1000);
        switch (paymentMethod) {
          case "cod":
            handleCashOnDelivery();
            break;
          case "qr":
            handleVNPayQR();
            break;
          case "credit":
            handleCreditCard();
            break;
          default:
            console.error("Unknown payment method");
        }
      } catch (error) {
        toast.error(error.data);
        console.error("Error creating order: ", error);
      } finally {
        setLoading(false); // Kết thúc quá trình đặt hàng
      }
    }
  };

  return (
    <div className="my-12 px-10 flex gap-10">
      <div className="w-1/2">
        <div className="text-2xl font-bold px-5 py-3 bg-slate-100">
          Thông tin khách hàng
        </div>
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
        <div>
          <div className="text-xl font-bold px-5 py-3 bg-slate-100 mt-5">
            Phương thức vận chuyển
          </div>
          <div className="flex justify-between items-center pt-5">
            <div className="text-lg flex gap-x-2 items-center">
              <input
                id="express-radio"
                type="radio"
                value="50000"
                name="shipping-method"
                className="w-4 h-4 accent-black text-black bg-gray-100 border-gray-300 rounded"
                onChange={(e) => {
                  setShippingFee(parseInt(e.target.value));
                  setShippingMethod("express");
                }}
              />
              <label htmlFor="express-radio" className="ms-3 text-gray-900">
                <LocalShippingOutlinedIcon />{" "}
                <span className="mx-2">Hỏa tốc (Từ 1 - 2 ngày)</span>
              </label>
            </div>
            <div className="font-bold text-base">50.000 VND</div>
          </div>

          <div className="flex justify-between items-center pt-5">
            <div className="text-lg flex gap-x-2 items-center">
              <input
                id="standard-radio"
                type="radio"
                value="30000"
                name="shipping-method"
                className="w-4 h-4 accent-black text-black bg-gray-100 border-gray-300 rounded"
                onChange={(e) => {
                  setShippingFee(parseInt(e.target.value));
                  setShippingMethod("standard");
                }}
              />
              <label htmlFor="standard-radio" className="ms-3 text-gray-900">
                <DeliveryDiningOutlinedIcon />{" "}
                <span className="mx-2">Tiêu chuẩn (Từ 5 - 7 ngày)</span>
              </label>
            </div>
            <div className="font-bold text-base">30.000 VND</div>
          </div>
          {errors.shippingMethod && (
            <p className="text-red-500">{errors.shippingMethod}</p>
          )}
        </div>
        <div className="mt-8">
          <div className="text-xl font-bold px-5 py-3 bg-slate-100 mt-5">
            Phương thức thanh toán
          </div>
          <div className="flex justify-between items-center pt-5">
            <div className="text-lg flex gap-x-2 items-center">
              <input
                id="cod-radio"
                type="radio"
                value="cod"
                name="payment-method"
                className="w-4 h-4 accent-black text-black bg-gray-100 border-gray-300 rounded"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label htmlFor="cod-radio" className="ms-3 text-gray-900">
                <span className="mx-2">Thanh toán khi nhận hàng</span>
              </label>
              <SourceOutlinedIcon />{" "}
            </div>
          </div>

          <div className="flex justify-between items-center pt-5">
            <div className="text-lg flex gap-x-2 items-center">
              <input
                id="qr-radio"
                type="radio"
                value="qr"
                name="payment-method"
                className="w-4 h-4 accent-black text-black bg-gray-100 border-gray-300 rounded"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label htmlFor="qr-radio" className="ms-3 text-gray-900">
                <span className="mx-2">VNPay QR</span>
              </label>
              <QrCodeOutlinedIcon />{" "}
            </div>
          </div>

          <div className="flex justify-between items-center pt-5">
            <div className="text-lg flex gap-x-2 items-center">
              <input
                id="credit-radio"
                type="radio"
                value="credit"
                name="payment-method"
                className="w-4 h-4 accent-black text-black bg-gray-100 border-gray-300 rounded"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label htmlFor="credit-radio" className="ms-3 text-gray-900">
                <span className="mx-2">Thẻ tín dụng</span>
              </label>
              <CreditCardOutlinedIcon />{" "}
            </div>
          </div>
          {errors.paymentMethod && (
            <p className="text-red-500">{errors.paymentMethod}</p>
          )}
        </div>
      </div>

      <div className="w-1/2 bg-slate-100 h-1/2 rounded p-8">
        <div className="text-2xl font-bold pb-2 border-b border-gray-300">
          Đơn hàng
        </div>
        <div className="max-h-72 overflow-y-auto mt-5">
          {cart.cartItems.map((item) => (
            <div key={item.variantId} className="flex justify-between mb-4">
              <div className="flex w-2/3">
                <img
                  src={item.imageUrl}
                  alt={item.productName}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="ml-4">
                  <div className="font-bold">{item.productName}</div>
                  <div className="text-sm">Size: {item.size}</div>
                  <div className="text-sm">Số lượng: {item.quantity}</div>
                  <div className="text-sm">Màu sắc: {item.color}</div>
                </div>
              </div>
              <div className="text-lg font-bold">
                {formatNumber(item.price * item.quantity)} VND
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between text-lg mt-5">
          <div className="font-bold">Tạm tính</div>
          <div>{formatNumber(cart.totalPrice)} VND</div>
        </div>
        <div className="flex justify-between text-lg mt-3 ">
          <div className="font-bold">Phí ship</div>
          <div>{formatNumber(shippingFee)} VND</div>
        </div>
        <div className="flex justify-between text-lg mt-3 ">
          <div className="font-bold">Giảm giá</div>
          <div>-{formatNumber(discount)} VND</div>
        </div>
        <div className="flex justify-between text-lg mt-3">
          <div className="font-bold">Tổng tiền</div>
          <div className="font-bold">{formatNumber(calculateTotal())} VND</div>
        </div>
        <button
          className="mt-20 w-full uppercase font-bold text-xl bg-red-500 p-5 text-white text-center hover:text-white"
          onClick={handleCompleteOrder}
          disabled={loading} 
        >
          {loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Đặt hàng"
        )}
        </button>
      </div>
      <ToastContainer position="top-right" autoClose={1000} />
    </div>
  );
}

export default ShipmentDetails;
