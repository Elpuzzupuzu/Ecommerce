// features/filters/filtersSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  applied: {
    mainCategoryId: null,
    subCategoryId: null,
    priceRange: "",
    searchQuery: "",
  },
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    // ✅ Set completo (al aplicar filtros)
    setFilters(state, action) {
      state.applied = {
        ...state.applied,
        ...action.payload,
      };
    },

    // ✅ Reset total
    clearFilters(state) {
      state.applied = {
        mainCategoryId: null,
        subCategoryId: null,
        priceRange: "",
        searchQuery: state.applied.searchQuery, // conserva búsqueda si quieres
      };
    },

    // ✅ Helpers opcionales (por si los necesitas)
    setSearchQuery(state, action) {
      state.applied.searchQuery = action.payload;
    },

    setMainCategory(state, action) {
      state.applied.mainCategoryId = action.payload;
      state.applied.subCategoryId = null; // 🔥 regla de negocio clara
    },

    setSubCategory(state, action) {
      state.applied.subCategoryId = action.payload;
    },

    setPriceRange(state, action) {
      state.applied.priceRange = action.payload;
    },
  },
});

export const {
  setFilters,
  clearFilters,
  setSearchQuery,
  setMainCategory,
  setSubCategory,
  setPriceRange,
} = filtersSlice.actions;

export default filtersSlice.reducer;
