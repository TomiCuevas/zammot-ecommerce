//traer mail del logueado
function getCartKey() {
    const user = JSON.parse(sessionStorage.getItem("loggedUser"));
    if (!user) return null;
    //un carrito x usuario
    return "cart_" + user.email;
}

function loadCart() {
    const key = getCartKey();

    if (!key) return []; //carrito vacío para el intruso

    const stored = JSON.parse(localStorage.getItem(key)) || [];
 //Correción de profe de "NaN"
    return stored.map(item => {
        let qty = Math.floor(Number(item.qty));
        if (!Number.isFinite(qty) || qty < 1) qty = 1;

        return { id: item.id, qty };
    });
}

function saveCart(cart) {
    const key = getCartKey();
    if (!key) return;

    localStorage.setItem(key, JSON.stringify(cart));
}

function clearCart() {
    saveCart([]); 
    updateCartCount();
}

function addToCart(productId, qty = 1) {

    const user = JSON.parse(sessionStorage.getItem("loggedUser"));

    if (!user) {
        alert("Debes iniciar sesión para agregar productos.");
        window.location.href = "../index.html";
        return;
    }

    qty = Math.floor(Number(qty));
    if (!Number.isFinite(qty) || qty < 1) qty = 1;

    let cart = loadCart();

    const item = cart.find(p => p.id === productId);

    if (item) {
        let currentQty = Math.floor(Number(item.qty));
        if (!Number.isFinite(currentQty) || currentQty < 1) currentQty = 1;

        item.qty = currentQty + qty;
    } else {
        cart.push({ id: productId, qty });
    }

    saveCart(cart);
    updateCartCount();
}


function removeFromCart(productId) {
    let cart = loadCart();

    cart = cart.filter(item => item.id !== productId);

    saveCart(cart);
    updateCartCount();

    if (typeof renderCart === "function") renderCart();
}


function updateQty(productId, change) {

    let cart = loadCart();
    const item = cart.find(p => p.id === productId);

    if (!item) return;

    let qty = Math.floor(Number(item.qty)) + change;

    // No dejar bajar de 1
    if (qty < 1) qty = 1;

    item.qty = qty;

    saveCart(cart);
    updateCartCount();

    if (typeof renderCart === "function") renderCart();
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
    if (badge) badge.textContent = total;
}

window.updateCartCount = updateCartCount;
