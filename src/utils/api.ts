import { API_METHODS } from "../constants";

type apiMethodstype = typeof API_METHODS;

export async function apiCall(url: string, method: keyof apiMethodstype = API_METHODS.GET, body: Record<string, any> = {}) {
    const resp = await fetch(url, {
        method,
        ...(Object.keys(body).length ? { body: JSON.stringify(body) } : {}),
        headers: { "Content-Type": "application/json" }
    });

    const json = await resp.json();
    if (!resp.ok) throw new Error(json.message);

    return json;
}