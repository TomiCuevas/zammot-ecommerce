document.addEventListener("DOMContentLoaded", () => {
    if (PRODUCTS_CACHE.length === 0) {
        loadProducts().then(buildHorizontalCarousel);
    } else {
        buildHorizontalCarousel();
    }
});

function buildHorizontalCarousel() {
    const track = document.querySelector(".horizontal-track");

    if (!track) {
        console.error("No existe .horizontal-track");
        return;
    }

    const destacados = PRODUCTS_CACHE.filter(
        p => p.category === "destacados" && p.disponible !== false
    );

    if (!destacados.length) {
        track.innerHTML = `<p class="text-center">No hay destacados disponibles.</p>`;
        return;
    }

    track.innerHTML = destacados
        .map(p => `
            <div class="me-4">
                ${renderProductCard(p)}
            </div>
        `)
        .join("");

    const btnLeft = document.querySelector(".left-btn");
    const btnRight = document.querySelector(".right-btn");

    if (btnLeft) {
        btnLeft.onclick = () => track.scrollBy({ left: -300, behavior: "smooth" });
    }

    if (btnRight) {
        btnRight.onclick = () => track.scrollBy({ left: 300, behavior: "smooth" });
    }
}