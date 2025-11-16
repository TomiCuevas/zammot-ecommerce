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


function addToCart(productId, qty = 1) {

    if (qty < 1) qty = 1;

    const item = cart.find(p => p.id === productId);

    if (item) {
        item.qty += qty;
    } else {
        cart.push({ id: productId, qty: qty });
    }

    saveCart();
    updateCartCount();
    return cart;
}



function removeFromCart(productId) {

    cart = cart.filter(item => item.id !== productId);

    saveCart();
    updateCartCount();

    if (typeof renderCart === "function") {
        renderCart();
    }
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
