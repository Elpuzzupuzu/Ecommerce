import { ProductsService } from "../services/productsService.js";

export const ProductsController = {


// Buscar productos por nombre


async getAllProducts(req, res, next) {
    try {
        console.log("──────────────────────────────────────────");
        console.log("📥 GET /products → Parámetros recibidos (RAW):");
        console.log("query:", req.query);

        const { 
            page = 1, 
            limit = 10,
            mainCategoryId, 
            subCategoryId,
            searchQuery,
            minPrice,
            maxPrice
        } = req.query;

        console.log("📦 GET /products → Parámetros procesados:");
        console.log({
            page: Number(page),
            limit: Number(limit),
            mainCategoryId: mainCategoryId ?? null,
            subCategoryId: subCategoryId ?? null,
            searchQuery: searchQuery ?? "",
            minPrice: minPrice ?? null,
            maxPrice: maxPrice ?? null
        });

        console.log("🚀 Enviando a ProductsService.getAllProducts...");
        

        // Obtener productos desde el servicio
        const products = await ProductsService.getAllProducts(
            Number(page), 
            Number(limit), 
            mainCategoryId || null,
            subCategoryId || null,
            searchQuery || "",
            minPrice || null,
            maxPrice || null
        );

        console.log("📤 Respuesta de ProductsService:");
        console.log({
            count: products?.products?.length || 0,
            total: products?.total,
        });

        console.log("──────────────────────────────────────────");

        // Respuesta cuando no hay productos
        if (!products || products.products.length === 0) {
            return res.status(200).json({ 
                products: [], 
                total: 0, 
                page: Number(page), 
                limit: Number(limit) 
            });
        }

        // Respuesta normal
        res.status(200).json(products);

    } catch (error) {

        console.error("❌ Error detallado al obtener productos:");
        console.error(error);

        next({
            message: error.message || "Ocurrió un error al obtener productos",
            status: 500,
            stack: error.stack,
        });
    }
}
,


async searchProducts(req, res, next) {
  try {
    const { q } = req.query;
    if (!q || q.trim() === "") return res.status(400).json({ message: "Query vacío" });

    const results = await ProductsService.searchProducts(q.trim());
    res.json(results);
  } catch (error) {
    next(error);
  }
},



// search by filters


async filterProducts(req, res, next) {
  try {
    const filters = req.body; // { categories: [], priceRange: '0-100' }
    const results = await ProductsService.filterProducts(filters);

    if (!results || results.products.length === 0) {
      return res.status(404).json({ message: "No se encontraron productos con los filtros especificados" });
    }

    res.status(200).json(results);
  } catch (error) {
    next({
      message: error.message || "Error al filtrar productos",
      status: 500,
      stack: error.stack,
    });
  }
},


  // Obtener un producto por ID
  async getProductById(req, res, next) {
    try {
      const { id } = req.params;
      const product = await ProductsService.getProductById(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  },

  // Crear un nuevo producto
 async createProduct(req, res, next) {
  try {
    console.log("📥 controller Data recibida:", req.body);

    const newProduct = await ProductsService.createProduct(req.body);
    res.status(201).json(newProduct);

  } catch (error) {
    console.error("❌ Error en createProduct:", error);

    res.status(500).json({
      message: "Error creating product",
      receivedData: req.body,  // 👈 muestra qué llegó
      error: error.message
    });
  }
}
,

  // Actualizar un producto
  async updateProduct(req, res, next) {
    try {
      const { id } = req.params;
      const updatedProduct = await ProductsService.updateProduct(id, req.body);
      res.json(updatedProduct);
    } catch (error) {
      next(error);
    }
  },

  // Eliminar un producto
  async deleteProduct(req, res, next) {
    try {
      const { id } = req.params;
      const deletedProduct = await ProductsService.deleteProduct(id);
      res.json(deletedProduct);
    } catch (error) {
      next(error);
    }
  }
,

  

  /// Obtiene los productos más vendidos por ventas_anuales y paginados.
    async getTopSellingProductsController(req, res, next) {
        try {
            // Obtener parámetros de paginación desde la query
            const page = parseInt(req.query.page) || 1;
            const pageSize = parseInt(req.query.pageSize) || 50; // Por defecto 50, como solicitaste

            console.log("📄 Parámetros Top Ventas:", { page, pageSize });

            if (page < 1 || pageSize < 1) {
                return res.status(400).json({ 
                    message: "Los parámetros 'page' y 'pageSize' deben ser números positivos." 
                });
            }

            // Llamar al método del Servicio
            const { products, total } = await ProductsService.getTopSellingProducts(page, pageSize);

            if (!products || products.length === 0) {
                return res.status(404).json({ message: "No se encontraron productos en la lista de top ventas" });
            }

            // Calcular información de paginación
            const totalPages = Math.ceil(total / pageSize);

            // Devolver la respuesta en el formato consistente (productos y paginación)
            res.status(200).json({
                products: products,
                total: total,
                totalPages: totalPages,
                currentPage: page,
                pageSize: pageSize,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1,
            });

        } catch (error) {
            console.error("❌ Error detallado al obtener productos más vendidos:", error);

            // Manejo de errores consistente con el resto del controlador
            next({
                message: error.message || "Ocurrió un error al obtener la lista de top ventas",
                status: 500,
                stack: error.stack,
            });
        }
    },


    //// PRODUCTOS RELACIONADOS 
   async getProductosRelacionados(req, res) {
        try {
            const { id } = req.params;
            const { limit = 10, offset = 0, sort = null } = req.query;

            const productos = await ProductsService.getProductosRelacionados(
                id,
                parseInt(limit),
                parseInt(offset),
                sort
            );

            res.json({
                message: "Productos relacionados obtenidos",
                ...productos // incluye data, count y hasMore
            });

        } catch (error) {
            res.status(500).json({ 
                message: "Error obteniendo productos relacionados", 
                error: error.message 
            });
        }
    }

};
