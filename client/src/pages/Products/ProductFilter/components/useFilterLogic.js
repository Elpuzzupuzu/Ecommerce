import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilters,
  clearFilters,
} from "../../../../features/filters/filtersSlice";

export const useFilterLogic = (isOpen) => {
  const dispatch = useDispatch();

  // 🔥 FUENTE DE VERDAD
  const appliedFilters = useSelector((s) => s.filters.applied);

  // 🧠 Estado SOLO de UI
  const [pendingFilters, setPendingFilters] = useState(appliedFilters);
  const [isAnimating, setIsAnimating] = useState(false);

  // -------------------------------------------------
  // 🔄 Sync cuando se abre el sidebar
  // -------------------------------------------------
  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      setPendingFilters(appliedFilters);
    }
  }, [isOpen, appliedFilters]);

  // -------------------------------------------------
  // 🟧 CATEGORY
  // -------------------------------------------------
  const handleCategoryChange = useCallback((categoryId) => {
    setPendingFilters((prev) => ({
      ...prev,
      mainCategoryId: prev.mainCategoryId === categoryId ? null : categoryId,
      subCategoryId: null, // regla de negocio
    }));
  }, []);

  // -------------------------------------------------
  // 🟧 SUBCATEGORY
  // -------------------------------------------------
  const handleSubCategoryChange = useCallback((subId) => {
    setPendingFilters((prev) => ({
      ...prev,
      subCategoryId: prev.subCategoryId === subId ? null : subId,
    }));
  }, []);

  // -------------------------------------------------
  // 🟧 PRICE RANGE
  // -------------------------------------------------
  const handlePriceRangeChange = useCallback((range) => {
    setPendingFilters((prev) => ({
      ...prev,
      priceRange: prev.priceRange === range ? "" : range,
    }));
  }, []);

  // -------------------------------------------------
  // 🟩 APPLY FILTERS (🔥 único punto de verdad)
  // -------------------------------------------------
  const applyFilters = useCallback(() => {
    dispatch(setFilters(pendingFilters));
  }, [dispatch, pendingFilters]);

  // -------------------------------------------------
  // 🧹 CLEAR ALL
  // -------------------------------------------------
  const clearAll = useCallback(() => {
    dispatch(clearFilters());
  }, [dispatch]);

  // -------------------------------------------------
  // 🔢 CONTADOR (desde Redux)
  // -------------------------------------------------
  const getFilterCount = useCallback(
    () =>
      (appliedFilters.mainCategoryId ? 1 : 0) +
      (appliedFilters.subCategoryId ? 1 : 0) +
      (appliedFilters.priceRange ? 1 : 0),
    [appliedFilters]
  );

  return {
    pendingFilters,
    isAnimating,
    setIsAnimating,
    handleCategoryChange,
    handleSubCategoryChange,
    handlePriceRangeChange,
    applyFilters,
    clearAll,
    getFilterCount,
  };
};
