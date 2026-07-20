import { Suspense, lazy } from "react";
import { BrowserRouter, Routes as MyRoutes, Route, useNavigate, Navigate } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import FullScreenLoader from "./components/common/FullScreenLoader";
import { UserAuth, AdminAuth, NotUserAuth, NotAdminAuth } from "./hocs/Auth";
import { setGlobalNavigate } from "./utils/navigation";
import { ROUTE_LOGIN, ROUTE_SIGNUP, ROUTE_USER_WAITLIST, ROUTE_ADMIN, ROUTE_ADMIN_WAITLIST, GOOGLE_CLIENT_ID } from "./constants";

const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const UserWaitlist = lazy(() => import("./pages/UserWaitlist"));
const Admin = lazy(() => import("./pages/Admin"));
const AdminWaitlist = lazy(() => import("./pages/AdminWaitlist"));

const queryClient = new QueryClient();

function NavigationSetter() {
    const navigate = useNavigate();
    setGlobalNavigate(navigate);
    return null;
}

export default function Routes() {
    return (
        <Suspense fallback={<FullScreenLoader />}>
            <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                <QueryClientProvider client={queryClient}>
                    <BrowserRouter>
                        <NavigationSetter />
                        <MyRoutes>
                            <Route path={ROUTE_LOGIN} element={<NotUserAuth><Login /></NotUserAuth>} />
                            <Route path={ROUTE_SIGNUP} element={<NotUserAuth><Signup /></NotUserAuth>} />
                            <Route path={ROUTE_USER_WAITLIST} element={<UserAuth><UserWaitlist /></UserAuth>} />

                            <Route path={ROUTE_ADMIN} element={<NotAdminAuth><Admin /></NotAdminAuth>} />
                            <Route path={ROUTE_ADMIN_WAITLIST} element={<AdminAuth><AdminWaitlist /></AdminAuth>} />
                            <Route path="*" element={<Navigate to={ROUTE_LOGIN} replace />} />
                        </MyRoutes>
                    </BrowserRouter>
                </QueryClientProvider>
            </GoogleOAuthProvider>
        </Suspense>
    )
}
