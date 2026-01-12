import React from "react";

const StatCard = ({ icon: Icon, number = 0, label = "" }) => (
  <div className="text-center group">
    {/* Icono */}
    <div className="w-16 h-16 mx-auto mb-5 bg-[#FF9900] rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-300">
      {Icon && <Icon className="w-8 h-8 text-white" />}
    </div>

    {/* Número */}
    <div className="text-5xl font-extrabold text-gray-900 mb-2">
      {number}
    </div>

    {/* Separador */}
    <div className="w-10 h-0.5 bg-[#FF9900] mx-auto mb-3 opacity-60"></div>

    {/* Label */}
    <div className="text-gray-600 font-medium text-sm uppercase tracking-wide">
      {label}
    </div>
  </div>
);

export default StatCard;
