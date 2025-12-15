import React from 'react';
import { Sliders, X } from 'lucide-react';
import { useFilterLogic } from './components/useFilterLogic';
import { CategorySection, SubcategorySection, PriceRangeSection } from './components/FilterSections';

const FilterSidebar = ({ filters, onFilterChange, isOpen, onToggle }) => {
  const {
    pendingFilters,
    isAnimating,
    setIsAnimating,
    handleCategoryChange,
    handleSubCategoryChange,
    handlePriceRangeChange,
    applyFilters,
    clearAllFilters,
    getFilterCount,
  } = useFilterLogic(filters, onFilterChange, isOpen);

  // ------------------------------------
  // ✔ Detectar filtros activos y cambios pendientes
  // ------------------------------------
 // Detecta si hay filtros activos
const hasActiveFilters =
  pendingFilters.mainCategoryId ||
  pendingFilters.subCategoryId ||
  pendingFilters.priceRange;

// Detecta si hay cambios pendientes respecto a los filtros aplicados
const hasPendingChanges =
  pendingFilters.mainCategoryId !== filters.mainCategoryId ||
  pendingFilters.subCategoryId !== filters.subCategoryId ||
  pendingFilters.priceRange !== filters.priceRange;

// Botón habilitado si hay cambios pendientes o filtros activos
const canApplyFilters = hasPendingChanges || hasActiveFilters;

console.log("[BUTTON STATE]", {
  hasActiveFilters,
  hasPendingChanges,
  canApplyFilters,
  pendingFilters,
  filters
});


  // Evita el renderizado innecesario cuando está cerrado y la animación termina
  if (!isOpen && !isAnimating) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ease-out ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onToggle}
        onTransitionEnd={() => !isOpen && setIsAnimating(false)}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-all duration-500 ${
          isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
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

            <button onClick={onToggle} className="p-2 hover:bg-gray-200 rounded-lg">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* CONTENIDO */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">

            <CategorySection
              pendingFilters={pendingFilters}
              onCategoryChange={(id) => {
                console.log("[CATEGORY CHANGE] ID:", id);
                handleCategoryChange(id);
              }}
            />

            <SubcategorySection
              pendingFilters={pendingFilters}
              onSubCategoryChange={(id) => {
                console.log("[SUBCATEGORY CHANGE] ID:", id);
                handleSubCategoryChange(id);
              }}
            />

            <PriceRangeSection
              pendingFilters={pendingFilters}
              onPriceRangeChange={(range) => {
                console.log("[PRICE RANGE CHANGE] range:", range);
                handlePriceRangeChange(range);
              }}
            />

            {/* BOTÓN LIMPIAR */}
            <button
              onClick={() => {
                console.log("[BUTTON CLICK] Limpiar filtros");
                clearAllFilters();
                onToggle(); // cerrar al limpiar
              }}
              className="w-full py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600"
              disabled={!hasActiveFilters} // activado si hay filtros activos
            >
              Limpiar Filtros
            </button>

            {/* BOTÓN APLICAR */}
            <button
              onClick={() => {
                console.log("[BUTTON CLICK] Aplicar filtros");
                applyFilters();
                onToggle(); // cerrar al aplicar
              }}
              disabled={!canApplyFilters} // activado solo si hay cambios pendientes
              className={`w-full py-2 px-4 text-white rounded-lg transition ${
                hasPendingChanges
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-gray-300 cursor-not-allowed'
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

// Botón de toggle
export const FilterToggleButton = ({ isOpen, onToggle, filterCount = 0 }) => {
  return (
    <button
      onClick={onToggle}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
        isOpen
          ? 'bg-blue-600 text-white border-blue-600'
          : 'bg-white text-gray-700 border-gray-300'
      }`}
    >
      <Sliders className={`w-4 h-4 ${isOpen ? 'rotate-180' : ''}`} />
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
