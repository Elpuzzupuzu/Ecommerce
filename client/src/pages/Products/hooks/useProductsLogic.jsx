// hooks/useProductsLogic.js
import { useState, useMemo, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../features/products/productsSlice";

export const useProductsLogic = () => {
    const dispatch = useDispatch();

    // Redux store
    const { items: products, total, loading, error } = useSelector((s) => s.products);

    // Estados locales
    const [currentPage, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPageState] = useState(14);
    const [viewMode, setViewMode] = useState("grid");
    const [searchTerm, setSearchTermState] = useState("");
    const [sortBy, setSortBy] = useState("name");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Filtros
    const [filters, setFiltersState] = useState({
        mainCategoryId: null,
        priceRange: "",
    });

    // =====================================================================
    // LOAD PRODUCTS — Paso 1: enviar timestamp al backend
    // =====================================================================

    const loadProducts = useCallback((page, filters, search, limit) => {

        // Timestamp para evitar respuestas cacheadas
        const timestamp = Date.now();

        // Parseo de priceRange
        const [minStr, maxStr] = (filters.priceRange || "").split("-");
        const minPrice = minStr ? parseFloat(minStr) : undefined;
        const maxPrice = maxStr && maxStr !== "+" ? parseFloat(maxStr) : undefined;

        dispatch(
            fetchProducts({
                page,
                limit,
                mainCategoryId: filters.mainCategoryId,
                searchQuery: search,
                minPrice,
                maxPrice,
                timestamp, // ← AQUÍ LO ENVIAMOS
            })
        );
    }, [dispatch]);

    // =====================================================================
    // HANDLERS — Actualizan estado del FE
    // =====================================================================

    const handleSetCurrentPage = (page) => {
        setPage(page);
    };

    const handleSetSearchTerm = (term) => {
        setPage(1);
        setSearchTermState(term);
    };

    const handleSetFilters = (newFilters) => {
        setPage(1);
        setFiltersState(newFilters);
    };

    const handleSetItemsPerPage = (limit) => {
        setPage(1);
        setItemsPerPageState(limit);
    };

    // =====================================================================
    // EFECTO CENTRAL — Se ejecuta cuando cambia page, filtros, search o limit
    // =====================================================================

    useEffect(() => {
        loadProducts(currentPage, filters, searchTerm, itemsPerPage);
    }, [currentPage, filters, searchTerm, itemsPerPage, loadProducts]);

    // =====================================================================
    // ORDENAMIENTO FE
    // =====================================================================

    const sortedProducts = useMemo(() => {
        return [...products].sort((a, b) =>
            sortBy === "price"
                ? (a.precio || 0) - (b.precio || 0)
                : a.nombre.localeCompare(b.nombre)
        );
    }, [products, sortBy]);

    const totalPages = Math.ceil(total / itemsPerPage);

    return {
        products,
        loading,
        error,
        currentProducts: sortedProducts,
        totalPages,
        currentPage,
        setCurrentPage: handleSetCurrentPage,
        viewMode,
        setViewMode,
        searchTerm,
        setSearchTerm: handleSetSearchTerm,
        sortBy,
        setSortBy,
        itemsPerPage,
        setItemsPerPage: handleSetItemsPerPage,
        sidebarOpen,
        setSidebarOpen,
        filters,
        setFilters: handleSetFilters,
        sortedProducts,
        getFilterCount: () =>
            (filters.mainCategoryId ? 1 : 0) +
            (filters.priceRange ? 1 : 0),
    };
};
