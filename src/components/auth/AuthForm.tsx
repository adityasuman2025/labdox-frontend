import { useCallback, useState, type SyntheticEvent } from "react";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import validator from "validator";
import ButtonWithLoader from "../common/ButtonWithLoader";
import InputWithError from "../common/InputWithError";
import GoogleSignIn from "./GoogleSignIn";
import { apiCall } from "../../utils/api";
import { setCookie } from "../../utils/cookie";
import { API_METHODS, GENERAL_ERROR, ROUTE_LOGIN } from "../../constants";

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
    const [errors, setErrors] = useState({ email: "", password: "", confirmPassword: "", api: "" });

    const authMutation = useMutation({
        mutationFn: (body: Record<string, any>) => apiCall(apiEndpoint, API_METHODS.POST, body),
        onSuccess: function ({ data }) {
            if (isSignup) {
                navigate(ROUTE_LOGIN, { replace: true });
            } else if (data?.token && tokenCookieKey) {
                setCookie(tokenCookieKey, data.token, 7);
                navigate(redirectPath, { replace: true });
            } else {
                setErrors(prev => ({ ...prev, api: GENERAL_ERROR }));
            }
        },
        onError: (e) => setErrors(prev => ({ ...prev, api: e.message }))
    });

    const handleSubmit = useCallback((e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
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
            if (!confirmPassword) {
                newErrors.confirmPassword = "confirm password is required";
            } else if (confirmPassword !== password) {
                newErrors.confirmPassword = "passwords do not match";
            }
        }

        if (newErrors.email || newErrors.password || newErrors.confirmPassword) {
            return setErrors(prev => ({ ...prev, ...newErrors }));
        }

        authMutation.mutate({ email, password });
    }, [authMutation, apiEndpoint, tokenCookieKey, redirectPath, isSignup]);

    const handleChange = useCallback((e: SyntheticEvent<HTMLFormElement>) => {
        const target = e.target as HTMLInputElement;
        const name = target.name;

        setErrors(prev => prev[name] ? { ...prev, [name]: "" } : prev);
    }, []);

    return (
        <main className="h-screen flex flex-col items-center justify-center">
            <form className="w-xs md:w-md flex flex-col gap-4 items-center justify-center" onSubmit={handleSubmit} onChange={handleChange}>
                <h1 className="text-3xl font-bold text-neutral">{title}</h1>

                <InputWithError type="text" name="email" placeholder="email" error={errors.email} />
                <InputWithError type="password" name="password" placeholder="password" error={errors.password} />

                {isSignup && (
                    <InputWithError type="password" name="confirmPassword" placeholder="confirm password" error={errors.confirmPassword} />
                )}

                <ButtonWithLoader
                    content={isSignup ? "Sign Up" : "Login"}
                    className="btn-primary w-full"
                    isLoading={authMutation.isPending}
                    error={errors.api}
                />

                {googleApiEndpoint && tokenCookieKey && (
                    <GoogleSignIn
                        apiEndpoint={googleApiEndpoint}
                        tokenCookieKey={tokenCookieKey}
                        redirectPath={redirectPath}
                    />
                )}
            </form>
        </main>
    );
}
