async function renderVentasHome() {

    const container =
        document.getElementById("ventas-container");

    if (!container) return;

    const loggedUser =
        JSON.parse(
            sessionStorage.getItem("loggedUser")
        ) || null;

    if (!loggedUser) {

        container.innerHTML = `
            <div class="col-12">
                <div class="card bg-dark border-secondary text-center shadow-sm">
                    <div class="card-body py-4">

                        <i class="bi bi-person-lock fs-1 mb-3 d-block"></i>

                        <h5 class="card-title">
                            Iniciá sesión para ver tus compras
                        </h5>

                        <p class="card-text text-secondary mb-0">
                            Aquí se mostrarán tus compras registradas.
                        </p>

                    </div>
                </div>
            </div>
        `;

        return;

    }

    try {

        if (PRODUCTS_CACHE.length === 0) {
            await loadProducts();
        }

        // ventas desde backend
        let ventas = [];

        try {

            ventas =
                await getSalesByUserApi(loggedUser.id);

        } catch (apiError) {

            console.error(
                "Error obteniendo ventas desde API:",
                apiError
            );

            // fallback localStorage
            const salesKey =
                `sales_${loggedUser.email}`;

            ventas =
                JSON.parse(
                    localStorage.getItem(salesKey)
                ) || [];

        }

        if (!ventas.length) {

            container.innerHTML = `
                <div class="col-12">
                    <div class="card bg-dark border-secondary text-center shadow-sm">

                        <div class="card-body py-4">

                            <i class="bi bi-bag-x fs-1 mb-3 d-block"></i>

                            <h5 class="card-title">
                                Todavía no tenés compras registradas
                            </h5>

                            <p class="card-text text-secondary mb-0">
                                Cuando realices una compra desde el carrito,
                                aparecerá acá.
                            </p>

                        </div>

                    </div>
                </div>
            `;

            return;

        }

        container.innerHTML = ventas.map(venta => {

            let productosConNombre = "";

            if (Array.isArray(venta.productos)) {

                const conteo = {};

                venta.productos.forEach(id => {

                    conteo[id] =
                        (conteo[id] || 0) + 1;

                });

                productosConNombre =
                    Object.entries(conteo)
                        .map(([id, cantidad]) => {

                            const prod =
                                PRODUCTS_CACHE.find(
                                    p => p.id === id
                                );

                            const nombre =
                                prod
                                    ? prod.title
                                    : id;

                            return cantidad > 1
                                ? `${nombre} x${cantidad}`
                                : nombre;

                        })
                        .join(", ");

            }

            const direccionFinal =
                venta.direccion ||
                loggedUser.direccion ||
                "Sin dirección registrada";

            return `
                <div class="col-md-6 col-lg-4">

                    <div class="card h-100 bg-dark border-secondary shadow-sm">

                        <div class="card-body">

                            <h5 class="card-title mb-2">
                                Compra realizada
                            </h5>

                            <p class="text-secondary small mb-3">
                                N° de operación: ${venta.id}
                            </p>

                            <p class="mb-2">
                                <strong>Fecha:</strong>
                                ${venta.fecha}
                            </p>

                            <p class="mb-2">
                                <strong>Total:</strong>
                                $${Number(venta.total)
                                    .toLocaleString("es-AR")}
                            </p>

                            <p class="mb-2">
                                <strong>Dirección:</strong>
                                ${direccionFinal}
                            </p>

                            <p class="mb-2">
                                <strong>Productos:</strong>
                                ${productosConNombre}
                            </p>

                            <p class="mb-0">

                                <strong>Estado:</strong>

                                <span class="badge ${
                                    venta.entregado
                                        ? "text-bg-success"
                                        : "text-bg-warning"
                                }">

                                    ${
                                        venta.entregado
                                            ? "Finalizada"
                                            : "Pendiente"
                                    }

                                </span>

                            </p>

                        </div>

                    </div>

                </div>
            `;

        }).join("");

    } catch (error) {

        console.error(
            "Error al cargar ventas:",
            error
        );

        container.innerHTML = `
            <div class="col-12">

                <div class="card bg-dark border-danger text-center shadow-sm">

                    <div class="card-body py-4">

                        <i class="bi bi-x-octagon fs-1 mb-3 d-block text-danger"></i>

                        <h5 class="card-title">
                            Error al cargar las compras
                        </h5>

                        <p class="card-text text-secondary mb-0">
                            Revisá la conexión con productos
                            o el historial de compras.
                        </p>

                    </div>

                </div>

            </div>
        `;

    }

}