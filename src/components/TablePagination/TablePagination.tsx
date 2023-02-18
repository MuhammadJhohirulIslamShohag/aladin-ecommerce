import { Table } from "@tanstack/react-table";
import React from "react";

const TablePagination = ({ table }: { table: Table<any> }) => {
    return (
        <div className="flex items-center justify-between pt-2 px-4 pb-5">
            <select
                value={table.getState().pagination.pageSize}
                onChange={(e) => {
                    table.setPageSize(Number(e.target.value));
                }}
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-32 p-2 text-black font-semibold mt-1"
            >
                {[10, 20, 30, 40, 50].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                        Show {pageSize}
                    </option>
                ))}
            </select>

            <div className="mt-2 xs:mt-0 flex space-x-5">
                <h2 className="text-md text-gray-700 mt-1">
                    Page{" "}
                    <span className="font-semibold text-gray-900">
                        {table.getState().pagination.pageIndex + 1} of{" "}
                        {table.getPageCount()}
                    </span>
                </h2>
                <div className="space-x-2">
                    <button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="inline-flex items-center px-4 py-1 text-sm font-medium text-black rounded-l hover:bg-black border-2 border-black hover:text-white transition-all disabled:cursor-not-allowed  cursor-pointer"
                    >
                        Prev
                    </button>
                    <button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        type="button"
                        className="inline-flex items-center px-4 py-1 text-sm font-medium text-black rounded-l hover:bg-black border-2 border-black hover:text-white transition-all disabled:cursor-not-allowed  cursor-pointer"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TablePagination;
