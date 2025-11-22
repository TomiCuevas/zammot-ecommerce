
function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}

function getLoggedUser() {
    return JSON.parse(sessionStorage.getItem("loggedUser")) || null;
}

// nombre y apellido con mayuscula inicial

function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

function registerUser(event) {
    event.preventDefault();

    const nombre = capitalize(document.getElementById("reg-nombre")?.value.trim());
    const apellido = capitalize(document.getElementById("reg-apellido")?.value.trim());
    const email = document.getElementById("reg-email")?.value.trim();
    const password = document.getElementById("reg-pass")?.value.trim();
    const fechaNac = document.getElementById("reg-fechaNac")?.value.trim();

    if (!nombre || !apellido || !email || !password || !fechaNac) {
        showErrorToast("Completá todos los campos.");
        return;
    }

    const emailRegex = /^[^\s@]+@(gmail|hotmail|outlook|yahoo|icloud)\.(com|com\.ar)$/i;
    if (!emailRegex.test(email)) {
        showErrorToast("Ingresá un email válido (.com o .com.ar).");
        return;
    }

    const users = getUsers();

    if (users.some(u => u.email === email)) {
        showErrorToast("Este email ya está registrado.");
        return;
    }

    users.push({ nombre, apellido, email, password, fechaNac });
    saveUsers(users);

    showRegisterToast();

    setTimeout(() => {
        window.location.href = "../index.html";
    }, 1600);
}


//inicio sesion

function loginUser(event) {
    event.preventDefault();

    const email = document.getElementById("email")?.value.trim();
    const password = document.getElementById("password")?.value.trim();

    if (!email || !password) {
        showErrorToast("Completá todos los campos.");
        return;
    }

    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        showErrorToast("Email o contraseña incorrectos.");
        return;
    }

    sessionStorage.setItem("loggedUser", JSON.stringify({
        email: user.email,
        nombre: user.nombre,
        apellido: user.apellido,
        fechaNac: user.fechaNac,
        loginTime: new Date().toISOString()
    }));

    localStorage.setItem("isLoggedIn", "true");

    window.location.href = "./pages/home.html";
}

//cerrar la sesion
function logoutUser() {
    sessionStorage.removeItem("loggedUser");
    localStorage.removeItem("isLoggedIn");
    window.location.href = "../index.html";
}

//ingresar sin login

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
        showErrorToast("Ingresá un email.");
        return;
    }

    const users = getUsers();
    const user = users.find(u => u.email === email);

    if (!user) {
        showErrorToast("No existe una cuenta con ese email.");
        return;
    }

    showSuccessToast(`Se envió un correo a ${email}`);
    closeForgotModal();
}

function showRegisterToast() {

    removeExistingToast();

    const toast = document.createElement("div");
    toast.id = "toastRegister";
    toast.style = toastBaseStyle();

    toast.innerHTML = `
        <i class="bi bi-check-circle-fill" style="color:#28db5f; font-size: 18px;"></i>
        <span>Registro exitoso. Ahora podés iniciar sesión</span>
        ${toastAnimations()}
    `;

    document.body.appendChild(toast);
    autoRemoveToast(toast);
}


function showErrorToast(msg) {

    removeExistingToast();

    const toast = document.createElement("div");
    toast.id = "toastError";
    toast.style = toastBaseStyle();

    toast.innerHTML = `
        <i class="bi bi-exclamation-circle-fill" style="color:#ff4444; font-size: 18px;"></i>
        <span>${msg}</span>
        ${toastAnimations()}
    `;

    document.body.appendChild(toast);
    autoRemoveToast(toast);
}

function showSuccessToast(msg) {

    removeExistingToast();

    const toast = document.createElement("div");
    toast.id = "toastSuccess";
    toast.style = toastBaseStyle();

    toast.innerHTML = `
        <i class="bi bi-check2-circle" style="color:#28db5f; font-size:18px;"></i>
        <span>${msg}</span>
        ${toastAnimations()}
    `;

    document.body.appendChild(toast);
    autoRemoveToast(toast);
}


function toastBaseStyle() {
    return `
        position: fixed;
        bottom: 25px;
        right: 25px;
        background: rgba(30,30,30,0.92);
        color: white;
        padding: 14px 20px;
        border-radius: 10px;
        font-size: 15px;
        box-shadow: 0 4px 18px rgba(0,0,0,0.35);
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 999999;
        animation: fadeInToast .3s ease-out;
    `;
}

function toastAnimations() {
    return `
        <style>
            @keyframes fadeInToast {
                from { opacity: 0; transform: translateY(10px); }
                to   { opacity: 1; transform: translateY(0); }
            }
            @keyframes fadeOutToast {
                from { opacity: 1; transform: translateY(0); }
                to   { opacity: 0; transform: translateY(10px); }
            }
        </style>
    `;
}

function autoRemoveToast(toast) {
    setTimeout(() => {
        toast.style.animation = "fadeOutToast .4s ease-in forwards";
        setTimeout(() => toast.remove(), 400);
    }, 2200);
}

function removeExistingToast() {
    const t1 = document.getElementById("toastRegister");
    const t2 = document.getElementById("toastError");
    const t3 = document.getElementById("toastSuccess");
    if (t1) t1.remove();
    if (t2) t2.remove();
    if (t3) t3.remove();
}
