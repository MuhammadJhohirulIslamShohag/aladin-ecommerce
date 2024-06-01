"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";

import useCheckUser from "@/hooks/useCheckUser";
import OrderCartInTable from "@/components/Oraganisms/Order/OrderCartInTable";
import OrderInvoiceDownload from "@/components/Oraganisms/Order/OrderInvoiceDownload";
import OrderPaymentInfo from "@/components/Oraganisms/Order/OrderPaymentInfo";
import OrderHistories from "@/components/Oraganisms/Skeletons/User/OrderHistory/OrderHistories";
import Empty from "@/components/Molecules/Empty";

import { useGetOrdersQuery } from "@/redux/services/order/orderApiService";
import { getUserInfo } from "@/store/user/users";
import { IOrder } from "@/types/order.types";

const History = () => {
    useCheckUser();
    const user = getUserInfo();

    const queryParams = new URLSearchParams({
        orderedBy: user?.user?._id,
        populate: "products.product,orderedBy",
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
                <div>
                    <PDFDownloadLink
                        document={<OrderInvoiceDownload order={order} />}
                        fileName="invoice.pdf"
                        className=" text-primary bg-transparent font-semibold hover:text-success  transition duration-200"
                        style={{ width: "100%" }}
                    >
                        DownLoad PDF
                    </PDFDownloadLink>
                </div>
            </div>
        );
    };

    let content = null;

    if (ordersData?.length) {
        content = ordersData?.map((order: IOrder) => (
            <div className="mx-5 my-3 p-3 card" key={order?._id}>
                <OrderPaymentInfo order={order} />
                <OrderCartInTable order={order} />
                {showDownloadLink(order)}
            </div>
        ));
    }

    if (!ordersData?.length) {
        content = <Empty description={`No Purchase Order`} />;
    }

    if (isLoading) {
        content = <OrderHistories />;
    }

    return <div>{content}</div>;
};

export default History;
