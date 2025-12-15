import React from "react";
import { Sliders, X } from "lucide-react";
import { useSelector } from "react-redux";
import { useFilterLogic } from "./components/useFilterLogic";
import {
  CategorySection,
  SubcategorySection,
  PriceRangeSection,
} from "./components/FilterSections";

const FilterSidebar = ({ isOpen, onToggle }) => {
  // 🔥 Filtros aplicados desde Redux
  const appliedFilters = useSelector((s) => s.filters.applied);

  const {
    pendingFilters,
    isAnimating,
    setIsAnimating,
    handleCategoryChange,
    handleSubCategoryChange,
    handlePriceRangeChange,
    applyFilters,
    clearAll,
    getFilterCount,
  } = useFilterLogic(isOpen);

  // ------------------------------------
  // ✔ Estados derivados (PUROS)
  // ------------------------------------
  const hasActiveFilters =
    appliedFilters.mainCategoryId ||
    appliedFilters.subCategoryId ||
    appliedFilters.priceRange;

  const hasPendingChanges =
    pendingFilters.mainCategoryId !== appliedFilters.mainCategoryId ||
    pendingFilters.subCategoryId !== appliedFilters.subCategoryId ||
    pendingFilters.priceRange !== appliedFilters.priceRange;

  const canApplyFilters = hasPendingChanges;

  // Evita render innecesario
  if (!isOpen && !isAnimating) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onToggle}
        onTransitionEnd={() => !isOpen && setIsAnimating(false)}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-all duration-500 ${
          isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
        }`}
        onTransitionEnd={() => !isOpen && setIsAnimating(false)}
      >
        <div className="h-full flex flex-col">

          {/* HEADER */}
          <div className="flex items-center justify-between p-4 border-b bg-gray-100">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <Sliders className="w-4 h-4" />
              Filtros
              {getFilterCount() > 0 && (
                <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
                  {getFilterCount()}
                </span>
              )}
            </h3>

            <button
              onClick={onToggle}
              className="p-2 hover:bg-gray-200 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* CONTENIDO */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            <CategorySection
              pendingFilters={pendingFilters}
              onCategoryChange={handleCategoryChange}
            />

            <SubcategorySection
              pendingFilters={pendingFilters}
              onSubCategoryChange={handleSubCategoryChange}
            />

            <PriceRangeSection
              pendingFilters={pendingFilters}
              onPriceRangeChange={handlePriceRangeChange}
            />

            {/* LIMPIAR */}
            <button
              onClick={() => {
                clearAll();
                onToggle();
              }}
              disabled={!hasActiveFilters}
              className="w-full py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50"
            >
              Limpiar filtros
            </button>

            {/* APLICAR */}
            <button
              onClick={() => {
                applyFilters();
                onToggle();
              }}
              disabled={!canApplyFilters}
              className={`w-full py-2 px-4 text-white rounded-lg transition ${
                canApplyFilters
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              Aplicar filtros
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// -------------------------------------------------
// BOTÓN TOGGLE
// -------------------------------------------------
export const FilterToggleButton = ({ isOpen, onToggle }) => {
  const filterCount = useSelector((s) =>
    (s.filters.applied.mainCategoryId ? 1 : 0) +
    (s.filters.applied.subCategoryId ? 1 : 0) +
    (s.filters.applied.priceRange ? 1 : 0)
  );

  return (
    <button
      onClick={onToggle}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
        isOpen
          ? "bg-blue-600 text-white border-blue-600"
          : "bg-white text-gray-700 border-gray-300"
      }`}
    >
      <Sliders className="w-4 h-4" />
      <span>Filtros</span>

      {filterCount > 0 && (
        <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-600">
          {filterCount}
        </span>
      )}
    </button>
  );
};

export default FilterSidebar;
