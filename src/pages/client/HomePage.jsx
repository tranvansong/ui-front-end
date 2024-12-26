import React from 'react'
import Banner from "../../components/client/Banner";
import Footer from "../../components/client/Footer";
import Header from "../../components/client/Header";
import Line from "../../components/client/Line";
import NewArrivals from "../../components/client/NewArrivals";
import Rectangle from "../../components/client/Rectangle";
import TopSeller from "../../components/client/TopSeller";

const HomePage = () => {
  return (
    <div>
      <Header />
      <Banner />
      <Rectangle />
      <NewArrivals />
      <Line />
      <TopSeller />
      <Footer />
    </div>
  )
}

export default HomePage