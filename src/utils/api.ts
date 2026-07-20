import { clearCookie, clearLocal, getCookie } from "./storage";
import { globalNavigate } from "./navigation";
import { ADMIN_AUTH_TOKEN_KEY, API_METHODS, AUTH_TOKEN_KEY, USER_DATA_KEY, GENERAL_ERROR, ROUTE_LOGIN, ROUTE_ADMIN } from "../constants";

type apiMethodstype = typeof API_METHODS;

const isAdminRoute = () => typeof window !== "undefined" && window.location.pathname.startsWith("/admin");

export async function apiCall(url: string, method: keyof apiMethodstype = API_METHODS.GET, body: Record<string, any> = {}) {
    const token = isAdminRoute() ? getCookie(ADMIN_AUTH_TOKEN_KEY) : getCookie(AUTH_TOKEN_KEY);

    const resp = await fetch(url, {
        method,
        ...(Object.keys(body).length ? { body: JSON.stringify(body) } : {}),
        headers: {
            "Content-Type": "application/json",
            ...(token ? { "Authorization": `Bearer ${token}` } : {})
        }
    });

    if (resp.status === 401) {
        logout(); // if not-authorised then loggin the user out

        throw new Error("un-authorised");
    }

    const json = await resp.json();

    if (!resp.ok) throw new Error(json.message || GENERAL_ERROR);

    return json;
}

export function logout() {
    if (isAdminRoute()) {
        clearCookie(ADMIN_AUTH_TOKEN_KEY);
        globalNavigate(ROUTE_ADMIN);
    } else {
        clearCookie(AUTH_TOKEN_KEY);
        clearLocal(USER_DATA_KEY);
        globalNavigate(ROUTE_LOGIN);
    }
}