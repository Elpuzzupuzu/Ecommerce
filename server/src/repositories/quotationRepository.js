//quotationRepository.js
import { supabase } from '../config/supabaseClient.js';

const TABLA_COTIZACIONES = 'cotizaciones';
const TABLA_COTIZACION_ITEMS = 'cotizaciones_items';
const ESTADOS_VALIDOS = ['GENERADA', 'ACEPTADA', 'RECHAZADA', 'COMPLETADA', 'CANCELADA'];
const TABLA_PRODUCTOS = 'productos';
const TABLA_USUARIOS = 'usuarios'
const TABLA_COTIZACIONES_DIRECTAS = 'cotizaciones_directas'
const USUARIO_PIVOTE_ID = 'f1931a2a-c6f8-4378-95d6-260ebe83f11a'; 
//TEST////


/**
 * Crea una cotización para un cliente anónimo (venta directa).
 * Utiliza los IDs pivote y registra los datos del cliente en una tabla separada.
 * * @param {number} totalCotizado - El monto total de la cotización.
 * @param {object} datosClienteDirecto - Objeto con {nombre, apellido, email, telefono, ...}
 * @returns {object} El objeto con el ID de la cotización creada.
 */
async function createDirectQuotation(usuarioId, totalCotizado, carritoIdOrigen, datosClienteDirecto) {
    
    // --- 1. Inserción de la Cabecera (Reutilizando el método existente) ---
    // AHORA USA los parámetros recibidos: usuarioId y carritoIdOrigen
    const cotizacionData = await createQuotation(
        usuarioId,      // <--- Usa el parámetro
        totalCotizado,
        carritoIdOrigen // <--- Usa el parámetro
    );
    
    const cotizacionId = cotizacionData.id;

    // --- 2. Inserción en 'cotizaciones_directas' ---
    if (!datosClienteDirecto || !datosClienteDirecto.nombre) {
        throw new Error("Se requieren datos del cliente (nombre) para la cotización directa.");
    }

    const datosDirectos = {
        cotizacion_id: cotizacionId,
        nombre: datosClienteDirecto.nombre,
        apellido: datosClienteDirecto.apellido,
        email: datosClienteDirecto.email,
        telefono: datosClienteDirecto.telefono,
        // Incluir cualquier otro campo de la tabla cotizaciones_directas
    };

    const { error: directasError } = await supabase
        .from(TABLA_COTIZACIONES_DIRECTAS)
        .insert(datosDirectos);

    if (directasError) {
        console.error('Error en createDirectQuotation (datos directos):', directasError);
        
        // RECOMENDACIÓN CLAVE: Lógica de Compensación (Rollback manual)
        // Ya que la primera inserción (createQuotation) fue exitosa, si la segunda falla,
        // necesitamos limpiar la cabecera para evitar datos huérfanos.
        
        // IMPORTANTE: Asegúrese de que esta lógica de borrado esté disponible en su repositorio.
        // await supabase.from(TABLA_COTIZACIONES).delete().eq('id', cotizacionId);
        
        throw new Error(`Error al insertar datos de cliente anónimo: ${directasError.message}`);
    }

    return cotizacionData;
}

////////
/**
 * Crea la cabecera de la cotización.
 */
async function createQuotation(usuarioId, totalCotizado, carritoIdOrigen) {
    const { data, error } = await supabase
        .from(TABLA_COTIZACIONES)
        .insert({
            usuario_id: usuarioId,
            total_cotizado: totalCotizado,
            carrito_id_origen: carritoIdOrigen
        })
        .select('id') 
        .single(); 

    if (error) {
        console.error('Error en createQuotation:', error);
        throw new Error(`Error al crear la cabecera de la cotización: ${error.message}`);
    }
    return data;
}

/**
 * Agrega los items congelados a la cotización.
 */
async function addQuotationItems(items) {
    const { error } = await supabase
        .from(TABLA_COTIZACION_ITEMS)
        .insert(items);

    if (error) {
        console.error('Error en addQuotationItems:', error);
        throw new Error(`Error al agregar los ítems de la cotización: ${error.message}`);
    }
}


// Constantes necesarias (Definir o Importar)
async function getQuotationById(id) {
    // 1. OBTENER LA COTIZACIÓN Y LOS ÍTEMS
    // ... (El código de la Sección 1 permanece igual) ...
    const { data: quotation, error: quotationError } = await supabase
        .from(TABLA_COTIZACIONES)
        .select(`
            *,
            ${TABLA_COTIZACION_ITEMS} (*)
        `)
        .eq('id', id)
        .single();

    if (quotationError && quotationError.code !== 'PGRST116') {
        console.error('Error al leer la cotización:', quotationError);
        throw new Error(`Error al leer la cotización: ${quotationError.message}`);
    }
    
    if (!quotation) {
        return null; // Cotización no encontrada
    }

    // 2. EXTRAER ID DEL USUARIO Y OBTENER SUS DATOS (NOMBRE Y CORREO)
    const userId = quotation.usuario_id;
    const isAnonymous = userId === USUARIO_PIVOTE_ID;
    
    // LOG 1: Verificar el tipo de cotización y los IDs
    console.log(`[LOG] Procesando cotización ID: ${quotation.id}`);
    console.log(`[LOG] Usuario ID: ${userId}, Es Anónimo: ${isAnonymous}`);

    let userData = null;
    let userError = null;

    if (userId) {
        if (isAnonymous) {
            // 2A. CASO ANÓNIMO: Buscar en la tabla de datos directos
            console.log(`[LOG] Buscando datos en ${TABLA_COTIZACIONES_DIRECTAS} para cotizacion_id: ${quotation.id}`);
            
            ({ data: userData, error: userError } = await supabase
                .from(TABLA_COTIZACIONES_DIRECTAS)
                .select('nombre, apellido, email')
                .eq('cotizacion_id', quotation.id) 
                .single());
            
            // LOG 2: Resultado de la consulta directa
            console.log(`[LOG] Resultado de cotizaciones_directas -> userData:`, userData);
            console.log(`[LOG] Resultado de cotizaciones_directas -> userError:`, userError);

            // Si hay datos, los renombramos para ajustarnos al formato 'usuario'
            if (userData) {
                userData.nombre = `${userData.nombre} ${userData.apellido || ''}`;
                userData.correo = userData.email;
            }

        } else {
            // 2B. CASO REGISTRADO: Buscar en la tabla de usuarios
            // ... (Este bloque permanece igual)
            ({ data: userData, error: userError } = await supabase
                .from(TABLA_USUARIOS)
                .select('nombre, correo')
                .eq('id', userId)
                .single());
        }

        if (userError) {
            console.error('Error al leer datos del cliente/usuario:', userError);
            // El flujo continúa con userData=null si hay un error
        }
        
        // FUSIONAR DATOS DEL USUARIO/CLIENTE
        // LOG 3: Verificación antes de la fusión
        console.log(`[LOG] userData antes de fusión final (debe tener nombre/correo):`, userData);
        
        if (userData) {
            // Se anida la información en la clave 'usuario'
            quotation.usuario = {
                id: isAnonymous ? null : userId, // Solo el usuario registrado tiene ID
                nombre: userData.nombre || 'N/A',
                correo: userData.correo || 'N/A',
            };
        } else {
            // Si no se encuentra (ni usuario registrado, ni datos directos)
            // Esta rama se ejecuta si userData es null
            quotation.usuario = { nombre: isAnonymous ? 'Cliente Anónimo' : 'Desconocido', correo: 'N/A' };
        }
    } else {
        // Caso en que ni siquiera hay un usuario_id 
        quotation.usuario = { nombre: 'N/A', correo: 'N/A' };
    }
    
    // ... (El resto de la función - Pasos 3, 4, 5 - permanece igual) ...
    
    return quotation;
}
///// METODO PARA RETORNAR SOLO LAS DEL USAURIO 

async function getQuotationsByUserId(usuarioId, params) {
    const { page, pageSize, searchTerm, status } = params;
    
    // 1. Calcular OFFSET
    const offset = (page - 1) * pageSize; 
    
    // 2. Definir la consulta base
    let query = supabase
        .from(TABLA_COTIZACIONES)
        .select(`
            *,
            ${TABLA_COTIZACION_ITEMS} (*)
        `, { count: 'exact' }) 
        .eq('usuario_id', usuarioId);

    // 3. Aplicar Filtro de Estado (Filtro exacto por dropdown)
    if (status && status !== 'ALL' && ESTADOS_VALIDOS.includes(status)) {
        query = query.eq('estado_cotizacion', status);
    }
    
    // 4. Aplicar Filtro de Búsqueda (Búsqueda general por texto/número)
    if (searchTerm && searchTerm.trim() !== '') {
        const isNumber = !isNaN(searchTerm);
        const searchTerms = searchTerm.toUpperCase();

        if (isNumber) {
            const numericValue = parseFloat(searchTerm);
            
            //  CAMBIO CLAVE: Usar GTE (mayor o igual) para el intervalo numérico.
            // Si el usuario busca "100", verá todas las >= 100.
            query = query.or(
                `total_cotizado.gte.${numericValue}, estado_cotizacion.ilike.%${searchTerms}%`
            );
            
            
        } else {
            // Si es texto, busca por 'estado_cotizacion' (búsqueda parcial)
            query = query.or(`estado_cotizacion.ilike.%${searchTerms}%`);
        }
    }
    
    // 5. Aplicar Orden, Paginación (RANGE) y Ejecutar
    const { data, error, count } = await query
        .order('fecha_creacion', { ascending: false })
        .range(offset, offset + pageSize - 1);

    if (error) {
        console.error('Error en getQuotationsByUserId:', error);
        throw new Error(`Error al listar cotizaciones: ${error.message}`);
    }
    
    return { data: data || [], count }; 
}

/// METODO PARA OBTENER TODAS LAS COTIZACIONES (ADMIN)
async function getAllQuotations(params) {
    const { page, pageSize, searchTerm, status } = params;
    const offset = (page - 1) * pageSize;

    let query = supabase
        .from(TABLA_COTIZACIONES)
        .select(`
            *,
            ${TABLA_COTIZACION_ITEMS} (*),
            usuario_id (nombre, apellido, correo)
        `, { count: 'exact' });

    // 1. Filtro por Estado
    if (status && status !== 'ALL') {
        query = query.eq('estado_cotizacion', status);
    }

    // 2. Filtro de Búsqueda
    if (searchTerm && searchTerm.trim() !== '') {
        const searchTerms = searchTerm.toLowerCase();

        query = query.or(`estado_cotizacion.ilike.%${searchTerms}%`);

        const userFilter = `nombre.ilike.%${searchTerms}%,apellido.ilike.%${searchTerms}%`;
        query = query.or(userFilter, { foreignTable: 'usuario_id' });
    }

    // 3. Ejecutar consulta con orden y paginación
    const { data, error, count } = await query
        .order('fecha_creacion', { ascending: false })
        .range(offset, offset + pageSize - 1);

    if (error) {
        console.error('Error en getAllQuotations:', error);
        throw new Error(`Error al listar cotizaciones: ${error.message}`);
    }

    const quotations = data || [];

    // =============================
    // 🔥 4. EXTRAER TODOS LOS PRODUCT IDs
    // =============================
    const allItems = quotations.flatMap(q => q[TABLA_COTIZACION_ITEMS] || []);
    const productIds = [...new Set(allItems.map(item => item.producto_id))];

    if (productIds.length === 0) {
        return { data: quotations, count };
    }

    // =============================
    // 🔥 5. OBTENER TODAS LAS IMÁGENES
    // =============================
    const { data: products, error: prodError } = await supabase
        .from(TABLA_PRODUCTOS)
        .select('id, imagen')
        .in('id', productIds);

    if (prodError) {
        console.error('Error al leer productos:', prodError);
    }

    // Diccionario: { product_id: imagen }
    const productMap = (products || []).reduce((acc, p) => {
        acc[p.id] = p.imagen;
        return acc;
    }, {});

    // =============================
    // 🔥 6. FUSIONAR: añadir imagen a cada ítem
    // =============================
    const mergedQuotations = quotations.map(q => ({
        ...q,
        [TABLA_COTIZACION_ITEMS]: q[TABLA_COTIZACION_ITEMS].map(item => ({
            ...item,
            imagen_producto: productMap[item.producto_id] || null
        }))
    }));

    return { data: mergedQuotations, count };
}






/**
 * Actualiza el estado de una cotización.
 */
async function updateQuotationStatus(id, nuevoEstado) {
    const { data, error } = await supabase
        .from(TABLA_COTIZACIONES)
        .update({ estado_cotizacion: nuevoEstado, fecha_actualizacion: new Date() })
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error en updateQuotationStatus:', error);
        throw new Error(`Error al actualizar el estado de la cotización: ${error.message}`);
    }
    return data;
}

/**
 * Elimina una cotización. (Usado principalmente por el admin)
 */
async function deleteQuotation(id) {
    const { error } = await supabase
        .from(TABLA_COTIZACIONES)
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error en deleteQuotation:', error);
        throw new Error(`Error al eliminar la cotización: ${error.message}`);
    }
    return true;
}
///// TESTING


/**
 * Obtener todos los ítems de una cotización por ID.
 */
async function getItemsByQuotationId(cotizacionId) {
    const { data, error } = await supabase
        .from(TABLA_COTIZACION_ITEMS)
        .select('*')
        .eq('cotizacion_id', cotizacionId);

    if (error) {
        console.error('Error en getItemsByQuotationId:', error);
        throw new Error(`Error al obtener ítems de la cotización: ${error.message}`);
    }

    return data || [];
}

/**
 * Actualizar un ítem existente (por cotizacion_id + producto_id).
 */
async function updateQuotationItem(cotizacionId, productoId, patch) {
    if (!cotizacionId || !productoId) {
        throw new Error("cotizacionId y productoId son obligatorios.");
    }

    if (!patch || typeof patch !== "object") {
        throw new Error("patch debe ser un objeto con los campos a actualizar.");
    }

    const { data, error } = await supabase
        .from(TABLA_COTIZACION_ITEMS)
        .update(patch)
        .match({
            cotizacion_id: cotizacionId,
            producto_id: productoId
        })
        .select();

    if (error) {
        console.error("Error en updateQuotationItem:", error);
        throw new Error(`Error al actualizar ítem: ${error.message}`);
    }

    // data será un array; si no existe el ítem devolvemos null
    return data?.[0] ?? null;
}


/**
 * Insertar múltiples ítems nuevos.
 */
async function insertQuotationItems(itemsArray) {
    const { data, error } = await supabase
        .from(TABLA_COTIZACION_ITEMS)
        .insert(itemsArray)
        .select();

    if (error) {
        console.error('Error en insertQuotationItems:', error);
        throw new Error(`Error al insertar ítems: ${error.message}`);
    }

    return data || [];
}

/**
 * Eliminar ítems que no estén en la lista nueva de productos.
 */
async function deleteItemsNotInList(cotizacionId, productIdsToKeep = []) {
    if (!productIdsToKeep.length) {
        const { error } = await supabase
            .from(TABLA_COTIZACION_ITEMS)
            .delete()
            .eq('cotizacion_id', cotizacionId);

        if (error) {
            console.error('Error en deleteItemsNotInList (delete all):', error);
            throw new Error(`Error al eliminar ítems: ${error.message}`);
        }

        return true;
    }

    const idsString = `(${productIdsToKeep.join(',')})`;

    const { error } = await supabase
        .from(TABLA_COTIZACION_ITEMS)
        .delete()
        .eq('cotizacion_id', cotizacionId)
        .filter('producto_id', 'not.in', idsString);   // ← ✔️ Corregido

    if (error) {
        console.error('Error en deleteItemsNotInList:', error);
        throw new Error(`Error al eliminar ítems no incluidos: ${error.message}`);
    }

    return true;
}



/**
 * Obtener datos mínimos del producto (para nombre, precio base, etc.).
 */
async function getProductById(productId) {
    const { data, error } = await supabase
        .from(TABLA_PRODUCTOS)
        .select('id, nombre, precio, imagen')
        .eq('id', productId)
        .single();

    if (error) {
        console.error('Error en getProductById:', error);
        throw new Error(`Error al obtener producto: ${error.message}`);
    }

    return data;
}

/**
 * Recalcular total cotizado y actualizar cabecera.
 */
async function recalculateQuotationTotal(cotizacionId) {
    const items = await getItemsByQuotationId(cotizacionId);

    const total = items.reduce((sum, item) => {
        const qty = Number(item.cantidad || 0);
        const price = Number(item.precio_unitario_aplicado || 0);
        return sum + qty * price;
    }, 0);

    const { data, error } = await supabase
        .from(TABLA_COTIZACIONES)
        .update({
            total_cotizado: total,
            fecha_actualizacion: new Date().toISOString()
        })
        .eq('id', cotizacionId)
        .select()
        .single();

    if (error) {
        console.error('Error en recalculateQuotationTotal:', error);
        throw new Error(`Error al actualizar total: ${error.message}`);
    }

    return data;
}

export {
    createQuotation,
    createDirectQuotation,
    addQuotationItems,
    getQuotationById,
    getQuotationsByUserId,
    getAllQuotations,
    updateQuotationStatus,
    deleteQuotation,
    // NUEVOS
    getItemsByQuotationId,
    updateQuotationItem,
    insertQuotationItems,
    deleteItemsNotInList,
    getProductById,
    recalculateQuotationTotal
};