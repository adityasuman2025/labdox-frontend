interface TableProps {
    data: Record<string, any>[];
    columns: Record<string, any>[];
    keyExtractor: (item: Record<string, any>) => string;
}
export default function Table({ data, columns, keyExtractor }: TableProps) {
    return (
        <div className="overflow-x-auto border border-base-300 rounded-sm">
            <table className="table w-full">
                <thead>
                    <tr className="bg-base-300 text-neutral">
                        {columns.map((col, idx) => (
                            <th key={idx} className={col.className}>{col.title}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={keyExtractor(item)} className="hover:bg-base-200">
                            {columns.map((col, idx) => (
                                <td key={idx} className={col.className}>
                                    {col.body(item)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
