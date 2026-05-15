import { BASE_URL } from "./app.js";

const API_URL = `${BASE_URL}/users`;

async function loginApi(email, password) {

    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    });

    const data = await response.json();

    if (!response.ok) {

        throw new Error(
            data.message || "Error al iniciar sesión"
        );

    }

    return data;

}

window.loginApi = loginApi;

export {
    loginApi
};