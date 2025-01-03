import React, { useEffect } from "react";
import Header from "../../components/client/Header";
import Footer from "../../components/client/Footer";
import { useLocation } from "react-router-dom";
import ShipmentDetails from "../../components/client/ShipmentDetails";

const CheckOutPage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.cart) {
      console.log("Cart data:", location.state.cart);
    } else {
      console.log("No cart data available.");
    }
  }, [location]);

  return (
    <div>
      <Header />
      <ShipmentDetails cart={location.state.cart} />
      <Footer />
    </div>
  );
};

export default CheckOutPage;