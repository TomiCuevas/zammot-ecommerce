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
    <div class="card m-3 shadow d-flex flex-column h-100 product-card" style="width: 18rem;">

        <!-- Imagen uniforme -->
        <img src="${product.img}" class="product-img" alt="${product.title}">

        <div class="card-body d-flex flex-column">

            <h5 class="card-title">${product.title}</h5>

            <!-- Descripción que se estira -->
            <p class="card-text flex-grow-1">${product.description}</p>

            <h6 class="fw-bold">$${product.price}</h6>

            <!-- Selector de cantidad con margen inferior -->
            <div class="d-flex align-items-center mt-3 qty-box">
                <button class="btn btn-secondary btn-sm" onclick="changeQty('${product.id}', -1)">-</button>
                <span id="qty-${product.id}" class="mx-2">1</span>
                <button class="btn btn-dark btn-sm" onclick="changeQty('${product.id}', 1)">+</button>
            </div>

            <!-- Botón SIEMPRE al fondo -->
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
