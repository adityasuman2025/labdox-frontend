export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export const AUTH_TOKEN_KEY = "token";
export const ADMIN_AUTH_TOKEN_KEY = "admin-token";

export const ROUTE_LOGIN = "/";
export const ROUTE_SIGNUP = "/signup";
export const ROUTE_USER_WAITLIST = "/user-waitlist";
export const ROUTE_ADMIN = "/admin";
export const ROUTE_ADMIN_WAITLIST = "/admin-waitlist";

export const API_METHODS = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    PATCH: "PATCH",
} as const;

export const API_ROUTE_USER_LOGIN = `${API_BASE_URL}/auth/user/login`;
export const API_ROUTE_USER_SIGNUP = `${API_BASE_URL}/auth/user/signup`;
export const API_ROUTE_ADMIN_LOGIN = `${API_BASE_URL}/auth/admin/login`;
export const API_ROUTE_LOGOUT = `${API_BASE_URL}/auth/logout`;
export const API_ROUTE_USER_GOOGLE = `${API_BASE_URL}/auth/user/google`;
export const API_ROUTE_ADMIN_GOOGLE = `${API_BASE_URL}/auth/admin/google`;
export const API_ROUTE_WAITLIST = `${API_BASE_URL}/waitlist`;

export const GENERAL_ERROR = "something went wrong";