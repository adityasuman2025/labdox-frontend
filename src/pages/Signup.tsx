import AuthForm from "../components/auth/AuthForm";
import { API_ROUTE_USER_SIGNUP, ROUTE_LOGIN } from "../constants";

export default function Signup() {
    return (
        <AuthForm 
            title="Sign Up"
            apiEndpoint={API_ROUTE_USER_SIGNUP}
            redirectPath={ROUTE_LOGIN}
            isSignup={true}
        />
    );
}
