import React from "react";
import Header from "../../components/client/Header";
import Footer from "../../components/client/Footer";

const AboutPage = () => {
  return (
    <div>
      <Header />
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          {/* Tiêu đề chính */}
          <h1 className="text-4xl md:text-6xl font-bold text-center text-gray-800 mb-8">
            Về Chúng Tôi
          </h1>

          <section className="text-center mb-12">
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Tại{" "}
              <span className="font-semibold text-gray-800">SHOP. CLOTHES</span>,
              chúng tôi cam kết mang đến cho bạn những sản phẩm thời trang chất
              lượng và phong cách nhất. Được thành lập từ năm 2020, cửa hàng của
              chúng tôi luôn nỗ lực cung cấp các sản phẩm đa dạng, cập nhật xu
              hướng mới nhất.
            </p>
          </section>

          <section className="flex justify-center mb-12">
            <img
              className="w-full max-w-2xl rounded-lg shadow-lg"
              src="https://antonovich-design.ae/uploads/page/2022/4/antonovich-design-2022Bet5IXmKRFzW.webp"
              alt="About our store"
            />
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
              Sứ Mệnh Của Chúng Tôi
            </h2>
            <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto">
              Sứ mệnh của chúng tôi là giúp bạn thể hiện bản thân thông qua thời
              trang. SHOP. CLOTHES không chỉ là một cửa hàng, mà còn là nơi bạn tìm
              thấy phong cách riêng và tự tin trong cuộc sống hằng ngày.
            </p>
          </section>
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
              Giá Trị Cốt Lõi
            </h2>
            <div className="flex flex-wrap gap-8 justify-center">
              <div className="bg-white rounded-lg shadow-md p-6 w-full md:w-1/3 text-center">
                <h3 className="text-xl font-semibold text-gray-800">
                  Chất Lượng
                </h3>
                <p className="text-gray-600 mt-2">
                  Chúng tôi lựa chọn cẩn thận từng sản phẩm để đảm bảo chất
                  lượng vượt trội.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 w-full md:w-1/3 text-center">
                <h3 className="text-xl font-semibold text-gray-800">
                  Phong Cách
                </h3>
                <p className="text-gray-600 mt-2">
                  Mỗi sản phẩm đều thể hiện cá tính riêng, giúp bạn tự tin với
                  phong cách của mình.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 w-full md:w-1/3 text-center">
                <h3 className="text-xl font-semibold text-gray-800">
                  Khách Hàng Là Trên Hết
                </h3>
                <p className="text-gray-600 mt-2">
                  Chúng tôi lắng nghe ý kiến của bạn và cam kết mang lại trải
                  nghiệm tốt nhất.
                </p>
              </div>
            </div>
          </section>
          <section>
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
              Liên Hệ Với Chúng Tôi
            </h2>
            <p className="text-center text-gray-600 max-w-xl mx-auto">
              Nếu bạn có bất kỳ câu hỏi nào hoặc cần hỗ trợ, đừng ngần ngại liên
              hệ với chúng tôi qua các kênh sau:
            </p>
            <div className="flex justify-center mt-6 space-x-8">
              <a
                href="mailto:songtv.b20cn570@stu.ptit.edu.vn"
                className="text-blue-500 hover:underline"
              >
                Email: songtv.b20cn570@stu.ptit.edu.vn
              </a>
              <a
                href="tel:0123456789"
                className="text-blue-500 hover:underline"
              >
                SĐT: 0123 456 789
              </a>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
