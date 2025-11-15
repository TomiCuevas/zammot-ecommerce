// INICIAR SESION
function loginUser(event) {
    event.preventDefault();
    localStorage.setItem("isLoggedIn", "true");
    window.location.href = "./pages/home.html";
}

// CERRAR SESION
function logoutUser() {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "../index.html";
}


