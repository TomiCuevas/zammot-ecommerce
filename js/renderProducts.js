let PRODUCTS_CACHE = [];

function loadProducts() {
    return fetch("../data/products.json")
        .then(res => {
            if (!res.ok) throw new Error("Error cargando JSON de productos");
            return res.json();
        })
        .then(data => {
            PRODUCTS_CACHE = data;
            return data;
        })
        .catch(err => {
            console.error("ERROR al cargar products.json:", err);
        });
}

function renderProducts(category) {
    const container = document.getElementById("product-list");

    if (!container) {
        console.error("ERROR: No existe el contenedor #product-list");
        return;
    }

    // si no cargó el JSON todavía, cargar y reintentar
    if (PRODUCTS_CACHE.length === 0) {
        loadProducts().then(() => renderProducts(category));
        return;
    }

    // mostrar todos los productos de la categoría,
    // incluso los que no tienen stock
    const filtered = PRODUCTS_CACHE.filter(p => p.category === category);

    if (!filtered.length) {
        container.innerHTML = `<p class="text-center">No hay productos en esta categoría.</p>`;
        return;
    }

    container.innerHTML = filtered.map(renderProductCard).join("");

    // actualizar íconos de favoritos
    filtered.forEach(p => {
        if (typeof updateWishlistIcon === "function") {
            updateWishlistIcon(p.id);
        }
    });
}

function renderProductCard(product) {
    return `
    <div class="card m-3 shadow d-flex flex-column h-100 product-card" style="width: 18rem;">

        <img src="${product.img}" class="product-img" alt="${product.title}">

        <div class="card-body d-flex flex-column">

            <h5 class="card-title d-flex justify-content-between align-items-center">
                ${product.title}

                <!-- FAVORITOS -->
                <button 
                    class="btn btn-light btn-sm" 
                    id="fav-${product.id}"
                    onclick="toggleFavorite('${product.id}')">
                    <i class="bi bi-heart"></i>
                </button>
            </h5>

            ${product.disponible === false ? `
                <span class="badge bg-danger mb-2">Sin stock</span>
            ` : ``}

            <p class="card-text flex-grow-1">${product.description}</p>

            <h6 class="fw-bold">$${product.price}</h6>

            <!-- CONTADOR -->
            <style>
                .qty-btn {
                    background-color: #6c757d !important;
                    color: white !important;
                    border: none !important;
                    width: 32px;
                    height: 32px;
                    border-radius: 6px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: 0.2s ease-in-out;
                }
                .qty-btn:hover {
                    background-color: #5a6268 !important;
                    transform: scale(1.05);
                }
            </style>

            <div class="d-flex align-items-center mt-3 qty-box">
                <button class="qty-btn" onclick="changeQty('${product.id}', -1)">-</button>
                <span id="qty-${product.id}" class="mx-2">1</span>
                <button class="qty-btn" onclick="changeQty('${product.id}', 1)">+</button>
            </div>

            <!-- BOTÓN AGREGAR -->
            ${product.disponible !== false ? `
                <button class="btn btn-primary w-100 mt-auto"
                    onclick="addProductToCart('${product.id}')">
                    <i class="bi bi-cart-plus"></i> Agregar al carrito
                </button>
            ` : `
                <button class="btn btn-secondary w-100 mt-auto" disabled>
                    Sin stock
                </button>
            `}
        </div>
    </div>`;
}

function changeQty(id, amount) {
    const qtySpan = document.getElementById(`qty-${id}`);
    if (!qtySpan) return;

    let qty = parseInt(qtySpan.textContent) || 1;
    qty += amount;
    if (qty < 1) qty = 1;

    qtySpan.textContent = qty;
}

function addProductToCart(id) {
    const product = PRODUCTS_CACHE.find(p => p.id === id);

    if (!product) {
        console.error("ERROR: Producto no encontrado");
        return;
    }

    if (product.disponible === false) {
        console.error("ERROR: Producto sin stock");
        return;
    }

    const qtySpan = document.getElementById(`qty-${id}`);
    const qty = qtySpan ? parseInt(qtySpan.textContent) || 1 : 1;

    // El login y el agregado se manejan desde carrito.js
    if (typeof window.addToCart === "function") {
        window.addToCart(id, qty);
    } else {
        console.error("ERROR: No existe addToCart() desde carrito.js");
        return;
    }

    if (typeof window.showAddedToast === "function") {
        window.showAddedToast();
    }
}