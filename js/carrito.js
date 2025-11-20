let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function loadCart() {
    const stored = JSON.parse(localStorage.getItem("cart")) || [];
    //Sanea el qty para que siempre a número válido, redondeando, y reemplazando por 1 si es inválido
    return stored.map(item => {
        let qty = Math.floor(Number(item.qty));

        if (!Number.isFinite(qty) || qty < 1) {
            qty = 1;
        }

        return {
            id: item.id,
            qty: qty
        };
    });
}


function clearCart() {
    cart = [];
    saveCart();
    updateCartCount();
}


function addToCart(productId, qty = 1) {

    //Convierte el qty para que siempre a número válido, redondeando, y reemplazando por 1 si es inválido
    qty = Math.floor(Number(qty));
    if (!Number.isFinite(qty) || qty < 1) qty = 1;

    const item = cart.find(p => p.id === productId);

    if (item) {
        let currentQty = Math.floor(Number(item.qty));

        if (!Number.isFinite(currentQty) || currentQty < 1) {
            currentQty = 1;
        }

        item.qty = currentQty + qty;
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

    cart.forEach(item => {
        let qty = Math.floor(Number(item.qty));
        if (!Number.isFinite(qty) || qty < 1) qty = 1;
        total += qty;
    });

    const badge = document.getElementById("cart-count");
    if (badge) {
        badge.textContent = total;
    }
}


if (typeof window.updateCartCount === "undefined") {
    window.updateCartCount = updateCartCount;
}
