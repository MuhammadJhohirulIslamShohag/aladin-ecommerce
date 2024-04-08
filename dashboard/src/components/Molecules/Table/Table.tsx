/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Pagination from "../../UI/Pagination/Pagination";
import CheckBox from "../../Atoms/Form/CheckBox";

interface Column {
    name: string;
    dataIndex: string;
    dataIndex2?: string;
    key?: string;
    render?: (props: { item: any }) => React.ReactNode;
}

interface TableProps {
    tableData: any[];
    handleSelectedRowItem?: () => void;
    error?: any;
    isError?: boolean;
    columns: Column[];
    isLoading: boolean;
    pagination?: boolean;
    checkbox?: boolean;
    pages?: number;
    page?: number;
    setPage?: (page: number) => void;
}

const Table: React.FC<TableProps> = ({
    tableData,
    handleSelectedRowItem,
    isError,
    columns,
    isLoading,
    pagination = false,
    checkbox = false,
    pages,
    page,
    setPage,
}) => {
    const [data, setData] = useState<any[]>([]);
    const [selectAll, setSelectAll] = useState<boolean>(false);
    const [sortConfig, setSortConfig] = useState<{
        key: string | null;
        direction: string;
    }>({
        key: null,
        direction: "asc",
    });
    const [selectedRow, setSelectedRow] = useState<any[]>([]);
    const [entries, setEntries] = useState<number>(10);
    const [sortedData, setSortedData] = useState<any[]>([]);

    useEffect(() => {
        if (tableData) {
            const newData = tableData?.map((item, index) => {
                return { ...item, key: index };
            });
            setData(newData);
            setSortedData([...newData]);
        }
    }, [tableData]);

    useEffect(() => {
        const newSortedData = [...data].sort((a, b) => {
            if (sortConfig.direction === "asc") {
                return a[sortConfig.key!] > b[sortConfig.key!] ? 1 : -1;
            } else {
                return a[sortConfig.key!] < b[sortConfig.key!] ? 1 : -1;
            }
        });
        setSortedData(newSortedData);
    }, [data, sortConfig]);

    useEffect(() => {
        if (handleSelectedRowItem) {
            handleSelectedRowItem();
        }
    }, [selectedRow, handleSelectedRowItem]);

    if (isLoading) {
        return <h2>Loading....</h2>;
    }

    if (isError) {
        return <div>Something went wrong</div>;
    }

    const handleSort = (key: string) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

    const handleSelectedAll = () => {
        setSelectAll(!selectAll);
        if (selectAll) {
            setSelectedRow([]);
            return;
        }
        setSelectedRow(sortedData);
    };

    const handleSelectedRow = (row: any) => {
        const isExit = selectedRow.find((item) => item.key === row.key);
        if (isExit) {
            setSelectedRow((prevSelectedRow) =>
                prevSelectedRow.filter((item) => item?.key !== row?.key)
            );
            return;
        }
        setSelectedRow((prevSelectedRow) => [...prevSelectedRow, row]);
    };

    return (
        <>
            <div className="relative overflow-x-auto rounded-lg scrollbar-thin scrollbar-thumb-gray-300  scrollbar-track-gray-100">
                <table className="w-full text-sm text-left text-gray-500 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr className="text-sm">
                            {checkbox && (
                                <th className="p-3 text-center justify-center">
                                    <div className="flex items-center justify-center">
                                        <CheckBox
                                            checked={selectAll}
                                            onChange={handleSelectedAll}
                                        />
                                    </div>
                                </th>
                            )}

                            {columns?.map((column, index) => (
                                <th
                                    key={index}
                                    onClick={() => handleSort(column.dataIndex)}
                                    className={`cursor-pointer p-3 text-left whitespace-nowrap`}
                                >
                                    <div className="flex items-center justify-start gap-1 text-primary capitalize font-medium">
                                        <span className="relative text-[13px] font-medium">
                                            {column?.name}
                                        </span>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="">
                        {sortedData?.slice(0, entries)?.map((item, idx) => (
                            <tr
                                key={idx}
                                className={`text-gray-600 ${
                                    idx === sortedData?.length - 1 ? "" : ""
                                }`}
                            >
                                {checkbox && (
                                    <td className="px-4 py-3 border-t border-t-success/20 ">
                                        <CheckBox
                                            checked={selectedRow?.find(
                                                (row) =>
                                                    row?.key === item?.key ||
                                                    false
                                            )}
                                            onChange={() =>
                                                handleSelectedRow(item)
                                            }
                                        />
                                    </td>
                                )}

                                {columns?.map((column, index) => (
                                    <td
                                        key={index}
                                        className={`px-3 py-2.5 border-t border-t-success/20 whitespace-normal align-middle`}
                                    >
                                        <span className="text-nowrap">
                                            {column.render ? (
                                                <>{column.render({ item })}</>
                                            ) : column?.dataIndex2 ? (
                                                item[column?.dataIndex]?.[
                                                    column?.dataIndex2
                                                ] ? (
                                                    item[column?.dataIndex]?.[
                                                        column?.dataIndex2
                                                    ]
                                                ) : (
                                                    "N/A"
                                                )
                                            ) : item[column?.dataIndex] ? (
                                                item[column?.dataIndex]
                                            ) : (
                                                "N/A"
                                            )}
                                        </span>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {pagination && pages && page && setPage ? (
                <div>
                    <Pagination
                        setEntries={setEntries}
                        pages={pages}
                        page={page}
                        setPage={setPage}
                    />
                </div>
            ) : (
                ""
            )}
        </>
    );
};

export default Table;
