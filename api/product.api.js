import { BASE_URL } from "./app.js";

const API_URL = `${BASE_URL}/products`;

async function getAllProducts() {

    try {

        const response = await fetch(API_URL);

        const products = await response.json();

        return products;

    } catch (error) {

        console.error("Error obteniendo productos", error);

        return [];

    }

}

async function getProductsByCategory(category) {

    try {

        const response = await fetch(
            `${API_URL}/category/${category}`
        );

        const products = await response.json();

        return products;

    } catch (error) {

        console.error("Error filtrando productos", error);

        return [];

    }

}

window.getAllProducts = getAllProducts;
window.getProductsByCategory = getProductsByCategory;

export {
    getAllProducts,
    getProductsByCategory
};