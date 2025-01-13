import React from "react";

const ContactContent = () => {
  return (
    <div className="flex flex-col items-center px-4 py-8 bg-gray-100 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Liên hệ với chúng tôi</h1>
      <div className="max-w-4xl w-full bg-white shadow-md rounded-lg p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Thông tin cửa hàng</h2>
          <p className="text-gray-600">
            <strong>Địa chỉ:</strong> Học viện công nghệ Bưu Chính Viễn Thông,
            Hà Đông, Hà Nội
          </p>
          <p className="text-gray-600">
            <strong>Hotline:</strong> 01234 567890
          </p>
          <p className="text-gray-600">
            <strong>Email:</strong> songtv.b20cn570@stu.ptit.edu.vn
          </p>
          <p className="text-gray-600">
            <strong>Giờ làm việc:</strong> Thứ 2 - Thứ 7: 8:00 - 18:00
          </p>
        </div>

        <div className="mb-6">
          <div className="mt-8">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2430.171133444537!2d105.7848415728002!3d20.980917989424814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135accdd8a1ad71%3A0xa2f9b16036648187!2sPosts%20and%20Telecommunications%20Institute%20of%20Technology%20(PTIT)!5e1!3m2!1sen!2s!4v1735923858287!5m2!1sen!2s"
              className="w-full h-64 rounded-lg"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactContent;
