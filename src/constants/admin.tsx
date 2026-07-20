export const STATUS_VALID = "valid";
export const STATUS_INVALID = "invalid";

export const getStatusBadge = (status: string) => {
    const s = status?.toLowerCase();
    if (s === STATUS_VALID) return <span className="badge badge-success gap-1 text-xs">{STATUS_VALID}</span>;
    if (s === STATUS_INVALID) return <span className="badge badge-error gap-1 text-xs">{STATUS_INVALID}</span>;
    return null;
};

export const COLUMNS: Record<string, any>[] = [
    {
        title: "Name",
        body: (item) => <span>{item.fullName}</span>,
    },
    {
        title: "Email",
        body: (item) => <span>{item.userId?.email || "-"}</span>,
    },
    {
        title: "Phone",
        body: (item) => <span>{item.phoneNumber || "-"}</span>,
    },
    {
        title: "Email Validation",
        body: (item) => getStatusBadge(item.emailValidationStatus),
    },
    {
        title: "Phone Validation",
        body: (item) => getStatusBadge(item.phoneValidationStatus),
    },
    {
        title: "Interest Reason",
        className: "max-w-xs truncate text-sm",
        body: (item) => <span title={item.interestReason}>{item.interestReason}</span>,
    },
    {
        title: "Use Case",
        className: "max-w-xs truncate text-sm",
        body: (item) => <span title={item.useCase}>{item.useCase}</span>,
    },
];
