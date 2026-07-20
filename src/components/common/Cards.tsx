interface CardsProps {
    data: Record<string, any>[];
    columns: Record<string, any>[];
    keyExtractor: (item: Record<string, any>) => string;
}
export default function Cards({ data, columns, keyExtractor }: CardsProps) {
    const regularCols = columns.filter((col) => !col.fullWidth);
    const fullWidthCols = columns.filter((col) => col.fullWidth);

    return (
        <div className="flex flex-col gap-6 w-full">
            {data.map((item) => (
                <div key={keyExtractor(item)} className="border border-base-300 rounded-lg p-5 bg-base-100 flex flex-col gap-4 w-full">
                    <div className="flex flex-wrap gap-4">
                        {regularCols.map((col, idx) => (
                            <div key={idx} className="flex flex-col gap-1 min-w-[140px] flex-1">
                                <span className="text-xs font-bold text-base-content/50 uppercase">{col.title}</span>
                                <div className="text-sm text-neutral break-words">{col.body(item)}</div>
                            </div>
                        ))}
                    </div>

                    {fullWidthCols.length > 0 && (
                        <div className="flex flex-col gap-4">
                            {fullWidthCols.map((col, idx) => (
                                <div key={idx} className="flex flex-col gap-1 w-full">
                                    <span className="text-xs font-bold text-base-content/50 uppercase">{col.title}</span>
                                    <div className="text-sm text-neutral break-words">{col.body(item)}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
