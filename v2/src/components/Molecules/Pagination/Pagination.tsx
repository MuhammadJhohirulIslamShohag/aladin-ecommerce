"use client"

import Button from "../../Atoms/Button/Button";

interface PaginationProps {
    pages: number;
    page: number;
    setPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ pages, page, setPage }) => {
    const visiblePageRange: number = 5;
    const halfVisibleRange: number = Math.floor(visiblePageRange / 2);
    const startIndex: number = Math.max(page - halfVisibleRange, 0);
    const endIndex: number = Math.min(page + halfVisibleRange, pages + 1);

    return (
        <div className="flex flex-col lg:flex-row justify-between">
            <nav className="flex justify-center items-center text-primary mt-8 lg:mt-0">
                <Button
                    label={
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
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
                    }
                    disabled={page === 1}
                    onClick={() => setPage(startIndex + 1)}
                    className="p-2 mr-4 inline-block hover:bg-green-300 bg-white/80 hover:text-white rounded-full cursor-pointer transition-all"
                />

                <div className="flex items-center gap-3">
                    {Array.from({ length: pages }, (_, number: number) => {
                        if (
                            number + 1 >= startIndex &&
                            number + 1 <= endIndex
                        ) {
                            return (
                                <button
                                    key={number}
                                    className={`rounded-full cursor-pointer px-4 py-2 hover:bg-green-400 hover:text-white transition-all ${
                                        page === number + 1
                                            ? " bg-green-300 text-white"
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

                <Button
                    label={
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
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
                    }
                    className="p-2 ml-4 rounded-full transition-all cursor-pointer inline-block hover:bg-green-300 bg-white/80 hover:text-white"
                    disabled={pages === page}
                    onClick={() => setPage(endIndex - 1)}
                />
            </nav>
        </div>
    );
};

export default Pagination;
