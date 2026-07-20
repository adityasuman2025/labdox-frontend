import { memo } from "react";
import { useNavigate } from "react-router";

interface TextLinkProps {
    text?: string;
    linkText: string;
    linkClassName?: string;
    to?: string;
    onClick?: () => void;
}
function TextLink({ text, linkText, linkClassName = "text-primary font-semibold", to, onClick }: TextLinkProps) {
    const navigate = useNavigate();

    const handleClick = () => {
        if (onClick) onClick();
        else if (to) navigate(to);
    };

    return (
        <p className="text-sm text-base-content/70">
            {text && `${text} `}
            <span
                onClick={handleClick}
                className={`hover:underline cursor-pointer ml-1.5 ${linkClassName}`}
            >
                {linkText}
            </span>
        </p>
    );
}

export default memo(TextLink);
