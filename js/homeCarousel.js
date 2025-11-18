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

    const destacados = PRODUCTS_CACHE.filter(p => p.category === "destacados");

    if (!destacados.length) {
        track.innerHTML = `<p class="text-center">No hay destacados.</p>`;
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

    btnLeft.onclick = () => track.scrollBy({ left: -300, behavior: "smooth" });
    btnRight.onclick = () => track.scrollBy({ left: 300, behavior: "smooth" });
}
