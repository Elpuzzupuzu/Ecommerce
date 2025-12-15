import React from 'react';
import { Package, Filter, DollarSign } from 'lucide-react';
import { categories, subcategories, priceRanges } from './FilterData';
import { chunkArray } from './utils';

// --- Categoría ---
export const CategorySection = ({ pendingFilters, onCategoryChange }) => (
  <div>
    <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
      <Package className="w-4 h-4" />
      Categorías
    </h4>
    <div className="space-y-2">
      {categories.map(({ name, id, icon: Icon }) => (
        <label key={id} className="flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-50 rounded-lg">
          <input
            type="checkbox"
            checked={pendingFilters.mainCategoryId === id}
            onChange={() => onCategoryChange(id)}
            className="rounded border-gray-300 text-blue-600"
          />
          <Icon className="w-4 h-4 text-gray-500" />
          <span className="text-sm">{name}</span>
        </label>
      ))}
    </div>
  </div>
);

// --- Subcategoría ---
export const SubcategorySection = ({ pendingFilters, onSubCategoryChange }) => (
  <div>
    <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
      <Filter className="w-4 h-4" />
      Subcategorías
    </h4>
    <div className="space-y-3">
      {chunkArray(subcategories, 4).map((row, idx) => (
        <div key={idx} className="grid grid-cols-4 gap-2">
          {row.map((sub) => (
            <button
              key={sub.id}
              onClick={() => onSubCategoryChange(sub.id)}
              className={`px-2 py-1 rounded-lg text-sm border transition ${
                pendingFilters.subCategoryId === sub.id
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {sub.name}
            </button>
          ))}
        </div>
      ))}
    </div>
  </div>
);

// --- Rango de Precio ---
export const PriceRangeSection = ({ pendingFilters, onPriceRangeChange }) => (
  <div>
    <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
      <DollarSign className="w-4 h-4" />
      Rango de Precio
    </h4>
    <div className="space-y-2">
      {priceRanges.map((range) => (
        <label key={range.value} className="flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-50 rounded-lg">
          <input
            type="radio"
            name="priceRange"
            value={range.value}
            checked={pendingFilters.priceRange === range.value}
            onChange={(e) => onPriceRangeChange(e.target.value)}
            className="border-gray-300 text-blue-600"
          />
          <span className="text-sm">{range.label}</span>
        </label>
      ))}
    </div>
  </div>
);