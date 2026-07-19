import Cookies from "js-cookie";

export function getCookie(name: string): string | null {
    return Cookies.get(name) || null;
}

export function setCookie(name: string, value: string, days?: number): void {
    const isSecure = window.location.protocol === "https:";
    Cookies.set(name, value, { expires: days, secure: isSecure, sameSite: isSecure ? "strict" : "lax" });
}

export function clearCookie(name: string): void {
    Cookies.remove(name);
}
