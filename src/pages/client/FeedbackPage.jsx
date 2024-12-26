import React, { useState } from "react";
import Header from "../../components/client/Header";
import Footer from "../../components/client/Footer";

const FeedbackPage = () => {
  const [feedback, setFeedback] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback({
      ...feedback,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Feedback Submitted:", feedback);
    alert("Thank you for your feedback!");
    setFeedback({ name: "", email: "", message: "" });
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 py-5">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
          <h2 className="text-3xl font-bold mb-6 text-center text-slate-600">
            Feedback của bạn
          </h2>
          <p className="text-center text-gray-600 mb-6">
            We appreciate your feedback! Please let us know about your
            experience with our store.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={feedback.name}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-slate-500"
              />
            </div>
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={feedback.email}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-slate-500"
              />
            </div>
            <div>
              <label className="block text-gray-700">Feedback</label>
              <textarea
                name="message"
                value={feedback.message}
                onChange={handleChange}
                required
                className="w-full p-3 h-32 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-slate-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-slate-600 text-white p-3 rounded hover:bg-slate-700 transition duration-300"
            >
              Submit Feedback
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FeedbackPage;
