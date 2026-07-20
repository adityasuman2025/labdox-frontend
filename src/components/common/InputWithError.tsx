import { memo, type ChangeEvent } from "react";
import Error from "./Error";

interface InputWithErrorProps {
    type: string;
    placeholder: string;
    name?: string;
    error?: string;
    className?: string;
    disabled?: boolean;
    defaultValue?: string;
    maxLength?: number;
    onChange?: (e: ChangeEvent<any>) => void;
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
    onChange,
}: InputWithErrorProps) {
    return (
        <div className={`w-full ${className}`}>
            {type === "textarea" ? (
                <textarea
                    name={name}
                    placeholder={placeholder}
                    disabled={disabled}
                    defaultValue={defaultValue}
                    className={`textarea w-full ${error ? "textarea-error" : ""} ${className}`}
                    maxLength={maxLength}
                    onChange={onChange}
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
                    onChange={onChange}
                />
            )}

            <Error message={error} />
        </div>
    );
}

export default memo(InputWithError);