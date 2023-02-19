import { FaUserGraduate } from "react-icons/fa";
import { SiProducthunt } from "react-icons/si";
import { MdOutlineVerified } from "react-icons/md";
import { VscUnverified } from "react-icons/vsc";
import Image from "next/image";

export const OrdersColumn = [
    {
        header: () => "Profile",
        cell: (info: any) => (
            <span>
                {info.getValue() ? (
                    <Image
                        width={100}
                        height={100}
                        src={info.getValue()}
                        alt="Apple Watch"
                        className="w-10 h-10 p-1 rounded-full ring-2 ring-green-300"
                    />
                ) : (
                    <FaUserGraduate className="w-10 h-10 p-1 rounded-full ring-2 ring-green-300" />
                )}
            </span>
        ),
        accessorKey: "orderedBy.image.url",
    },
    {
        header: () => "User Name",
        accessorKey: "orderedBy.fullName",
    },
    {
        header: () => "Shipping Address",
        cell: (info: any) => (
            <div>
                {info.getValue() && (
                    <>
                        <h2>Address: {info.getValue().address}</h2>
                        <h2>City: {info.getValue().city}</h2>
                        <h2>PostalCode:{info.getValue().postalCode}</h2>
                    </>
                )}
            </div>
        ),
        accessorKey: "orderedBy.address",
    },
    {
        header: () => "Products",
        cell: (info: any) => (
            <span>
                {info.getValue() ? (
                    <div className="flex">
                        {info.getValue().length > 0 &&
                            info.getValue().map((product: any) => (
                                <div key={product._id} className="relative">
                                    <Image
                                        width={100}
                                        height={100}
                                        src={
                                            product.product &&
                                            product.product?.images[0]?.url
                                        }
                                        alt="Product image"
                                        className="w-16 h-12 p-1 rounded-full ring-2 ring-green-300"
                                    />
                                    <span className="absolute px-2  bg-red-400 rounded-lg top-0 left-0 text-white flex items-center justify-center">
                                        {product.count}
                                    </span>
                                </div>
                            ))}
                    </div>
                ) : (
                    <SiProducthunt className="w-10 h-10 p-1 rounded-full ring-2 ring-green-300" />
                )}
            </span>
        ),
        accessorKey: "products",
    },
    {
        header: () => "Total",
        cell: (info: any) => `$${info.getValue() / 100}`,
        accessorKey: "paymentIntents.amount",
    },
    {
        header: () => "Payment",
        cell: (info: any) => (
            <span
                className={`text-lg ${
                    info.getValue() === "succeeded"
                        ? "text-green-500"
                        : "text-red-500"
                }`}
            >
                {info.getValue() === "succeeded" ? (
                    <MdOutlineVerified />
                ) : (
                    <VscUnverified />
                )}
            </span>
        ),
        accessorKey: "paymentIntents.status",
    },
    {
        header: () => "Status",
        cell: (info: any) => (
            <span
                className={`bg-gradient-to-br ${
                    info.getValue() === "Not Processed"
                        ? "from-red-500"
                        : info.getValue() === "Processing"
                        ? "from-blue-500"
                        : info.getValue() === "Dispatched"
                        ? "from-fuchsia-600"
                        : info.getValue() === "Cash On Delivery"
                        ? "from-green-500"
                        : info.getValue() === "Completed"
                        ? "from-green-700"
                        : info.getValue() === "Cancelled"
                        ? "from-red-300"
                        : ""
                }  to-voilet-500 px-3.6 text-xs rounded-1.8 py-2.5 px-4 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-white`}
            >
                {info.getValue()}
            </span>
        ),
        accessorKey: "orderStatus",
    },
];
