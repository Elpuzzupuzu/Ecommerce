import React from "react";
import { Star, CheckCircle } from "lucide-react";

const TestimonialCard = ({ name, role, text, rating = 5, avatar }) => (
  <div className="bg-white rounded-lg p-6 border border-gray-200 hover:border-blue-900 transition-all duration-300 hover:shadow-md group">
    
    {/* Header */}
    <div className="flex items-center mb-4">
      {/* Avatar */}
      <div className="w-11 h-11 bg-blue-900 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-4 flex-shrink-0">
        {avatar}
      </div>

      <div className="flex-1">
        <h4 className="font-semibold text-gray-900 leading-tight">
          {name}
        </h4>
        <p className="text-xs text-gray-500">{role}</p>
      </div>
    </div>

    {/* Rating */}
    <div className="flex items-center mb-3">
      <div className="flex items-center space-x-1 mr-3">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? "text-yellow-400" : "text-gray-300"
            }`}
            fill={i < rating ? "currentColor" : "none"}
          />
        ))}
      </div>
      <span className="text-sm font-medium text-gray-700">
        {rating}.0 de 5
      </span>
    </div>

    {/* Review */}
    <p className="text-gray-700 text-sm leading-relaxed mb-4">
      {text}
    </p>

    {/* Footer */}
    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
      <div className="flex items-center text-xs text-green-600 font-medium">
        <CheckCircle className="w-4 h-4 mr-1" />
        Compra verificada
      </div>

      <span className="text-xs text-gray-400">
        Hace pocos días
      </span>
    </div>
  </div>
);

export default TestimonialCard;
