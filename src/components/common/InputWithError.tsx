import { memo } from "react";
import Error from "./Error";

interface InputWithErrorProps {
    type: string;
    placeholder: string;
    name: string;
    error?: string;
    className?: string;
    disabled?: boolean;
    defaultValue?: string;
    maxLength?: number;
}
function InputWithError({
    type = "text",
    placeholder = "",
    name,
    error,
    className = "",
    disabled = false,
    defaultValue,
    maxLength,
}: InputWithErrorProps) {
    return (
        <div className="w-full">
            {type === "textarea" ? (
                <textarea
                    name={name}
                    placeholder={placeholder}
                    disabled={disabled}
                    defaultValue={defaultValue}
                    className={`textarea w-full ${error ? "textarea-error" : ""} ${className}`}
                    maxLength={maxLength}
                />
            ) : (
                <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    disabled={disabled}
                    defaultValue={defaultValue}
                    className={`input w-full ${error ? "input-error" : ""} ${className}`}
                    maxLength={maxLength}
                />
            )}

            <Error message={error} />
        </div>
    );
}

export default memo(InputWithError);