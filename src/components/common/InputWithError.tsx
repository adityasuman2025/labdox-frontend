import { memo } from "react";
import Error from "./Error";

interface InputWithErrorProps {
    type: string;
    placeholder: string;
    name: string;
    error?: string;
    className?: string;
    disabled?: boolean;
}
function InputWithError({
    type = "text",
    placeholder = "",
    name,
    error,
    className = "",
    disabled = false,
}: InputWithErrorProps) {
    return (
        <div className="w-full">
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                disabled={disabled}
                className={`input w-full ${error ? "input-error" : ""} ${className}`}
            />

            <Error message={error} />
        </div>
    );
}

export default memo(InputWithError);