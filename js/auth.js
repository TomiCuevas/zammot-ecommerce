
// OBTENER Y GUARDAR USUARIOS EN localStorage
function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}

// REGISTRAR USUARIO
function registerUser(event) {
    event.preventDefault();

    const nombre = document.getElementById("reg-nombre")?.value.trim();
    const apellido = document.getElementById("reg-apellido")?.value.trim();
    const email = document.getElementById("reg-email")?.value.trim();
    const password = document.getElementById("reg-pass")?.value.trim();
    const fechaNac = document.getElementById("reg-fechaNac")?.value.trim();

    if (!nombre || !apellido || !email || !password || !fechaNac) {
        alert("Completa todos los campos.");
        return;
    }

    const users = getUsers();

    if (users.some(u => u.email === email)) {
        alert("Este email ya está registrado.");
        return;
    }

    users.push({
        nombre,
        apellido,
        email,
        password,
        fechaNac
    });

    saveUsers(users);

    alert("Registro exitoso. Ahora podés iniciar sesión.");
    window.location.href = "../index.html";
}

// INICIAR SESIÓN 
function loginUser(event) {
    event.preventDefault();

    const email = document.getElementById("email")?.value.trim();
    const password = document.getElementById("password")?.value.trim();

    if (!email || !password) {
        alert("Completa todos los campos.");
        return;
    }

    const users = getUsers();

    // Buscar usuario con email y contraseña registrados que coincidan si o si
    const user = users.find(
        u => u.email === email && u.password === password
    );

    if (!user) {
        alert("Email o contraseña incorrectos.");
        return;
    }

    // Guarda la sesión en sessionStorage
    const userData = {
        email: user.email,
        nombre: user.nombre,
        apellido: user.apellido,
        fechaNac: user.fechaNac,
        loginTime: new Date().toISOString()
    };

    sessionStorage.setItem("loggedUser", JSON.stringify(userData));

    //aca se avisa al navbar  de que no ingresó el tipo
    localStorage.setItem("isLoggedIn", "true");
    window.location.href = "./pages/home.html";
}


// CERRAR SESIÓN
function logoutUser() {
    sessionStorage.removeItem("loggedUser");
    localStorage.removeItem("isLoggedIn");

    window.location.href = "../index.html";
}


// INGRESAR SIN INICIAR SESIÓN
function visitWithoutLogin() {
    sessionStorage.removeItem("loggedUser");
    localStorage.removeItem("isLoggedIn");
    window.location.href = "./pages/home.html";
}
