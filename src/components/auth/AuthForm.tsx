import { useCallback, useState, type SyntheticEvent } from "react";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { GoogleLogin } from "@react-oauth/google";
import validator from "validator";
import ButtonWithLoader from "../common/ButtonWithLoader";
import InputWithError from "../common/InputWithError";
import Error from "../common/Error";
import Loader from "../common/Loader";
import TextLink from "../common/TextLink";
import { apiCall } from "../../utils/api";
import { setCookie } from "../../utils/cookie";
import { API_METHODS, GENERAL_ERROR, ROUTE_LOGIN, ROUTE_SIGNUP, API_ROUTE_USER_LOGIN } from "../../constants";

interface AuthFormProps {
    title: string;
    apiEndpoint: string;
    googleApiEndpoint?: string;
    tokenCookieKey?: string;
    redirectPath: string;
    isSignup?: boolean;
}
export default function AuthForm({ title, apiEndpoint, googleApiEndpoint, tokenCookieKey, redirectPath, isSignup = false }: AuthFormProps) {
    const navigate = useNavigate();
    const [errors, setErrors] = useState<Record<string, string>>({ email: "", password: "", confirmPassword: "", api: "" });

    const handleAuthSuccess = useCallback((token?: string) => {
        if (token && tokenCookieKey) {
            setCookie(tokenCookieKey, token, 7);
            navigate(redirectPath, { replace: true });
        } else setErrors(prev => ({ ...prev, api: GENERAL_ERROR }));
    }, [tokenCookieKey, redirectPath, navigate]);

    const authMutation = useMutation({
        mutationFn: (body: Record<string, any>) => apiCall(apiEndpoint, API_METHODS.POST, body),
        onSuccess: function ({ data }) {
            if (isSignup) navigate(ROUTE_LOGIN, { replace: true });
            else handleAuthSuccess(data?.token);
        },
        onError: (e) => setErrors(prev => ({ ...prev, api: e.message }))
    });

    const googleAuthMutation = useMutation({
        mutationFn: (body: { idToken: string }) => apiCall(googleApiEndpoint || "", API_METHODS.POST, body),
        onSuccess: ({ data }) => handleAuthSuccess(data?.token),
        onError: (e) => setErrors(prev => ({ ...prev, api: e.message }))
    });

    const isPending = authMutation.isPending || googleAuthMutation.isPending;

    const handleSubmit = useCallback((e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isPending) return;
        setErrors({ email: "", password: "", confirmPassword: "", api: "" });

        const formData = new FormData(e.currentTarget);
        const email = (formData.get("email") as string || "").trim();
        const password = (formData.get("password") as string || "").trim();
        const confirmPassword = (formData.get("confirmPassword") as string || "").trim();

        const newErrors = {
            email: !email ? "email is required" : (!validator.isEmail(email) ? "not a valid email" : ""),
            password: !password ? "password is required" : "",
            confirmPassword: ""
        };

        if (isSignup) {
            if (!confirmPassword) newErrors.confirmPassword = "confirm password is required";
            else if (confirmPassword !== password) newErrors.confirmPassword = "passwords do not match";
        }

        if (newErrors.email || newErrors.password || newErrors.confirmPassword) return setErrors(prev => ({ ...prev, ...newErrors }));

        authMutation.mutate({ email, password });
    }, [authMutation, isPending]);

    const handleChange = useCallback((e: SyntheticEvent<HTMLFormElement>) => {
        const target = e.target as HTMLInputElement;
        const name = target.name;
        setErrors(prev => prev[name] ? { ...prev, [name]: "" } : prev);
    }, []);

    const handleGoogleSuccess = useCallback((credentialResponse: any) => {
        setErrors(prev => ({ ...prev, api: "" }));
        if (credentialResponse.credential) googleAuthMutation.mutate({ idToken: credentialResponse.credential });
        else setErrors(prev => ({ ...prev, api: GENERAL_ERROR }));
    }, [googleAuthMutation]);

    const handleGoogleError = useCallback(() => {
        setErrors(prev => ({ ...prev, api: "Google Login Failed" }));
    }, []);

    return (
        <main className="h-screen flex flex-col items-center justify-center">
            <form className="w-xs md:w-md flex flex-col gap-4 items-center justify-center" onSubmit={handleSubmit} onChange={handleChange}>
                <h1 className="text-3xl font-bold text-neutral">{title}</h1>

                <InputWithError type="text" name="email" placeholder="email" error={errors.email} disabled={isPending} />
                <InputWithError type="password" name="password" placeholder="password" error={errors.password} disabled={isPending} />

                {isSignup && (
                    <InputWithError type="password" name="confirmPassword" placeholder="confirm password" error={errors.confirmPassword} disabled={isPending} />
                )}

                <ButtonWithLoader content={isSignup ? "Sign Up" : "Login"} className="btn-primary w-full" isLoading={authMutation.isPending} disabled={isPending} />

                {isSignup ? (
                    <TextLink text="Already have an account?" linkText="Log In" to={ROUTE_LOGIN} />
                ) : apiEndpoint === API_ROUTE_USER_LOGIN ? (
                    <TextLink text="Don't have an account?" linkText="Sign Up" to={ROUTE_SIGNUP} />
                ) : null}

                {googleApiEndpoint && tokenCookieKey && (
                    <div className="w-full flex flex-col items-center justify-center mt-2">
                        <div className="divider w-full text-xs text-base-content/50 uppercase">or</div>

                        {googleAuthMutation.isPending ? (
                            <Loader />
                        ) : (
                            <div className={isPending ? "pointer-events-none opacity-50" : ""}>
                                <GoogleLogin
                                    onSuccess={handleGoogleSuccess}
                                    onError={handleGoogleError}
                                    width="320"
                                    text="continue_with"
                                    theme="outline"
                                    shape="rectangular"
                                />
                            </div>
                        )}
                    </div>
                )}

                <Error message={errors.api} className="text-center" />
            </form>
        </main>
    );
}
