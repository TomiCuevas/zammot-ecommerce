// RENDERIZA CARD
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
                    onclick="addToCart('${product.id}')">
                <i class="bi bi-cart-plus"></i> Agregar al carrito
            </button>

        </div>
    </div>`;
}


// PARA CAMBIAR CANTIDAD
function changeQty(id, amount) {
    let qtySpan = document.getElementById(`qty-${id}`);
    let qty = parseInt(qtySpan.textContent);

    qty += amount;
    if (qty < 1) qty = 1;

    qtySpan.textContent = qty;
}



function addToCart(id) {
     const qty = parseInt(document.getElementById(`qty-${id}`).textContent);

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existing = cart.find(item => item.id === id);

    if (existing) {
        existing.qty += qty;
    } else {
        cart.push({ id: id, qty: qty });
    }

    // Guardar
    localStorage.setItem("cart", JSON.stringify(cart));

    // Actualiza contador
    if (typeof updateCartCount === "function") {
        updateCartCount();
    }

    alert("Producto agregado al carrito");
}




// Asegurar carga de navbar
if (typeof updateCartCount !== "function") {
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        let total = 0;
        cart.forEach(item => total += item.qty);

        const badge = document.getElementById("cart-count");
        if (badge) {
            badge.textContent = total;
        }
    }
}
