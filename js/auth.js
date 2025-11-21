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

//que en el nombre y el apellido la primera letra sea mayuscula y las demas minusculas
function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

function registerUser(event) {
    event.preventDefault();

    const nombre = capitalize(document.getElementById("reg-nombre")?.value.trim());   // 🔥 Capitalizado
    const apellido = capitalize(document.getElementById("reg-apellido")?.value.trim()); // 🔥 Capitalizado
    const email = document.getElementById("reg-email")?.value.trim(); // ❌ YA NO SE PASA A minúsculas
    const password = document.getElementById("reg-pass")?.value.trim();
    const fechaNac = document.getElementById("reg-fechaNac")?.value.trim();

    if (!nombre || !apellido || !email || !password || !fechaNac) {
        alert("Completa todos los campos.");
        return;
    }

    const emailRegex = /^[^\s@]+@(gmail|hotmail|outlook|yahoo|icloud)\.(com|com\.ar)$/i;
    if (!emailRegex.test(email)) {
        alert("El email debe ser gmail, hotmail, outlook, yahoo o icloud y terminar en .com o .com.ar");
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


function openForgotModal() {
    const modal = document.getElementById("forgotModal");
    if (modal) modal.style.display = "flex";
}

function closeForgotModal() {
    const modal = document.getElementById("forgotModal");
    const emailInput = document.getElementById("forgotEmail");

    if (emailInput) emailInput.value = "";

    if (modal) modal.style.display = "none";
}

function sendRecoveryEmail() {
    const emailInput = document.getElementById("forgotEmail");
    if (!emailInput) return;

    const email = emailInput.value.trim();
    if (!email) {
        alert("Por favor ingresá un email.");
        return;
    }

    const users = getUsers();
    const user = users.find(u => u.email === email);

    if (!user) {
        alert("No existe una cuenta registrada con ese email.");
        return;
    }

    alert(`Se ha enviado un correo de recuperación a: ${email}`);

    closeForgotModal();
}
