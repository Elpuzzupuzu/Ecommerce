import React, { useState } from "react";
import { Heart } from "lucide-react";
import { useProductRotation } from "../hooks/useProductRotation";

const ProductImage360 = ({ product, userId, favorite, onToggleWishlist }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Hook de rotación con sensibilidad ajustable
  const { imageRef, handlePointerDown } = useProductRotation(0.4);

  return (
    <div
      className="w-full max-w-2xl relative cursor-grab active:cursor-grabbing mb-10 group"
      onMouseDown={handlePointerDown}
      onTouchStart={handlePointerDown}
    >
      {/* Contenedor de imagen con efecto glassmorphism */}
      <div className="relative rounded-3xl bg-gradient-to-br from-white via-gray-50 to-blue-50 border-2 border-gray-100 shadow-2xl overflow-hidden [perspective:1200px] backdrop-blur-sm">

        {/* Efecto de brillo animado en hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        </div>

        {/* Skeleton loader mejorado */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" />
          </div>
        )}

        {/* Imagen del producto */}
        <img
          ref={imageRef}
          src={product.imagen}
          alt={product.nombre}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-80 lg:h-[450px] object-contain [transform-style:preserve-3d] transition-all duration-500 ${
            imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        />

        {/* Sombra interna sutil */}
        <div className="absolute inset-0 shadow-inner pointer-events-none rounded-3xl" />
      </div>

      {/* Botón de wishlist mejorado */}
      {userId && (
        <button
          onClick={() => onToggleWishlist(product.id)}
          className={`absolute top-5 right-5 p-3 rounded-2xl shadow-lg transition-all duration-300 backdrop-blur-md border ${
            favorite
              ? "bg-red-500/90 hover:bg-red-600 border-red-400 scale-110"
              : "bg-white/90 hover:bg-white border-gray-200 hover:scale-110"
          }`}
        >
          <Heart
            className={`w-6 h-6 transition-all duration-300 ${
              favorite
                ? "text-white fill-white animate-pulse"
                : "text-gray-500 hover:text-red-500"
            }`}
          />
        </button>
      )}

      {/* Indicador de "arrastra para rotar" */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/60 backdrop-blur-md text-white text-xs font-medium rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <span className="flex items-center gap-2">
          <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
          </svg>
          Arrastra para rotar
        </span>
      </div>
    </div>
  );
};

export default ProductImage360;
