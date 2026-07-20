import AuthForm from "../components/auth/AuthForm";
import { API_ROUTE_USER_SIGNUP, ROUTE_USER_WAITLIST, AUTH_TOKEN_KEY } from "../constants";

export default function Signup() {
    return (
        <AuthForm
            title="Sign Up"
            apiEndpoint={API_ROUTE_USER_SIGNUP}
            tokenCookieKey={AUTH_TOKEN_KEY}
            redirectPath={ROUTE_USER_WAITLIST}
            isSignup={true}
        />
    );
}
