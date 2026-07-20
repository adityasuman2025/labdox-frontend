import Cookies from "js-cookie";

export function getCookie(name: string): string | null {
    return Cookies.get(name) || null;
}

export function setCookie(name: string, value: string, days?: number): void {
    const isSecure = location.protocol === "https:";
    Cookies.set(name, value, { expires: days, secure: isSecure, sameSite: isSecure ? "strict" : "lax" });
}

export function clearCookie(name: string): void {
    Cookies.remove(name);
}

export function getLocal(key: string) {
    const value = localStorage.getItem(key);
    if (!value) return null;
    try {
        return JSON.parse(value);
    } catch {
        return null
    }
}

export function setLocal(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
}

export function clearLocal(key: string): void {
    localStorage.removeItem(key);
}
