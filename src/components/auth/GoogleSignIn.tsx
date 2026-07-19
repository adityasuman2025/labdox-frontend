import { useCallback, useState, memo } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import Loader from "../common/Loader";
import { apiCall } from "../../utils/api";
import { setCookie } from "../../utils/cookie";
import { API_METHODS, GENERAL_ERROR } from "../../constants";

interface GoogleSignInProps {
    apiEndpoint: string;
    tokenCookieKey: string;
    redirectPath: string;
}
function GoogleSignIn({ apiEndpoint, tokenCookieKey, redirectPath }: GoogleSignInProps) {
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const googleAuthMutation = useMutation({
        mutationFn: (body: { idToken: string }) => apiCall(apiEndpoint, API_METHODS.POST, body),
        onSuccess: function ({ data }) {
            if (data?.token) {
                setCookie(tokenCookieKey, data.token, 7);
                navigate(redirectPath, { replace: true });
            } else setError(GENERAL_ERROR);
        },
        onError: (e) => setError(e.message)
    });

    const handleGoogleSuccess = useCallback((credentialResponse: CredentialResponse) => {
        setError("");
        if (credentialResponse.credential) googleAuthMutation.mutate({ idToken: credentialResponse.credential });
        else setError("Google Login returned empty credentials");
    }, [googleAuthMutation]);

    const handleGoogleError = useCallback(() => {
        setError("Google Login Failed");
    }, []);

    return (
        <div className="w-full flex flex-col items-center justify-center mt-2">
            <div className="divider w-full text-xs text-base-content/50 uppercase">or</div>

            {googleAuthMutation.isPending ? (
                <Loader />
            ) : (
                <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleError}
                    width="320"
                    text="continue_with"
                    theme="outline"
                    shape="rectangular"
                />
            )}

            {error && (
                <span className="text-xs text-error mt-2 block text-center pl-1">
                    {error}
                </span>
            )}
        </div>
    );
}

export default memo(GoogleSignIn);
