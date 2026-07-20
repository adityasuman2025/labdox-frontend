import { memo, type ReactNode, type SyntheticEvent } from "react";
import Error from "./Error";

interface ButtonWithLoaderProps {
    isLoading?: boolean;
    content: ReactNode | string;
    className?: string;
    disabled?: boolean;
    error?: string;
    onClick?: (e: SyntheticEvent<HTMLButtonElement>) => void;
}
function ButtonWithLoader({
    isLoading = false,
    content,
    className = "",
    disabled,
    error = "",
    onClick,
}: ButtonWithLoaderProps) {
    return (
        <div className={`w-full ${className}`}>
            <button className={`btn w-full ${className}`} disabled={isLoading || disabled} onClick={onClick}>
                {isLoading && <span className="loading loading-spinner loading-sm"></span>}
                {content}
            </button>

            <Error message={error} className="text-center" />
        </div>
    );
}

export default memo(ButtonWithLoader);