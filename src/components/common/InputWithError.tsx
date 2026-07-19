import { memo } from "react";

interface InputWithErrorProps {
    type: string,
    placeholder: string,
    name: string,
    error?: string,
    className?: string,
}
function InputWithError({
    type = "text",
    placeholder = "",
    name,
    error,
    className = "",
}: InputWithErrorProps) {
    return (
        <div className="w-full">
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                className={`input w-full ${error ? "input-error" : ""} ${className}`}
            />
            {error && (
                <span className="text-xs text-error mt-1 block pl-1">
                    {error}
                </span>
            )}
        </div>
    );
}

export default memo(InputWithError);