
// Devuelve el email del usuario logueado
function getUserEmail() {
    const user = sessionStorage.getItem("loggedUser");
    if (!user) return null;
    return JSON.parse(user).email;
}

// Devuelve la clave única para este usuario
function getWishlistKey() {
    const email = getUserEmail();
    if (!email) return null;
    return `zammot_wishlist_${email}`;
}

// Cargar favoritos
function loadWishlist() {
    const KEY = getWishlistKey();
    if (!KEY) return [];
    return JSON.parse(localStorage.getItem(KEY)) || [];
}

// Guardar favoritos
function saveWishlist(list) {
    const KEY = getWishlistKey();
    if (!KEY) return;
    localStorage.setItem(KEY, JSON.stringify(list));
}

// agregar o sacar fav
function toggleFavorite(productId) {
    let list = loadWishlist();

    if (list.includes(productId)) {
        list = list.filter(id => id !== productId);
        saveWishlist(list);

        // Eliminar visualmente SI estamos en favoritos.html
        removeFavoriteCard(productId, list);
    } else {
        // Agregar favorito
        list.push(productId);
        saveWishlist(list);
    }

    updateWishlistIcon(productId);
    updateWishlistCount();
}

// Verificar si un producto está en favoritos
function isFavorite(productId) {
    let list = loadWishlist();
    return list.includes(productId);
}


function updateWishlistIcon(productId) {
    const btn = document.querySelector(`#fav-${productId}`);
    if (!btn) return;

    if (isFavorite(productId)) {
        //Corazón relleno rojo
        btn.innerHTML = `<i class="bi bi-heart-fill" style="color:#dc3545;"></i>`;
    } else {
        // Corazón vacío normal
        btn.innerHTML = `<i class="bi bi-heart"></i>`;
    }
}

// contador en navbar de favoritos
function updateWishlistCount() {
    const counter = document.getElementById("wishlist-count");
    if (!counter) return;

    const list = loadWishlist();
    counter.textContent = list.length;
}

function removeFavoriteCard(productId, updatedList) {

    const card = document.querySelector(`#card-${productId}`);
    if (card) {
        card.style.transition = "opacity .4s ease";
        card.style.opacity = "0";
        setTimeout(() => card.remove(), 400);
    }

    // Ya NO usamos loadWishlist(): usamos la lista actualizada
    if (updatedList.length === 0) {

        const container = document.getElementById("fav-list");

        if (container) {
            container.innerHTML = `
                <div class="d-flex justify-content-center mt-5">
                    <div class="p-5 rounded shadow-lg text-center"
                         style="
                            background: rgba(255,255,255,0.08); 
                            backdrop-filter: blur(6px); 
                            max-width: 500px;
                            animation: fadeIn .6s ease;
                         ">

                        <div class="mb-3">
                            <i class="bi bi-heartbreak-fill" style="font-size: 4rem; color: #dc3545;"></i>
                        </div>

                        <h3 class="fw-bold mb-3">Todavía no agregaste favoritos</h3>

                        <p class="text-white-50 mb-4">
                            Cuando marques un producto con ❤️ aparecerá acá para verlo más tarde.
                        </p>

                        <a href="../pages/home.html" class="btn btn-primary px-4 py-2">
                            <i class="bi bi-shop"></i> Ir a comprar
                        </a>
                    </div>
                </div>

                <style>
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(10px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                </style>
            `;
        }
    }
}
