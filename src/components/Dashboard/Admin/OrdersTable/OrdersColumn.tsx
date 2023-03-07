import Image from "next/image";
import { FaUserGraduate, FaProductHunt } from "react-icons/fa";
import { MdOutlineVerified } from "react-icons/md";
import { SiProducthunt } from "react-icons/si";
import { VscUnverified } from "react-icons/vsc";

export const OrdersColumn = [
    {
        header: () => "Profile",
        id: "profile",
        cell: (info: any) => (
            <span className="min-w-max flex">
                {info.getValue()?.image && info.getValue()?.image?.url ? (
                    <Image
                        width={100}
                        height={100}
                        src={info.getValue().image.url}
                        alt="Apple Watch"
                        className="w-10 h-10 p-1 rounded-full ring-2 ring-green-300"
                    />
                ) : (
                    <FaUserGraduate className="w-10 h-10 p-1 rounded-full ring-2 ring-green-300" />
                )}
            </span>
        ),
        accessorKey: "orderedBy",
    },
    {
        header: () => "User Name",
        id: "userName",
        cell: (info: any) => (
            <span className="min-w-max flex">
                {info.getValue() ? info.getValue()?.fullName : "Null"}
            </span>
        ),
        accessorKey: "orderedBy",
    },
    {
        header: () => "User Email",
        id: "userEmail",
        cell: (info: any) => (
            <span className="min-w-max flex">
                {info.getValue() ? info.getValue()?.email : "Null"}
            </span>
        ),
        accessorKey: "orderedBy",
    },
    {
        header: () => "Shipping Address",
        id: "shippingAddress",
        cell: (info: any) => (
            <div>
                {info.getValue() ? (
                    <>
                        <h2>Address: {info.getValue()?.address?.address}</h2>
                        <h2>City: {info.getValue()?.address?.city}</h2>
                        <h2>
                            PostalCode:{info.getValue()?.address?.postalCode}
                        </h2>
                    </>
                ) : (
                    "Null"
                )}
            </div>
        ),
        accessorKey: "orderedBy",
    },
    {
        header: () => "Products",
        cell: (info: any) => (
            <span className="min-w-max flex">
                {info.getValue() ? (
                    <div className="flex">
                        {info.getValue()?.length > 0 &&
                            info.getValue().map((product: any) => (
                                <div key={product._id} className="relative">
                                    {product?.product &&
                                    product.product?.images[0]?.url ? (
                                        <Image
                                            width={100}
                                            height={100}
                                            src={product.product.images[0].url}
                                            alt="Product image"
                                            className="w-16 h-12 p-1 rounded-full ring-2 ring-green-300"
                                        />
                                    ) : (
                                        <FaProductHunt className="w-10 h-10 p-1 rounded-full ring-2 ring-green-300" />
                                    )}

                                    <span className="absolute px-2  bg-red-400 rounded-lg top-0 left-0 text-white flex items-center justify-center">
                                        {product?.count}
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
        id: "total",
        cell: (info: any) => (
            <span className="min-w-max flex">
                {`$${info.getValue()?.amount / 100}`}
            </span>
        ),
        accessorKey: "paymentIntents",
    },
    {
        header: () => "Payment",
        id: "Payment",
        cell: (info: any) => (
            <span
                className={`text-lg min-w-max flex ${
                    info.getValue()?.status === "succeeded"
                        ? "text-green-500"
                        : "text-red-500"
                }`}
            >
                {info.getValue()?.status === "succeeded" ? (
                    <MdOutlineVerified />
                ) : (
                    <VscUnverified />
                )}
            </span>
        ),
        accessorKey: "paymentIntents",
    },
    {
        header: () => "Status",
        cell: (info: any) => (
            <span
                className={`min-w-max flex bg-gradient-to-br ${
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
