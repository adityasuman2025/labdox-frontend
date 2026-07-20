import { memo } from "react";
import { useNavigate } from "react-router";

interface TextLinkProps {
    text: string;
    linkText: string;
    to: string;
}
function TextLink({ text, linkText, to }: TextLinkProps) {
    const navigate = useNavigate();

    return (
        <p className="text-sm text-base-content/70">
            {text}
            <span
                onClick={() => navigate(to)}
                className="text-primary hover:underline cursor-pointer font-semibold ml-1.5"
            >
                {linkText}
            </span>
        </p>
    );
}

export default memo(TextLink);
