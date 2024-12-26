// AnalyticCard.js
import React from 'react';

const AnalyticCard = ({ title, value }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm">
    <h4 className="text-sm font-medium text-gray-500 mb-2">{title}</h4>
    <p className="text-2xl font-semibold">{value}</p>
  </div>
);

export default AnalyticCard;
