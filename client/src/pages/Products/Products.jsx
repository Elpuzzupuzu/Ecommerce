// components/ProductsPage.jsx
import React, { useRef } from "react";
import { useProductsLogic } from "./hooks/useProductsLogic";

import ProductsToolbar from "./components/ProductsToolbar";
import ProductsGrid from "./components/ProductsGrid";
import ProductsPagination from "./components/ProductsPagination";
import NoResults from "./components/NoResult";
import FilterSidebar from "./ProductFilter/ProductFilter";

import HeroSection from "../../components/HeroSection/HeroSection";
import heroImage from "../../../src/assets/images/pipes.jpg";

const ProductsPage = ({ addToCart }) => {
  const toolbarRef = useRef(null);

  const {
    loading,
    error,
    currentProducts,
    totalPages,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    viewMode,
    setViewMode,
    sortBy,
    setSortBy,
    sidebarOpen,
    setSidebarOpen,
    getFilterCount,
  } = useProductsLogic();

  const safeProducts = Array.isArray(currentProducts)
    ? currentProducts
    : [];

  if (loading) {
    return (
      <div className="flex justify-center p-20">
        Cargando...
      </div>
    );
  }

  if (error) {
    const errorMessage =
      typeof error === "string"
        ? error
        : error?.message || "Error desconocido";

    return (
      <div className="text-center text-red-600 p-20">
        Error: {errorMessage}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-100 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 py-8">

        <ProductsToolbar
          ref={toolbarRef}
          viewMode={viewMode}
          setViewMode={setViewMode}
          sortBy={sortBy}
          setSortBy={setSortBy}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          getFilterCount={getFilterCount}
        />

        {safeProducts.length > 0 ? (
          <>
            <ProductsGrid
              products={safeProducts}
              viewMode={viewMode}
              addToCart={addToCart}
            />

            <ProductsPagination
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              scrollToRef={toolbarRef}
            />
          </>
        ) : (
          <NoResults
            message="No hay productos que coincidan con tu búsqueda."
          />
        )}
      </div>

      <FilterSidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(false)}
      />

      <HeroSection heroImage={heroImage} />
    </div>
  );
};

export default ProductsPage;
