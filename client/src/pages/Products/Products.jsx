// components/ProductsPage.jsx

import React, { useRef } from "react";
import { useProductsLogic } from "./hooks/useProductsLogic";
import ProductsToolbar from "./components/ProductsToolbar";
import ProductsGrid from "./components/ProductsGrid";
import ProductsPagination from "./components/ProductsPagination";
import NoResults from "./components/NoResult";
import FilterSidebar from "./ProductFilter/ProductFilter";
import heroImage from "../../../src/assets/images/pipes.jpg";
import HeroSection from "../../components/HeroSection/HeroSection";

const ProductsPage = ({ addToCart }) => {
  const logic = useProductsLogic();
  const {
    loading,
    error,
    currentProducts,
    totalPages,
    currentPage,
    setCurrentPage,
    viewMode,
    setViewMode,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    itemsPerPage,
    setItemsPerPage,
    sidebarOpen,
    setSidebarOpen,
    filters,
    setFilters,
    availableCategories,
    getFilterCount,
  } = logic;

  // Asegura que nunca sea undefined
  const safeProducts = Array.isArray(currentProducts) ? currentProducts : [];

  const toolbarRef = useRef(null);

  if (loading)
    return <div className="flex justify-center p-20">Cargando...</div>;

  if (error) {
    const errorMessage =
      typeof error === "string" ? error : error.message || "Error desconocido";
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
          {...{
            searchTerm,
            setSearchTerm,
            sortBy,
            setSortBy,
            itemsPerPage,
            setItemsPerPage,
            viewMode,
            setViewMode,
            sidebarOpen,
            setSidebarOpen,
            getFilterCount,
          }}
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
            onClearFilters={() => setFilters({})}
          />
        )}
      </div>

      <FilterSidebar
        filters={filters}
        onFilterChange={setFilters}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(false)}
        categories={availableCategories}
      />

      <HeroSection heroImage={heroImage} />
    </div>
  );
};

export default ProductsPage;
