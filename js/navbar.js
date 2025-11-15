function renderNavbar() {

    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    let nav = `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        <a class="navbar-brand d-flex align-items-center" href="../pages/home.html">
            <img src="/styles/img/zammot_bowtie.webp" height="40" class="me-2">
            ZAMMOT
        </a>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
    `;

    if (!isLoggedIn) {

        nav += `
            <li class="nav-item">
                <a class="nav-link" href="../pages/home.html">Home</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="../pages/Registro.html">Registrarse</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="../pages/contacto.html">Contacto</a>
            </li>
            <li class="nav-item">
                <a class="nav-link d-flex align-items-center gap-1" href="../index.html">
                    <i class="bi bi-box-arrow-in-right"></i>
                </a>
            </li>
        `;

    } else {

        pages.forEach(p => {
            nav += `
                <li class="nav-item">
                    <a class="nav-link" href="${p.url}">${p.title}</a>
                </li>
            `;
        });


        nav += `
            <li class="nav-item">
                <a class="nav-link d-flex align-items-center gap-1" href="../pages/carrito.html">
                    <i class="bi bi-cart3"></i>
                    <span id="cart-count" class="badge bg-primary rounded-pill">0</span>
                </a>
            </li>
        `;

        nav += `
            <li class="nav-item">
                <a class="nav-link text-danger fw-bold d-flex align-items-center gap-1"
                   href="#" onclick="logoutUser()">
                    <i class="bi bi-box-arrow-right"></i>
                </a>
            </li>
        `;
    }

    nav += `
            </ul>
        </div>
    </nav>
    `;

    document.getElementById("navbar").innerHTML = nav;

    requestAnimationFrame(() => {
        if (typeof updateCartCount === "function") {
            updateCartCount();
        }
    });
}
