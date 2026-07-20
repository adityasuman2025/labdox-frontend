import React from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router";
import { getCookie } from "../utils/storage";
import { AUTH_TOKEN_KEY, ADMIN_AUTH_TOKEN_KEY, ROUTE_LOGIN, ROUTE_ADMIN, ROUTE_USER_WAITLIST, ROUTE_ADMIN_WAITLIST } from "../constants";

interface AuthProps {
    children: React.ReactNode;
}

export function UserAuth({ children }: AuthProps) {
    const token = getCookie(AUTH_TOKEN_KEY);
    return token ? <>{children}</> : <Navigate to={ROUTE_LOGIN} replace />;
}

export function NotUserAuth({ children }: AuthProps) {
    const token = getCookie(AUTH_TOKEN_KEY);
    return token ? <Navigate to={ROUTE_USER_WAITLIST} replace /> : <>{children}</>;
}

export function AdminAuth({ children }: AuthProps) {
    const token = getCookie(ADMIN_AUTH_TOKEN_KEY);
    return token ? <>{children}</> : <Navigate to={ROUTE_ADMIN} replace />;
}


export function NotAdminAuth({ children }: AuthProps) {
    const token = getCookie(ADMIN_AUTH_TOKEN_KEY);
    return token ? <Navigate to={ROUTE_ADMIN_WAITLIST} replace /> : <>{children}</>;
}
