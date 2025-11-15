// RENDERIZA PRODUCTOS x CATEGORÍA
function renderProducts(category) {
    const container = document.getElementById("product-list");

    if (!container) {
        console.error("ERROR: No existe el contenedor #product-list");
        return;
    }

    const filtered = products.filter(product => product.category === category);

    container.innerHTML = filtered
        .map(renderProductCard)
        .join("");
}


function renderProductCard(product) {
    return `
    <div class="card m-3 shadow" style="width: 18rem;">
        <img src="${product.img}" class="card-img-top" alt="${product.title}">
        
        <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text">${product.description}</p>
            <h6 class="fw-bold">$${product.price}</h6>

            <!-- Selector de cantidad -->
            <div class="d-flex align-items-center mt-3">
                <button class="btn btn-secondary btn-sm" onclick="changeQty('${product.id}', -1)">-</button>
                <span id="qty-${product.id}" class="mx-2">1</span>
                <button class="btn btn-dark btn-sm" onclick="changeQty('${product.id}', 1)">+</button>
            </div>

            <!-- BOTÓN AGREGAR AL CARRITO -->
            <button class="btn btn-primary w-100 mt-3"
                    onclick="addProductToCart('${product.id}')">
                <i class="bi bi-cart-plus"></i> Agregar al carrito
            </button>

        </div>
    </div>`;
}


function changeQty(id, amount) {
    let qtySpan = document.getElementById(`qty-${id}`);
    let qty = parseInt(qtySpan.textContent);

    qty += amount;
    if (qty < 1) qty = 1;

    qtySpan.textContent = qty;
}


function addProductToCart(id) {
    const qty = parseInt(document.getElementById(`qty-${id}`).textContent);

    if (typeof window.addToCart === "function") {
        window.addToCart(id, qty);
    } else {
        console.error("ERROR: No existe addToCart() desde carrito.js");
        return;
    }

    alert("Producto agregado al carrito.");
}
