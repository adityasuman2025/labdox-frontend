import { memo, type ReactNode } from "react";

interface ButtonWithLoaderProps {
    isLoading?: boolean,
    content?: ReactNode | string,
    className?: string,
    disabled?: boolean,
    error?: string,
}
function ButtonWithLoader({
    isLoading = false,
    content,
    className = "",
    disabled,
    error = "",
}: ButtonWithLoaderProps) {
    return (
        <div className="w-full">
            <button className={`btn ${className}`} disabled={isLoading || disabled}>
                {isLoading && <span className="loading loading-spinner loading-sm"></span>}
                {content}
            </button>

            {error && (
                <span className="text-xs text-error mt-1 block pl-1">
                    {error}
                </span>
            )}
        </div>
    );
}

export default memo(ButtonWithLoader);