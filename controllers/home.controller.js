document.addEventListener("DOMContentLoaded", async () => {

    renderNavbar();

    await renderProducts();

    initializeFilters();

});

function initializeFilters() {

    const categoryFilter = document.getElementById("category-filter");
    const priceFilter = document.getElementById("price-filter");
    const clearFiltersBtn = document.getElementById("clear-filters");

    if (!categoryFilter || !priceFilter) return;

    categoryFilter.addEventListener("change", applyFilters);
    priceFilter.addEventListener("input", applyFilters);

    if (clearFiltersBtn) {

        clearFiltersBtn.addEventListener("click", async () => {

            categoryFilter.value = "all";
            priceFilter.value = "";

            await renderProducts();

        });

    }

}

async function applyFilters() {

    const category = document.getElementById("category-filter").value;
    const maxPrice = document.getElementById("price-filter").value;

    try {

        const products = await getFilteredProducts({
            category,
            maxPrice
        });

        PRODUCTS_CACHE = products;

        renderFilteredProducts(products);

    } catch (error) {

        const container = document.getElementById("product-list");

        if (container) {
            container.innerHTML = `
                <p class="text-center text-danger">
                    No se pudieron aplicar los filtros.
                </p>
            `;
        }

    }

}

function renderFilteredProducts(products) {

    const container = document.getElementById("product-list");

    if (!container) return;

    if (!products.length) {

        container.innerHTML = `
            <p class="text-center">
                No hay productos con esos filtros.
            </p>
        `;

        return;

    }

    container.innerHTML = products
        .map(renderProductCard)
        .join("");

    products.forEach(product => {

        if (typeof updateWishlistIcon === "function") {
            updateWishlistIcon(product.id);
        }

    });

}