import AuthForm from "../components/auth/AuthForm";
import { API_ROUTE_USER_LOGIN, API_ROUTE_USER_GOOGLE, AUTH_TOKEN_KEY, ROUTE_USER_WAITLIST } from "../constants";

export default function Login() {
    return (
        <AuthForm 
            title="Labdox Waitlist"
            apiEndpoint={API_ROUTE_USER_LOGIN}
            googleApiEndpoint={API_ROUTE_USER_GOOGLE}
            tokenCookieKey={AUTH_TOKEN_KEY}
            redirectPath={ROUTE_USER_WAITLIST}
        />
    );
}
