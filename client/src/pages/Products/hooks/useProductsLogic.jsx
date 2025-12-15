import { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../features/products/productsSlice";
import {
  setPage,
  setLimit,
} from "../../../features/pagination/productsUI/paginationSlice";

export const useProductsLogic = () => {
  const dispatch = useDispatch();

  // -------------------------------------------------
  // REDUX
  // -------------------------------------------------
  const { items: products, total, loading, error } = useSelector(
    (s) => s.products
  );

  const appliedFilters = useSelector((s) => s.filters.applied);
  const searchQuery = useSelector((s) => s.filters.searchQuery);
  const { page, limit } = useSelector((s) => s.pagination);

  // -------------------------------------------------
  // UI LOCAL STATE (correcto que sea local)
  // -------------------------------------------------
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("name");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // -------------------------------------------------
  // FETCH CENTRAL — ÚNICO LUGAR
  // -------------------------------------------------
  useEffect(() => {
    const timestamp = Date.now();

    const [minStr, maxStr] = (appliedFilters.priceRange || "").split("-");
    const minPrice = minStr ? parseFloat(minStr) : undefined;
    const maxPrice =
      maxStr && maxStr !== "+" ? parseFloat(maxStr) : undefined;

    dispatch(
      fetchProducts({
        page,
        limit,
        mainCategoryId: appliedFilters.mainCategoryId,
        subCategoryId: appliedFilters.subCategoryId,
        searchQuery: searchQuery || undefined,
        minPrice,
        maxPrice,
        timestamp,
      })
    );
  }, [dispatch, page, limit, appliedFilters, searchQuery]);

  // -------------------------------------------------
  // ORDENAMIENTO FE
  // -------------------------------------------------
  const sortedProducts = useMemo(() => {
    if (!Array.isArray(products)) return [];

    return [...products].sort((a, b) =>
      sortBy === "price"
        ? (a.precio || 0) - (b.precio || 0)
        : a.nombre.localeCompare(b.nombre)
    );
  }, [products, sortBy]);

  const totalPages = Math.ceil(total / limit);

  // -------------------------------------------------
  // API DEL HOOK
  // -------------------------------------------------
  return {
    loading,
    error,
    currentProducts: sortedProducts,
    totalPages,
    currentPage: page,
    setCurrentPage: (p) => dispatch(setPage(p)),
    itemsPerPage: limit,
    setItemsPerPage: (l) => dispatch(setLimit(l)),
    viewMode,
    setViewMode,
    sortBy,
    setSortBy,
    sidebarOpen,
    setSidebarOpen,
    getFilterCount: () =>
      (appliedFilters.mainCategoryId ? 1 : 0) +
      (appliedFilters.subCategoryId ? 1 : 0) +
      (appliedFilters.priceRange ? 1 : 0),
  };
};
