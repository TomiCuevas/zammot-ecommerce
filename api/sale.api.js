import { BASE_URL } from "./app.js";

const SALES_API_URL = `${BASE_URL}/sales`;

async function createSaleApi(saleData) {

    const response = await fetch(
        `${SALES_API_URL}/create`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(saleData)
        }
    );

    const data = await response.json();

    if (!response.ok) {

        throw new Error(
            data.message || "Error al crear venta"
        );

    }

    return data;

}

window.createSaleApi = createSaleApi;

export {
    createSaleApi
};