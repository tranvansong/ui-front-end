import React, { useEffect, useState } from "react";
import Sidebar from "../../components/admin/SideBar";
import Header from "../../components/admin/Header";
import { Line } from "react-chartjs-2";
import { toast } from "react-toastify";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import { getProducts, getProductsLowQuantity } from "../../api/product/product";
import { getAllAccounts } from "../../api/users/user";
import { getAllOrders } from "../../api/order/order";

const DashboardPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [totalOrder, setTotalOrder] = useState(0);
  const [totalUser, setTotalUser] = useState(0);
  const [totalProduct, setTotalProduct] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);

  const currentYear = new Date().getFullYear();
  console.log(currentYear)
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Gọi API lấy sản phẩm
        const productsResponse = await getProducts();
        if (productsResponse) {
          setTotalProduct(productsResponse.length);
        } else {
          setTotalProduct(0);
        }

        const productsLowQuantity = await getProductsLowQuantity();
        setLowStockProducts(productsLowQuantity);

        // Gọi API lấy tài khoản người dùng
        const accountsResponse = await getAllAccounts();
        if (accountsResponse) {
          setTotalUser(accountsResponse.length);
        } else {
          setTotalUser(0);
        }

        // Gọi API lấy đơn hàng
        const ordersResponse = await getAllOrders();
        if (ordersResponse) {
          setTotalOrder(ordersResponse.length);

          const { revenueByMonth, orderQuantityByMonth, totalRevenue } =
            calculateYearlyStats(ordersResponse, currentYear);
          setMonthlyRevenue(revenueByMonth);
          setTotalRevenue(totalRevenue);

          const pending = ordersResponse.filter(
            (order) => order.status === "PENDING"
          ).length;
          setPendingOrders(pending);
        } else {
          setTotalOrder(0);
        }
      } catch (error) {
        toast.error("Đã xảy ra lỗi khi tải dữ liệu");
      }
    };

    fetchData();
  }, [currentYear]);

  const calculateYearlyStats = (orders, selectedYear) => {
    const filteredOrders = orders.filter((order) => {
      const orderYear = new Date(order.orderDate).getFullYear();
      return orderYear === selectedYear && order.status === "DELIVERED";
    });

    const totalRevenue = filteredOrders.reduce(
      (sum, order) => sum + order.totalPayment,
      0
    );

    const revenueByMonth = Array(12).fill(0);
    const orderQuantityByMonth = Array(12).fill(0);

    filteredOrders.forEach((order) => {
      const month = new Date(order.orderDate).getMonth();
      revenueByMonth[month] += order.totalPayment;
      orderQuantityByMonth[month]++;
    });

    return { revenueByMonth, orderQuantityByMonth, totalRevenue };
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <StatisticCard
              title={`Thu nhập ${currentYear}`}
              value={totalRevenue}
              icon={<AttachMoneyIcon />}
            />
            <StatisticCard
              title="Tổng sản phẩm"
              value={totalProduct}
              icon={<ViewInArIcon />}
            />
            <StatisticCard
              title="Tổng đơn hàng"
              value={totalOrder}
              icon={<ShoppingBagOutlinedIcon />}
            />
            <StatisticCard
              title="Tổng user"
              value={totalUser}
              icon={<PeopleAltOutlinedIcon />}
            />
          </div>

          {/* Monthly Revenue Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Thông báo</h2>
              <ul>
                <li className="mb-2">
                  <div>
                    <span className="font-medium">Sản phẩm sắp hết hàng:</span>{" "}
                    <span className="text-red-600 font-bold text-xl">
                      {lowStockProducts.length}
                    </span>{" "}
                    sản phẩm
                  </div>
                  <div className="my-4">
                    <ul>
                      {lowStockProducts.map((product) => (
                        <li
                          key={product.id}
                          className="list-disc ml-4 mb-2">
                          <div>
                            <p className="font-medium text-sm">
                              {product.name}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
                <li className="mb-2">
                  <span className="font-medium">Đơn hàng chờ xác nhận:</span>{" "}
                  <span className="text-blue-600 font-bold text-xl">
                    {pendingOrders}
                  </span>{" "}
                  đơn hàng
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">
                Biểu đồ doanh thu theo tháng
              </h2>
              <Line
                data={{
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
                      label: "Doanh thu",
                      data: monthlyRevenue,
                      borderColor: "rgba(75, 192, 192, 1)",
                      backgroundColor: "rgba(75, 192, 192, 0.2)",
                      tension: 0.4,
                    },
                  ],
                }}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const StatisticCard = ({ title, value, icon }) => (
  <div className="rounded-lg p-6 text-white shadow-lg bg-blue-500">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm opacity-80">{title}</p>
        <p className="text-2xl font-bold mt-1">{value.toLocaleString()}</p>
      </div>
      <div className="text-3xl opacity-80">{icon}</div>
    </div>
  </div>
);

export default DashboardPage;
