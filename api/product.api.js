import { BASE_URL } from "./app.js";

const API_URL = `${BASE_URL}/products`;

async function getAllProducts() {

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {

            throw new Error(
                "Error obteniendo productos"
            );

        }

        const products = await response.json();

        return products;

    } catch (error) {

        console.error(
            "Error obteniendo productos:",
            error
        );

        throw new Error(
            "No se pudo conectar con el servidor"
        );

    }

}

async function getProductsByCategory(category) {

    try {

        const response = await fetch(
            `${API_URL}/category/${category}`
        );

        if (!response.ok) {

            throw new Error(
                "Error filtrando productos"
            );

        }

        const products = await response.json();

        return products;

    } catch (error) {

        console.error(
            "Error filtrando productos:",
            error
        );

        throw new Error(
            "No se pudo conectar con el servidor"
        );

    }

}

// NUEVO FILTRO PROFESIONAL DESDE BACKEND
async function getFilteredProducts(filters = {}) {

    try {

        const params = new URLSearchParams();

        if (
            filters.category &&
            filters.category !== "all"
        ) {

            params.append(
                "category",
                filters.category
            );

        }

        if (
            filters.maxPrice &&
            Number(filters.maxPrice) > 0
        ) {

            params.append(
                "maxPrice",
                filters.maxPrice
            );

        }

        const response = await fetch(
            `${API_URL}/filter?${params.toString()}`
        );

        if (!response.ok) {

            throw new Error(
                "Error filtrando productos"
            );

        }

        const products = await response.json();

        return products;

    } catch (error) {

        console.error(
            "Error obteniendo filtros:",
            error
        );

        throw new Error(
            "No se pudo conectar con el servidor"
        );

    }

}

window.getAllProducts = getAllProducts;
window.getProductsByCategory = getProductsByCategory;
window.getFilteredProducts = getFilteredProducts;

export {
    getAllProducts,
    getProductsByCategory,
    getFilteredProducts
};