import AuthForm from "../components/auth/AuthForm";
import { API_ROUTE_ADMIN_LOGIN, API_ROUTE_ADMIN_GOOGLE, ADMIN_AUTH_TOKEN_KEY, ROUTE_ADMIN_WAITLIST } from "../constants";

export default function Admin() {
    return (
        <AuthForm 
            title="Labdox Admin"
            apiEndpoint={API_ROUTE_ADMIN_LOGIN}
            googleApiEndpoint={API_ROUTE_ADMIN_GOOGLE}
            tokenCookieKey={ADMIN_AUTH_TOKEN_KEY}
            redirectPath={ROUTE_ADMIN_WAITLIST}
            isAdmin={true}
        />
    );
}
