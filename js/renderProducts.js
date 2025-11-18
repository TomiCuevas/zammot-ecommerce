let PRODUCTS_CACHE = []; // Se guardan los productos en memoria luego del fetch

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

    // Si los productos aún no están cargados, primero se hace fetch
    if (PRODUCTS_CACHE.length === 0) {
        loadProducts().then(() => renderProducts(category));
        return;
    }

    const filtered = PRODUCTS_CACHE.filter(p => p.category === category);

    if (!filtered.length) {
        container.innerHTML = `<p class="text-center">No hay productos en esta categoría.</p>`;
        return;
    }

    container.innerHTML = filtered.map(renderProductCard).join("");
}


function renderProductCard(product) {
    return `
    <div class="card m-3 shadow d-flex flex-column h-100 product-card" style="width: 18rem;">

        <img src="${product.img}" class="product-img" alt="${product.title}">

        <div class="card-body d-flex flex-column">

            <h5 class="card-title">${product.title}</h5>

            <p class="card-text flex-grow-1">${product.description}</p>

            <h6 class="fw-bold">$${product.price}</h6>

            <div class="d-flex align-items-center mt-3 qty-box">
                <button class="btn btn-secondary btn-sm" onclick="changeQty('${product.id}', -1)">-</button>
                <span id="qty-${product.id}" class="mx-2">1</span>
                <button class="btn btn-dark btn-sm" onclick="changeQty('${product.id}', 1)">+</button>
            </div>

            <button class="btn btn-primary w-100 mt-auto"
                onclick="addProductToCart('${product.id}')">
                <i class="bi bi-cart-plus"></i> Agregar al carrito
            </button>

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

    //Validar si NO está logueado
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (!isLoggedIn) {
        alert("Debes iniciar sesión para agregar productos.");
        window.location.href = "../index.html"; //redireccionar al login
        return;
    }

  //si no seguir compo siempre
    const qtySpan = document.getElementById(`qty-${id}`);
    if (!qtySpan) return;

    const qty = parseInt(qtySpan.textContent) || 1;

    if (typeof window.addToCart === "function") {
        window.addToCart(id, qty);
    } else {
        console.error("ERROR: No existe addToCart() desde carrito.js");
        alert("No se pudo agregar al carrito. Intenta recargar la página.");
        return;
    }

    alert("Producto agregado al carrito.");
}
