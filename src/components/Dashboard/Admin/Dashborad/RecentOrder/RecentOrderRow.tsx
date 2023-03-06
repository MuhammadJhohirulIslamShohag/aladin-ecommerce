import React from "react";
import { MdOutlineVerified } from "react-icons/md";
import { VscUnverified } from "react-icons/vsc";
import { CiViewList } from "react-icons/ci";

const RecentOrderRow = (props: any) => {
    const { orderedBy, paymentIntents, orderStatus } = props.order;
    
    return (
        <tr className="bg-white border-b hover:bg-gray-50 ">
            <td className="w-32 p-4">{orderedBy?.name}</td>
            <td className="px-6 py-4 font-semibold text-gray-900 ">
                ${paymentIntents.amount / 100}
            </td>

            <td className="px-6 py-4 font-semibold text-gray-900">
                <span
                    className={`text-lg ${
                        paymentIntents.status === "succeeded"
                            ? "text-green-500"
                            : "text-red-500"
                    }`}
                >
                    {paymentIntents.status === "succeeded" ? (
                        <MdOutlineVerified />
                    ) : (
                        <VscUnverified />
                    )}
                </span>
            </td>
            <td className="px-6 py-4 font-semibold text-gray-900 ">
                <span
                    className={`bg-gradient-to-br ${
                        orderStatus === "Not Processed"
                            ? "from-red-500"
                            : orderStatus === "Processing"
                            ? "from-blue-500"
                            : orderStatus === "Dispatched"
                            ? "from-fuchsia-600"
                            : orderStatus === "Cash On Delivery"
                            ? "from-green-500"
                            : orderStatus === "Completed"
                            ? "from-green-700"
                            : orderStatus === "Cancelled"
                            ? "from-red-300"
                            : ""
                    }  to-voilet-500 px-3.6 text-xs rounded-1.8 py-2.5 px-4 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-white`}
                >
                    {orderStatus}
                </span>
            </td>
            <td className="px-6 py-4 font-semibold text-gray-900 ">
                <span className="hover:text-green-500 transition-all cursor-pointer text-lg" >
                <CiViewList />
                </span>
               
            </td>
        </tr>
    );
};

export default RecentOrderRow;
