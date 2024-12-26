import React, { useEffect, useState } from "react";
import Sidebar from "../../components/admin/SideBar";
import Header from "../../components/admin/Header";
import { Bar, Line } from "react-chartjs-2";
import "chart.js/auto";
import { getAllOrders } from "../../api/order/order";

const StatisticsPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [availableYears, setAvailableYears] = useState([]);


  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getAllOrders();
        setOrders(data);
        console.log(data)
        const years = Array.from(
          new Set(
            data
              .map((order) => {
                const date = new Date(order.orderDate);
                return isNaN(date.getTime()) ? null : date.getFullYear();
              })
              .filter((year) => year !== null) // Loại bỏ các giá trị null
          )
        );
        console.log(years)
        setAvailableYears(years);

      } catch (error) {
        console.error('Lỗi khi tải đơn hàng:', error);
      }
    };
    fetchOrders();
  }, []);

  // Lọc dữ liệu theo năm
  const filteredOrders = orders.filter((order) => {
    const orderYear = new Date(order.orderDate).getFullYear();
    return orderYear === selectedYear && order.status === "DELIVERED";
  });

  // Tính tổng doanh thu và số đơn hàng
  const totalRevenue = filteredOrders.reduce(
    (sum, order) => sum + order.totalPayment,
    0
  );
  const totalOrders = filteredOrders.length;

  // Tính doanh thu theo tháng và số lượng bán theo tháng
  const revenueByMonth = Array(12).fill(0);
  const orderQuantityByMonth = Array(12).fill(0);

  filteredOrders.forEach((order) => {
    const month = new Date(order.orderDate).getMonth();
    revenueByMonth[month] += order.totalPayment;

    orderQuantityByMonth[month]++;
  });

  // Dữ liệu cho biểu đồ Doanh thu
  const revenueChartData = {
    labels: [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ],
    datasets: [
      {
        label: "Doanh thu (VNĐ)",
        data: revenueByMonth,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        tension: 0.4,
        hoverBackgroundColor: "rgba(75, 192, 192, 0.8)",
      },
    ],
  };

  const orderQuantityChartData = {
    labels: [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ],
    datasets: [
      {
        label: "Số lượng đơn hàng",
        data: orderQuantityByMonth,
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
        tension: 0.4,
        hoverBackgroundColor: "rgba(153, 102, 255, 0.8)",
      },
    ],
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          isProfileDropdownOpen={isProfileDropdownOpen}
          setIsProfileDropdownOpen={setIsProfileDropdownOpen}
        />
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Phần tiêu đề và chọn năm */}
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">
              Thống kê doanh thu
            </h1>
            <select
              className="border border-gray-300 rounded outline-none hover:bg-slate-50 px-3 py-2 shadow-md"
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
            >
              {availableYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          {/* Tổng quan */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded shadow flex flex-col items-center">
              <h2 className="text-lg font-semibold text-gray-600">
                Tổng doanh thu
              </h2>
              <p className="text-2xl font-bold text-green-600">
                {totalRevenue.toLocaleString()} VNĐ
              </p>
            </div>
            <div className="bg-white p-6 rounded shadow flex flex-col items-center">
              <h2 className="text-lg font-semibold text-gray-600">
                Tổng số đơn hàng
              </h2>
              <p className="text-2xl font-bold text-blue-600">{totalOrders}</p>
            </div>
          </div>
          {/* Biểu đồ Doanh thu */}
          <div className="bg-white p-6 rounded shadow mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Doanh thu theo tháng
            </h2>
            <Line data={revenueChartData} />
          </div>
          {/* Biểu đồ Số lượng đơn hàng */}
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Số lượng đơn hàng theo tháng
            </h2>
            <Line data={orderQuantityChartData} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default StatisticsPage;
