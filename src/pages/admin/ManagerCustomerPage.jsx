import React, { useState } from "react";
import Sidebar from "../../components/admin/SideBar";
import Header from "../../components/admin/Header"; // Import Header component


const ManagerCustomerPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

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
          Customeer
        </main>
      </div>
    </div>
  );
};

export default ManagerCustomerPage;
