import React from 'react';

const NavItem = ({ icon, label, isOpen }) => (
  <button className="flex items-center w-full p-3 rounded-lg hover:bg-gray-100 transition-colors">
    <span className="text-gray-600">{icon}</span>
    {isOpen && <span className="ml-3">{label}</span>}
  </button>
);

export default NavItem;
