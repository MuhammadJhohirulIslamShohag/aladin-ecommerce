"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";

import OrderInvoiceDownload from "@/components/Oraganisms/Order/OrderInvoiceDownload";
import OrderPaymentInfo from "@/components/Oraganisms/Order/OrderPaymentInfo";
import OrderCartInTable from "@/components/Oraganisms/Order/OrderCartInTable";

// import useCheckUser from "@/hooks/useCheckUser";
import { IOrder } from "@/types/order.types";
import { getUserInfo } from "@/store/user/users";
import { useGetOrdersQuery } from "@/redux/services/order/orderApiService";

const History = () => {
    const user = getUserInfo();

    const queryParams = new URLSearchParams({
        orderedBy: user?.user?._id,
    });

    // redux api call
    const { data, isLoading } = useGetOrdersQuery({
        queryParams: queryParams.toString(),
    });
    const ordersData = data?.data;

    // show invoice download
    const showDownloadLink = (order: IOrder) => {
        return (
            <div className="mt-2">
                <div className="">
                    <PDFDownloadLink
                        document={<OrderInvoiceDownload order={order} />}
                        fileName="invoice.pdf"
                        className="btn btn-sm btn-block btn-outline-info text-gray-900 hover:text-white"
                        style={{ width: "100%" }}
                    >
                        DownLoad PDF
                    </PDFDownloadLink>
                </div>
            </div>
        );
    };
    return (
        <>
            <div>
                {isLoading ? (
                    <h4 className="text-center">Loading...</h4>
                ) : (
                    <>
                        <h4 className="text-center text-lg text-green-400 mt-2 mb-0">
                            {ordersData && ordersData.length > 0
                                ? "User Purchase Order"
                                : "No Purchase Order"}
                        </h4>
                        <hr />
                        {ordersData &&
                            ordersData?.length > 0 &&
                            ordersData?.reverse().map((order: IOrder) => (
                                <div
                                    className="mx-5 my-3 p-3 card"
                                    key={order?._id}
                                >
                                    <OrderPaymentInfo order={order} />
                                    <OrderCartInTable order={order} />
                                    {showDownloadLink(order)}
                                </div>
                            ))}
                    </>
                )}
            </div>
        </>
    );
};

export default History;
