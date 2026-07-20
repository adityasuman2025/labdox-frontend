import dayjs from "dayjs";

export const STATUS_VALID = "valid";
export const STATUS_INVALID = "invalid";

export const getStatusBadge = (status: string) => {
    const s = status?.toLowerCase();
    if (s === STATUS_VALID) return <span className="badge badge-success text-xs">{STATUS_VALID}</span>;
    if (s === STATUS_INVALID) return <span className="badge badge-error text-xs">{STATUS_INVALID}</span>;
    return null;
};

export const COLUMNS: Record<string, any>[] = [
    {
        title: "Name",
        body: (item: Record<string, any>) => <span>{item.fullName}</span>,
    },
    {
        title: "Email",
        body: (item: Record<string, any>) => <span>{item.userId?.email || "-"}</span>,
    },
    {
        title: "Phone",
        body: (item: Record<string, any>) => <span>{item.phoneNumber || "-"}</span>,
    },
    {
        title: "Email Validation",
        body: (item: Record<string, any>) => getStatusBadge(item.emailValidationStatus),
    },
    {
        title: "Phone Validation",
        body: (item: Record<string, any>) => getStatusBadge(item.phoneValidationStatus),
    },
    {
        title: "Auth Method",
        body: (item: Record<string, any>) => <span className="capitalize">{item.userId?.authMethod || "-"}</span>,
    },
    {
        title: "Submitted At",
        body: (item: Record<string, any>) => {
            if (!item.createdAt) return "-";
            return <span>{dayjs(item.createdAt).format("DD MMM YYYY, hh:mm A")}</span>;
        },
    },
    {
        title: "Interest Reason",
        fullWidth: true,
        body: (item: Record<string, any>) => <span title={item.interestReason}>{item.interestReason}</span>,
    },
    {
        title: "Use Case",
        fullWidth: true,
        body: (item: Record<string, any>) => <span title={item.useCase}>{item.useCase}</span>,
    },
];
