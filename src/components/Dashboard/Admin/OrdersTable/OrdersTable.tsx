import React from "react";
import {
    getPaginationRowModel,
    useReactTable,
    ColumnDef,
    flexRender,
    getCoreRowModel,
} from "@tanstack/react-table";
import TablePagination from "@/components/TablePagination/TablePagination";
import { IOrder } from "types/order.types";
import { OrdersColumn } from "./OrdersColumn";

const OrdersTable = ({ data }: { data: IOrder[] }) => {
    console.log(data, "data");

    const columns = React.useMemo<ColumnDef<IOrder>[]>(() => OrdersColumn, []);
    const table = useReactTable({
        data,
        columns,
        getPaginationRowModel: getPaginationRowModel(),
        getCoreRowModel: getCoreRowModel(),
    });
    return (
        <div className="relative flex flex-col w-full min-w-0 mb-0 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl shadow-md bg-clip-border">
            <div className="flex justify-between px-4 py-3">
                <div>
                    <h6 className="text-gray-900 text-lg font-bold">
                        All Orders
                    </h6>
                </div>
                <div>
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
                </div>
            </div>
            <div className="relative overflow-x-auto sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <th
                                            key={header.id}
                                            colSpan={header.colSpan}
                                            className="px-6 py-3"
                                        >
                                            {header.isPlaceholder ? null : (
                                                <div>
                                                    {flexRender(
                                                        header.column.columnDef
                                                            .header,
                                                        header.getContext()
                                                    )}
                                                </div>
                                            )}
                                        </th>
                                    );
                                })}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row) => {
                            return (
                                <tr
                                    key={row.id}
                                    className="bg-white border-b hover:bg-gray-50 "
                                >
                                    {row.getVisibleCells().map((cell) => {
                                        return (
                                            <td
                                                className="px-6 py-4 font-semibold text-gray-900 "
                                                key={cell.id}
                                            >
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            {/* Pagination table page bottom */}
            <div>
                <TablePagination table={table} />
            </div>
        </div>
    );
};

export default OrdersTable;
