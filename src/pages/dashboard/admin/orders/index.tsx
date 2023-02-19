/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useStoreContext } from "@/lib/contexts/StoreContextProvider";
import { getOrders } from "@/api/admin";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import OrdersTable from "@/components/Dashboard/Admin/OrdersTable/OrdersTable";
import { IOrder } from "types/order.types";

const Orders = () => {
    const [fetching, setFetching] = useState(true);
    const [orders, setOrders] = useState<IOrder[]>([]);
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
        <DashboardLayout>
            <div className="px-20 mt-5">
                <OrdersTable data={orders} />
            </div>
        </DashboardLayout>
    );
};

export default Orders;
