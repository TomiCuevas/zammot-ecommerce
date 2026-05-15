document.addEventListener("DOMContentLoaded", () => {

    renderNavbar();

    const form = document.querySelector("form");

    if (form) {

        form.addEventListener("submit", (event) => {

            event.preventDefault();

            alert("Mensaje enviado correctamente.");

            form.reset();

        });

    }

});