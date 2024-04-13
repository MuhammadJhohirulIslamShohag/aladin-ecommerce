import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

import Button from "../../../components/Atoms/Button/Button";
import Table from "../../../components/Molecules/Table/Table";
import TableFilter from "../../../components/Organisms/Table/TableFilter/TableFilter";
import useDebounce from "../../../hooks/useDebounce";

import {
    useGetProductsQuery,
    useRemovedProductMutation,
} from "../../../redux/services/product/productApi";

const ProductPage = () => {
    // state
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(5);
    const [searchTerm, setSearchTerm] = useState<string>("");

    const debouncedValue = useDebounce({ searchQuery: searchTerm, delay: 600 });

    // search query parameter
    const queryParams = new URLSearchParams({
        page: JSON.stringify(page),
        limit: JSON.stringify(limit),
        searchTerm: debouncedValue,
    });

    // redux api call
    const { data, isError, isLoading } = useGetProductsQuery(
        queryParams.toString()
    );
    const [removedProduct] = useRemovedProductMutation();

    const handleRemoveProduct = (id: string) => {
        removedProduct(id);
    };

    const handleEditProduct = (id: string) => {
        console.log(id);
    };

    return (
        <div>
            <div className="mt-10 mb-7 flex justify-between">
                <h6 className="text-white text-4xl font-bold mb-2">
                    All Products
                </h6>
            </div>

            <div>
                <TableFilter
                    page={page}
                    setPage={setPage}
                    setLimit={setLimit}
                    setSearchTerm={setSearchTerm}
                    pages={data?.meta?.totalPage}
                    className={"mb-3"}
                />
            </div>

            <div className="relative flex flex-col w-full min-w-0 mb-0 break-words bg-white border-0 border-transparent border-solid shadow-md bg-clip-border rounded-md">
                <Table
                    isLoading={isLoading}
                    isError={isError}
                    tableData={data?.data}
                    checkbox={true}
                    handleSelectedRowItem={() => console.log()}
                    columns={[
                        {
                            name: "Image",
                            dataIndex: "_id",
                            render: ({ item }) => (
                                <div className="flex">
                                    {item?.imageURLs?.length
                                        ? item?.imageURLs?.map(
                                              (img: string, idx: number) => (
                                                  <img
                                                      key={idx}
                                                      className="h-10 w-10 rounded-full"
                                                      src={img}
                                                      alt={"product Image"}
                                                  />
                                              )
                                          )
                                        : ""}
                                </div>
                            ),
                        },
                        {
                            name: "Name",
                            dataIndex: "name",
                            key: "_id",
                        },
                        {
                            name: "Description",
                            dataIndex: "description",
                            key: "_id",
                        },
                        {
                            name: "Price",
                            dataIndex: "price",
                            key: "_id",
                        },
                        {
                            name: "Quantity",
                            dataIndex: "quantity",
                            key: "_id",
                        },
                        {
                            name: "Sold",
                            dataIndex: "sold",
                            key: "_id",
                        },
                        {
                            name: "Discount",
                            dataIndex: "discount",
                            key: "_id",
                        },
                        {
                            name: "Category",
                            dataIndex: "category",
                            dataIndex2: "name",
                            key: "_id",
                        },
                        {
                            name: "Brand",
                            dataIndex: "brand",
                            dataIndex2: "name",
                            key: "_id",
                        },
                        {
                            name: "IsFeatured",
                            dataIndex: "isFeatured",
                            render: ({ item }) => (
                                <Button
                                    className={`text-white ${
                                        item.isFeatured
                                            ? "hover:shadow-green-500/40 bg-green-500 shadow-green-500/20 "
                                            : "hover:shadow-red-500/40 bg-red-500 shadow-red-500/20 "
                                    } `}
                                    label={item.isFeatured ? "Yes" : "No"}
                                />
                            ),
                        },
                        {
                            name: "Status",
                            dataIndex: "status",
                            render: ({ item }) => (
                                <Button
                                    className={`text-white ${
                                        item.status
                                            ? "hover:shadow-green-500/40 bg-green-500 shadow-green-500/20 "
                                            : "hover:shadow-red-500/40 bg-red-500 shadow-red-500/20 "
                                    } `}
                                    label={item.status}
                                />
                            ),
                        },
                        {
                            name: "Actions",
                            dataIndex: "actions",
                            render: ({ item }) => (
                                <div className="flex space-x-2">
                                    <Button
                                        className={`text-white hover:shadow-blue-500/40 bg-blue-500 shadow-blue-500/20`}
                                        label={<FaEdit />}
                                        onClick={() =>
                                            handleEditProduct(item._id)
                                        }
                                    />
                                    <Button
                                        className={`text-white hover:shadow-red-500/40 bg-red-500 shadow-red-500/20`}
                                        label={<FaTrash />}
                                        onClick={() =>
                                            handleRemoveProduct(item._id)
                                        }
                                    />
                                </div>
                            ),
                        },
                    ]}
                />
            </div>
        </div>
    );
};

export default ProductPage;
