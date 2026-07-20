import { memo } from "react";

interface ErrorProps {
    message?: string;
    className?: string;
}
function ErrorComponent({ message, className = "" }: ErrorProps) {
    if (!message) return null;
    return (
        <p className={`text-xs text-error mt-1 pl-1 ${className}`}>
            {message}
        </p>
    );
}

export default memo(ErrorComponent);
