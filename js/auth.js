
// INICIAR SESION
function loginUser(event) {
    event.preventDefault();

    //Tomar los valores desde el form
    const email = document.getElementById("email")?.value.trim();
    const password = document.getElementById("password")?.value.trim();

    if (!email || !password) {
        alert("Completa todos los campos");
        return;
    }
    // Guardar datos en el sessionStorage 
    const userData = {
        email: email,
        loginTime: new Date().toISOString()
    };
    sessionStorage.setItem("loggedUser", JSON.stringify(userData));
    localStorage.setItem("isLoggedIn", "true");
    window.location.href = "./pages/home.html";
}

// CERRAR SESION
function logoutUser() {
    sessionStorage.removeItem("loggedUser");
    localStorage.removeItem("isLoggedIn");
    window.location.href = "../index.html";
}
