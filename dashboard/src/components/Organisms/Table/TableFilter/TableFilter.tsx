import React from "react";

import cn from "../../../../utils/cn";
import Select from "../../../Atoms/Form/Select";
import LocalSearch from "../../../Molecules/LocalSearch/LocalSearch";
import Pagination from "../../../Molecules/Pagination/Pagination";


interface TableFilterProps {
    setLimit: (limit: number) => void;
    setSearchTerm: (value: string) => void;
    setPage: (page: number) => void;
    page: number;
    pages: number;
    className?: string | undefined;
}

const TableFilter: React.FC<TableFilterProps> = ({
    setLimit,
    setSearchTerm,
    setPage,
    page,
    pages,
    className,
}) => {

    return (
        <div className={cn("flex justify-between", className || "")}>
            <div className="flex space-x-3">
                <Select
                    className="py-2 px-4 w-20 bg-white text-primary font-medium rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center focus:ring-0"
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        setLimit(Number(e.target.value))
                    }
                >
                    {[5, 10, 15, 20, 25]?.map((pageSize: number) => (
                        <option key={pageSize} value={pageSize}>
                            {pageSize}
                        </option>
                    ))}
                </Select>
                <div>
                    <LocalSearch
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setSearchTerm(e.target.value)
                        }
                        placeholder="Search Anything"
                        className="text-gray-800"
                    />
                </div>
            </div>
            <div>
                {pages ? (
                    <Pagination pages={pages} page={page} setPage={setPage} />
                ) : (
                    ""
                )}
            </div>
        </div>
    );
};

export default TableFilter;
