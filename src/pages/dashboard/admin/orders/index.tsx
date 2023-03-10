/* eslint-disable react-hooks/exhaustive-deps */
import { getOrders } from "@/api/admin";
import OrdersTable from "@/components/Dashboard/Admin/OrdersTable/OrdersTable";
import useCheckAdmin from "@/hooks/useCheckAdmin";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import { useStoreContext } from "@/lib/contexts/StoreContextProvider";
import HeadSeo from "@/lib/seo/HeadSeo/HeadSeo";
import { useEffect, useState } from "react";
import { IOrder } from "types/order.types";

const Orders = () => {
    useCheckAdmin();
    const [fetching, setFetching] = useState(true);
    const [orders, setOrders] = useState([]);
    const { state } = useStoreContext();
    const { user } = state;
    useEffect(() => {
        loadingOrders();
        setFetching(false);
    }, [user]);

    // loading all orders
    const loadingOrders = async () => {
        try {
            setFetching(true);
            if (user !== null && user.token) {
                const data = await getOrders(user.token);
                setOrders(data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <HeadSeo
                title="Orders"
                content="Aladin Industries Ltd. Providing reliable products since 2022"
            />
            <DashboardLayout>
                <div>
                    <OrdersTable data={orders} />
                </div>
            </DashboardLayout>
        </>
    );
};

export default Orders;
