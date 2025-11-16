// Leer carrito desde localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function loadCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}
function clearCart() {
    cart = [];
    saveCart();
}

// AGREGAR PRODUCTO AL CARRITO
function addToCart(productId, qty = 1) {

    if (qty < 1) qty = 1;

    const item = cart.find(p => p.id === productId);

    if (item) {
        item.qty += qty;
    } else {
        cart.push({ id: productId, qty: qty });
    }

    saveCart();

    if (typeof updateCartCount === "function") {
        updateCartCount();
    }

    return cart;
}
function updateCartCount() {
    const cart = loadCart();

    let total = 0;
    cart.forEach(item => total += item.qty);

    const badge = document.getElementById("cart-count");
    if (badge) {
        badge.textContent = total;
    }
}


if (typeof window.updateCartCount === "undefined") {
    window.updateCartCount = updateCartCount;
}
