import { clearCookie } from "./cookie";
import { ADMIN_AUTH_TOKEN_KEY, API_METHODS, AUTH_TOKEN_KEY, GENERAL_ERROR, ROUTE_LOGIN } from "../constants";

type apiMethodstype = typeof API_METHODS;

export async function apiCall(url: string, method: keyof apiMethodstype = API_METHODS.GET, body: Record<string, any> = {}) {
    const resp = await fetch(url, {
        method,
        ...(Object.keys(body).length ? { body: JSON.stringify(body) } : {}),
        headers: { "Content-Type": "application/json" }
    });

    if (resp.status === 401) {
        // if not authorised then loggin the user out
        clearCookie(AUTH_TOKEN_KEY);
        clearCookie(ADMIN_AUTH_TOKEN_KEY);
        window.location.href = ROUTE_LOGIN;

        throw new Error("un-authorised");
    }

    const json = await resp.json();

    if (!resp.ok) throw new Error(json.message || GENERAL_ERROR);

    return json;
}