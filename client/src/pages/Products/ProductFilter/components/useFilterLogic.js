import { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../../../../features/products/productsSlice';

export const useFilterLogic = (filters, onFilterChange, isOpen) => {
  const dispatch = useDispatch();
  const [isAnimating, setIsAnimating] = useState(false);

  // 🔥 LOS PENDING INICIAN SIEMPRE DESDE FILTERS
  const [pendingFilters, setPendingFilters] = useState({
    mainCategoryId: filters.mainCategoryId,
    subCategoryId: filters.subCategoryId,
    priceRange: filters.priceRange,
  });

  // 🔥 FUENTE DE VERDAD DEL ESTADO
  const pendingRef = useRef(pendingFilters);

  // -------------------------------------------------
  // 🔄 SYNC REF CUANDO pendingFilters CAMBIA
  // -------------------------------------------------
  useEffect(() => {
    pendingRef.current = pendingFilters;
    console.log("[SYNC REF] pendingRef.current:", pendingRef.current);
  }, [pendingFilters]);

  // -------------------------------------------------
  // 🟦 LOG DE CAMBIO DE FILTERS (PROPS)
  // -------------------------------------------------
  useEffect(() => {
    console.log("[PROPS FILTERS] filters changed:", filters);
  }, [filters]);

  // -------------------------------------------------
  // 📌 SYNC COMPLETO AL ABRIR SIDEBAR
  // -------------------------------------------------
  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);

      const synced = {
        mainCategoryId: filters.mainCategoryId,
        subCategoryId: filters.subCategoryId,
        priceRange: filters.priceRange,
      };

      console.log("[SIDEBAR OPEN] synced pendingFilters:", synced);

      pendingRef.current = synced;
      setPendingFilters(synced);
    }
  }, [isOpen, filters]);

  // -------------------------------------------------
  // 🟧 HANDLER CATEGORY (SIN SETSTATE PREV)
  // -------------------------------------------------
  const handleCategoryChange = useCallback((categoryId) => {
    const prev = pendingRef.current;

    const updated = {
      ...prev,
      mainCategoryId: prev.mainCategoryId === categoryId ? null : categoryId,
      subCategoryId: null
    };

    console.log("[HANDLE CATEGORY] from", prev, "to", updated);

    pendingRef.current = updated;
    setPendingFilters(updated);
  }, []);

  // -------------------------------------------------
  // 🟧 HANDLER SUBCATEGORY
  // -------------------------------------------------
  const handleSubCategoryChange = useCallback((subId) => {
    const prev = pendingRef.current;

    const updated = {
      ...prev,
      subCategoryId: prev.subCategoryId === subId ? null : subId
    };

    console.log("[HANDLE SUBCATEGORY] from", prev, "to", updated);

    pendingRef.current = updated;
    setPendingFilters(updated);
  }, []);

  // -------------------------------------------------
  // 🟧 HANDLER PRICE RANGE
  // -------------------------------------------------
  const handlePriceRangeChange = useCallback((range) => {
    const prev = pendingRef.current;

    const updated = {
      ...prev,
      priceRange: prev.priceRange === range ? "" : range
    };

    console.log("[HANDLE PRICE RANGE] from", prev, "to", updated);

    pendingRef.current = updated;
    setPendingFilters(updated);
  }, []);

  // -------------------------------------------------
  // 🟩 APPLY FILTERS — SIEMPRE USA pendingRef.current
  // -------------------------------------------------
  const applyFilters = useCallback(() => {
    const pf = pendingRef.current;
    console.log("[APPLY FILTERS] pendingRef.current:", pf);

    onFilterChange({
      mainCategoryId: pf.mainCategoryId,
      subCategoryId: pf.subCategoryId,
      priceRange: pf.priceRange,
      searchQuery: filters.searchQuery || undefined,
    });

    const [minStr, maxStr] = (pf.priceRange || "").split("-");
    const minPrice = minStr ? parseFloat(minStr) : undefined;
    const maxPrice = maxStr && maxStr !== "+" ? parseFloat(maxStr) : undefined;

    console.log("[DISPATCH FETCH PRODUCTS]", {
      mainCategoryId: pf.mainCategoryId,
      subCategoryId: pf.subCategoryId,
      minPrice,
      maxPrice
    });

    dispatch(fetchProducts({
      page: 1,
      limit: 14,
      mainCategoryId: pf.mainCategoryId,
      subCategoryId: pf.subCategoryId,
      searchQuery: filters.searchQuery || undefined,
      minPrice,
      maxPrice
    }));
  }, [dispatch, filters.searchQuery, onFilterChange]);

  // -------------------------------------------------
  // 🧹 CLEAR ALL FILTERS
  // -------------------------------------------------
  const clearAllFilters = useCallback(() => {
    const cleared = {
      mainCategoryId: null,
      subCategoryId: null,
      priceRange: ""
    };

    console.log("[CLEAR ALL FILTERS] setting:", cleared);

    pendingRef.current = cleared;
    setPendingFilters(cleared);

    onFilterChange({
      ...cleared,
      searchQuery: filters.searchQuery
    });

    dispatch(fetchProducts({
      page: 1,
      limit: 14,
      searchQuery: filters.searchQuery || undefined
    }));
  }, [dispatch, filters.searchQuery, onFilterChange]);

  // -------------------------------------------------
  // 🔢 CONTADOR DE FILTROS ACTIVOS
  // -------------------------------------------------
  const getFilterCount = useCallback(() =>
    (filters.mainCategoryId ? 1 : 0) +
    (filters.subCategoryId ? 1 : 0) +
    (filters.priceRange ? 1 : 0)
  , [filters]);

  return {
    pendingFilters,
    isAnimating,
    setIsAnimating,
    handleCategoryChange,
    handleSubCategoryChange,
    handlePriceRangeChange,
    applyFilters,
    clearAllFilters,
    getFilterCount,
  };
};
