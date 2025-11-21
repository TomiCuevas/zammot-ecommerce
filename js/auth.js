
// traer usuarios y guardarlos en el localStorage
function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}
function getLoggedUser() {
    return JSON.parse(sessionStorage.getItem("loggedUser")) || null;
}
//REGISTRAR USUARIO
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

//Inicio de sesion
function loginUser(event) {
    event.preventDefault();

    const email = document.getElementById("email")?.value.trim();
    const password = document.getElementById("password")?.value.trim();

    if (!email || !password) {
        alert("Completa todos los campos.");
        return;
    }

    const users = getUsers();

    const user = users.find(
        u => u.email === email && u.password === password
    );

    if (!user) {
        alert("Email o contraseña incorrectos.");
        return;
    }

    //usuario en sessionStorage que se guarda
    const userData = {
        email: user.email,
        nombre: user.nombre,
        apellido: user.apellido,
        fechaNac: user.fechaNac,
        loginTime: new Date().toISOString()
    };

    sessionStorage.setItem("loggedUser", JSON.stringify(userData));
    localStorage.setItem("isLoggedIn", "true");
    window.location.href = "./pages/home.html";
}

//Cerrar sesion
function logoutUser() {
    sessionStorage.removeItem("loggedUser");
    localStorage.removeItem("isLoggedIn");

    window.location.href = "../index.html";
}

//ingresar sin inicio 
function visitWithoutLogin() {
    sessionStorage.removeItem("loggedUser");
    localStorage.removeItem("isLoggedIn");

    window.location.href = "./pages/home.html";
}
