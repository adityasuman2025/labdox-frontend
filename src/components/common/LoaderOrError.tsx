import { type ReactNode } from "react";
import Loader from "./Loader";
import Error from "./Error";

interface LoaderOrErrorProps {
    isLoading: boolean;
    error: string;
    isEmpty: boolean;
    emptyTitle?: string;
    children: ReactNode;
}
export default function LoaderOrError({
    isLoading,
    error,
    isEmpty,
    emptyTitle = "No data found",
    children
}: LoaderOrErrorProps) {
    if (error) return <Error message={error} className="text-center" />;

    if (isLoading) {
        return (
            <div className="flex justify-center items-center w-full">
                <Loader className="w-10" />
            </div>
        );
    }

    if (isEmpty) return <h3 className="text-base md:text-lg font-semibold text-neutral text-center">{emptyTitle}</h3>

    return <>{children}</>;
}
