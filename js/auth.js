// =====================================
// INICIAR SESIÓN
// =====================================
function loginUser(event) {
    event.preventDefault();

    // Tomar valores del formulario
    const email = document.getElementById("email")?.value.trim();
    const password = document.getElementById("password")?.value.trim();

    // Validación básica
    if (!email || !password) {
        alert("Completa todos los campos");
        return;
    }

    // --------------------------------------------------
    // VALIDACIÓN DE USUARIO (MÍNIMA PERO NECESARIA)
    // Esto evita que entre cualquiera como "logueado".
    // --------------------------------------------------
    const VALID_EMAIL = "admin@zammot.com";
    const VALID_PASSWORD = "1234";

    if (email !== VALID_EMAIL || password !== VALID_PASSWORD) {
        alert("Usuario o contraseña incorrectos");
        return;
    }

    // Si pasó la validación → guardar datos reales del usuario
    const userData = {
        email: email,
        loginTime: new Date().toISOString()
    };

    // Guardamos info en sessionStorage (punto 1 de la entrega 5)
    sessionStorage.setItem("loggedUser", JSON.stringify(userData));

    // Flag para el navbar y navegación
    localStorage.setItem("isLoggedIn", "true");

    // Redirigir al HOME completo
    window.location.href = "./pages/home.html";
}


// =====================================
// CERRAR SESIÓN
// =====================================
function logoutUser() {
    // borrar datos
    sessionStorage.removeItem("loggedUser");
    localStorage.removeItem("isLoggedIn");

    // volver al login
    window.location.href = "../index.html";
}


// =====================================
// INGRESAR SIN INICIAR SESIÓN
// (HOME LIMITADO)
// =====================================
function visitWithoutLogin() {
    // Asegurar que NO quede ninguna sesión activa
    sessionStorage.removeItem("loggedUser");
    localStorage.removeItem("isLoggedIn");

    // Ir al home básico (sin login)
    window.location.href = "./pages/home.html";
}
