import { useCallback, useMemo, useState, type ChangeEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import Layout from "../components/common/Layout";
import Cards from "../components/common/Cards";
import LoaderOrError from "../components/common/LoaderOrError";
import { apiCall, debounce } from "../utils";
import { API_ROUTE_WAITLIST } from "../constants";
import { COLUMNS } from "../constants/admin";
import InputWithError from "../components/common/InputWithError";
import ButtonWithLoader from "../components/common/ButtonWithLoader";
import { usePagination } from "../hooks/usePagination";

const SIZE = 20;


export default function AdminWaitlist() {
    const [searchQry, setSearchQry] = useState<string>("");
    const [page, setPage] = useState<number>(1);

    const { data, isLoading, error } = useQuery<Record<string, any>>({
        queryKey: ["waitlist", page, searchQry],
        queryFn: () => apiCall(`${API_ROUTE_WAITLIST}?page=${page}&limit=${SIZE}${searchQry ? "&search=" + searchQry : ""}`),
        refetchOnWindowFocus: false,
    });
    const items = data?.data?.items || [];
    const totalItems = data?.data?.totalItems || 0;

    const { totalPages, handlePrevClick, handleNextClick, isFirstPage, isLastPage } = usePagination({ page, setPage, totalItems, pageSize: SIZE });

    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setSearchQry(val);
        setPage(1);
    }, []);
    const debounceHandleChange = useMemo(() => debounce(handleChange, 350), [handleChange]);

    return (
        <Layout header="Admin Panel">
            <section className="min-h-full w-full flex flex-col gap-10">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <h1 className="text-xl md:text-2xl font-bold text-neutral">Waitlist Registrations</h1>

                    <InputWithError
                        type="text" placeholder="search by name, email or mobile number"
                        className="w-full md:w-md max-w-md"
                        onChange={debounceHandleChange}
                    />
                </div>

                <LoaderOrError isLoading={isLoading} error={error?.message} isEmpty={items.length === 0} emptyTitle="No results found" >
                    <Cards data={items} columns={COLUMNS} keyExtractor={item => item._id} />

                    {
                        totalPages > 1 ? (
                            <div className="flex items-center w-fit mx-auto gap-10">
                                <ButtonWithLoader content="previous" disabled={isFirstPage} onClick={handlePrevClick} />
                                <ButtonWithLoader content="next" disabled={isLastPage} onClick={handleNextClick} />
                            </div>
                        ) : null
                    }
                </LoaderOrError>
            </section>
        </Layout>
    );
}
