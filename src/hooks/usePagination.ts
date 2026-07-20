import { useCallback } from "react";

interface UsePaginationOptions {
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>> | ((page: number | ((prev: number) => number)) => void);
    totalItems: number;
    pageSize: number;
}
export function usePagination({ page, setPage, totalItems, pageSize }: UsePaginationOptions) {
    const totalPages = Math.ceil((totalItems || 0) / pageSize);

    const handlePrevClick = useCallback(() => {
        setPage(prev => Math.max((prev as number) - 1, 1));
    }, [setPage]);

    const handleNextClick = useCallback(() => {
        setPage(prev => Math.min((prev as number) + 1, totalPages));
    }, [setPage, totalPages]);

    return {
        totalPages,
        handlePrevClick,
        handleNextClick,
        isFirstPage: page === 1,
        isLastPage: page === totalPages || totalPages === 0
    };
}
