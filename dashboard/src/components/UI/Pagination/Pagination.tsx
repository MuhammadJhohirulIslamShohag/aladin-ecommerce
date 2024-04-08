interface PaginationProps {
    setEntries: (entries: number) => void;
    pages: number;
    page: number;
    setPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    setEntries,
    pages,
    page,
    setPage,
}) => {
    const visiblePageRange: number = 5;
    const halfVisibleRange: number = Math.floor(visiblePageRange / 2);
    const startIndex: number = Math.max(page - halfVisibleRange, 0);
    const endIndex: number = Math.min(page + halfVisibleRange, pages + 1);

    return (
        <div className="flex flex-col lg:flex-row justify-between mt-5 px-4">
            <div className="flex flex-col lg:flex-row items-center space-x-2 text-base">
                <select
                    name="selectOptions"
                    className="py-2 px-4 w-20 bg-white text-primary font-medium rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center focus:ring-0"
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        setEntries(Number(e.target.value))
                    }
                >
                    {[5, 10, 15, 20, 25]?.map((pageSize: number) => (
                        <option key={pageSize} value={pageSize}>
                            {pageSize}
                        </option>
                    ))}
                </select>
            </div>
            <nav className="flex justify-center items-center text-primary mt-8 lg:mt-0">
                <button
                    disabled={page === 1}
                    onClick={() => setPage(startIndex + 1)}
                    className="p-2 mr-4 rounded inline-block hover:bg-gray-100"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                </button>

                <div className="flex items-center gap-3">
                    {Array.from({ length: pages }, (_, number: number) => {
                        if (
                            number + 1 >= startIndex &&
                            number + 1 <= endIndex
                        ) {
                            return (
                                <button
                                    key={number}
                                    className={`px-4 py-2 rounded hover:bg-gray-100 ${
                                        page === number + 1
                                            ? " bg-gray-100"
                                            : ""
                                    }`}
                                    onClick={() => setPage(number + 1)}
                                >
                                    {number + 1}
                                </button>
                            );
                        } else if (
                            number + 1 === startIndex - 1 ||
                            number + 1 === endIndex + 1
                        ) {
                            return <span key={number}>...</span>; // Break label
                        }
                        return null;
                    })}
                </div>

                <button
                    disabled={pages === page}
                    onClick={() => setPage(endIndex - 1)}
                    className="p-2 ml-4 rounded inline-block hover:bg-gray-100"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </button>
            </nav>
        </div>
    );
};

export default Pagination;
