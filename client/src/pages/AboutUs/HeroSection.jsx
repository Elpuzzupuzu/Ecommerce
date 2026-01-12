import React from "react";
import { CheckCircle } from "lucide-react";

const HeroSection = ({
  heroImage = "https://images.unsplash.com/photo-1585386959984-a41552231693?w=1200&h=900&fit=crop",
}) => (
  <section className="bg-gradient-to-b from-white to-gray-50 py-24 px-6 lg:py-32">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24 items-center">

        {/* CONTENT */}
        <div className="lg:col-span-2 space-y-8">

          {/* Headline */}
          <div>
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
              Compra fácil.
              <span className="block text-[#FF9900] mt-2">
                Entrega rápida.
              </span>
            </h1>

            <div className="w-12 h-1 bg-[#FF9900]/80 mt-6 mb-8 rounded-full"></div>

            <p className="text-xl text-gray-700 leading-relaxed max-w-xl">
              Encuentra millones de productos en tecnología, hogar, moda y más.
              <span className="font-semibold text-gray-900">
                {" "}Precios competitivos y envíos confiables todos los días.
              </span>
            </p>
          </div>

          {/* Trust bullets */}
          <div className="space-y-4 pt-4">
            <div className="flex items-start gap-4">
              <div className="bg-gray-100 p-1.5 rounded-md">
                <CheckCircle className="w-5 h-5 text-[#FF9900]" />
              </div>
              <span className="text-gray-800 font-medium text-lg">
                Millones de productos disponibles
              </span>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-gray-100 p-1.5 rounded-md">
                <CheckCircle className="w-5 h-5 text-[#FF9900]" />
              </div>
              <span className="text-gray-800 font-medium text-lg">
                Envíos rápidos y seguimiento en tiempo real
              </span>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-gray-100 p-1.5 rounded-md">
                <CheckCircle className="w-5 h-5 text-[#FF9900]" />
              </div>
              <span className="text-gray-800 font-medium text-lg">
                Devoluciones simples y seguras
              </span>
            </div>
          </div>

          {/* CTA */}
          <div className="pt-6">
            <a
              href="https://www.amazon.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-[#FF9900] hover:bg-[#e88b00] rounded-lg shadow-lg transition"
            >
              Explorar productos
            </a>
          </div>
        </div>

        {/* IMAGE */}
        <div className="lg:col-span-3">
          <div className="relative">
            <div className="relative bg-white rounded-xl overflow-hidden shadow-xl border border-gray-100">
              <img
                src={heroImage}
                alt="Productos ecommerce"
                className="w-full h-auto object-cover aspect-[4/3] lg:aspect-[3/2]"
              />
            </div>

            {/* Trust badge */}
            <div className="mt-8">
              <div className="bg-white rounded-lg px-6 py-5 border-l-4 border-[#FF9900] shadow-md">
                <p className="text-gray-800 font-medium text-lg text-center leading-relaxed">
                  ⭐ Más de 1 millón de clientes confían en nuestra plataforma
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
);

export default HeroSection;
