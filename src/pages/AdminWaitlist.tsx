import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Layout from "../components/common/Layout";
import Table from "../components/common/Table";
import LoaderOrError from "../components/common/LoaderOrError";
import { apiCall } from "../utils/api";
import { API_ROUTE_WAITLIST } from "../constants";
import { COLUMNS } from "../constants/admin";

const SIZE = 10;

export default function AdminWaitlist() {
    const [page, setPage] = useState<number>(1);

    const { data, isLoading, error } = useQuery<Record<string, any>>({
        queryKey: ["waitlist", page],
        queryFn: () => apiCall(`${API_ROUTE_WAITLIST}?page=${page}&limit=${SIZE}`),
    });
    const items = data?.data?.items || [];

    return (
        <Layout header="Admin Panel">
            <section className="min-h-full w-full flex flex-col gap-10">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl md:text-2xl font-bold text-neutral">Waitlist Registrations</h1>
                </div>

                <LoaderOrError isLoading={isLoading} error={error?.message} isEmpty={items.length === 0} emptyTitle="No results found" >
                    <Table data={items} columns={COLUMNS} keyExtractor={item => item._id} />
                </LoaderOrError>
            </section>
        </Layout>
    );
}
