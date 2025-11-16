function renderProducts(category) {
    const container = document.getElementById("product-list");

    if (!container) {
        console.error("ERROR: No existe el contenedor #product-list");
        return;
    }

    const filtered = products.filter(product => product.category === category);

    if (!filtered.length) {
        container.innerHTML = `<p class="text-center">No hay productos en esta categoría.</p>`;
        return;
    }

    container.innerHTML = filtered
        .map(renderProductCard)
        .join("");
}


function renderProductCard(product) {
    return `
    <div class="card m-3 shadow" style="width: 18rem;">
        <img src="${product.img}" class="card-img-top" alt="${product.title}">
        
        <div class="card-body d-flex flex-column">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text">${product.description}</p>
            <h6 class="fw-bold">$${product.price}</h6>

            <!-- Selector de cantidad -->
            <div class="d-flex align-items-center mt-3">
                <button class="btn btn-secondary btn-sm" onclick="changeQty('${product.id}', -1)">-</button>
                <span id="qty-${product.id}" class="mx-2">1</span>
                <button class="btn btn-dark btn-sm" onclick="changeQty('${product.id}', 1)">+</button>
            </div>

            <!-- Botón agregar al carrito -->
            <button class="btn btn-primary w-100 mt-3 mt-auto"
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



// AGREGAR PRODUCTO CON CANTIDAD AL CARRITO
function addProductToCart(id) {
    const qtySpan = document.getElementById(`qty-${id}`);
    if (!qtySpan) return;

    const qty = parseInt(qtySpan.textContent) || 1;

    if (typeof window.addToCart === "function") {
        window.addToCart(id, qty); // viene de carrito.js
    } else {
        console.error("ERROR: No existe addToCart() desde carrito.js");
        alert("No se pudo agregar al carrito. Intenta recargar la página.");
        return;
    }

    alert("Producto agregado al carrito.");
}
