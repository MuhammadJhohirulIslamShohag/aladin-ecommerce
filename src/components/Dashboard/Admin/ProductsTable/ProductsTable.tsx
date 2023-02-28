import React,{useState} from "react";
import {
    useReactTable,
    ColumnDef,
    flexRender,
    getCoreRowModel,
} from "@tanstack/react-table";
import TablePagination from "@/components/TablePagination/TablePagination";
import { IProduct } from "types/product.type";
// import { ProductColumn } from "./ProductColumn";
// test
import { SiProducthunt } from "react-icons/si";
import Image from "next/image";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { useRouter } from "next/router";
import { useStoreContext } from "@/lib/contexts/StoreContextProvider";
import toast from "react-hot-toast";
import { deleteProduct } from "@/api/products";

const ProductsTable = ({ data, refreshData }: { data: IProduct[], refreshData:any }) => {
    const [loading, setLoading] = useState(false);
    const {
        state: { user },
    } = useStoreContext();
    const router = useRouter();

    const handleRemoveProduct = (slug:string) => {
        console.log(slug)
        if (user && user.token) {
            setLoading(true);
            deleteProduct(user.token, slug)
                .then((res) => {
                    toast.error(`${res.data.title} product is deleted!`);
                    refreshData();
                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                    setLoading(false);
                });
        }
    };
    const ProductColumn = [
        {
            header: () => "Image",
            cell: (info: any) => (
                <span>
                    {info.getValue() ? (
                        <>
                            {info.getValue().length > 0 &&
                                info
                                    .getValue()
                                    .map((img: any) => (
                                        <Image
                                            key={img.public_id}
                                            width={100}
                                            height={100}
                                            src={img.url && img.url}
                                            alt="Product image"
                                            className="w-18 h-16 p-1 rounded-full ring-2 ring-green-300"
                                        />
                                    ))}
                        </>
                    ) : (
                        <SiProducthunt className="w-18 h-16 p-1 rounded-full ring-2 ring-green-300" />
                    )}
                </span>
            ),
            accessorKey: "images",
        },
        {
            header: () => "Product",
            accessorKey: "title",
        },
        {
            header: () => "Price",
            accessorKey: "price",
        },
        {
            header: () => "Category",
            accessorKey: "category.name",
        },
        {
            header: () => "Brand",
            accessorKey: "brand?.name",
        },
        {
            header: () => "Quantity",
            accessorKey: "quantity",
        },
        {
            header: () => "Shipping",
            accessorKey: "shipping",
        },
        {
            Header: "Actions",
            accessorKey: "slug",
            cell: (info: any) => {
                const slug = info.getValue();
                return (
                    <div className="flex space-x-2">
                        <h2 onClick={() => handleRemoveProduct(slug)}>
                            <MdDeleteOutline className="text-red-500 text-xl hover:text-red-700 transition-all cursor-pointer" />
                        </h2>
                        <label
                            htmlFor="my-custom-modal"
                            onClick={() => router.push(`/dashboard/admin/products/${slug}`)}
                        >
                            <AiOutlineEdit className="text-green-400 text-lg  hover:text-green-700 transition-all cursor-pointer" />
                        </label>
                    </div>
                );
            },
        },
    ];
    const columns = React.useMemo<ColumnDef<IProduct>[]>(
        () => ProductColumn,
        []
    );



    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });
    return (
        <div className="relative flex flex-col w-full min-w-0 mb-0 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl shadow-md bg-clip-border">
            <div className="flex justify-between px-4 py-3">
                <div>
                    <h6 className="text-gray-900 text-lg font-bold">
                        All Products
                    </h6>
                </div>
                <div className="text-gray-500 text-sm font-bold hover:text-green-500 transition-all cursor-pointer">
                    View All
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
            <div>
                <TablePagination table={table} />
            </div>
        </div>
    );
};

export default ProductsTable;
