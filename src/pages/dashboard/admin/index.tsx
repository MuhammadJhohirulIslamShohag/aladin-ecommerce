/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Loader from "@/components/Loader/Loader";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import { AiOutlineUserAdd } from "react-icons/ai";
import { SlHandbag } from "react-icons/sl";
import { GiTakeMyMoney } from "react-icons/gi";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { useStoreContext } from "@/lib/contexts/StoreContextProvider";
import DashWidget from "@/components/Dashboard/Admin/Dashborad/DashWidget/DashWidget";
import { GetServerSideProps } from "next";
import { getProductsBySort } from "@/api/products";
import { allUsers, getOrders } from "@/api/admin";
import { IProduct } from "types/product.type";
import RecentOrder from "@/components/Dashboard/Admin/Dashborad/RecentOrder/RecentOrders";
import RecentProduct from "@/components/Dashboard/Admin/Dashborad/RecentProduct/RecentProducts";
import RecentUsers from "@/components/Dashboard/Admin/Dashborad/RecentUsers/RecentUsers";
import Geography from "@/components/Dashboard/Admin/Dashborad/Geography/Geography";

type DashboardPropType = {
    products: IProduct[];
};
export default function Dashboard({ products }: DashboardPropType) {
    const [fetching, setFetching] = useState(true);
    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState<any[]>([]);
    const { state } = useStoreContext();
    const { user } = state;

    useEffect(() => {
        loadingAllUsers();
        loadingOrders();
        setFetching(false);
    }, [user]);

    // loading all users
    const loadingAllUsers = async () => {
        try {
            setFetching(true);
            if (user !== null && user.token) {
                const data = await allUsers(user.token);
                setUsers(data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };
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
            {fetching ? (
                <Loader />
            ) : (
                <div>
                    {/* Dash Widget Card */}
                    <section>
                        <div className="grid grid-cols-4 gap-3 sm:grid-cols-1 md:grid-cols-3">
                            <DashWidget
                                icon={<AiOutlineUserAdd />}
                                title={"Users"}
                                account={users.length && users.length}
                            />
                            <DashWidget
                                icon={<SlHandbag />}
                                title={"Orders"}
                                account={orders.length && orders.length}
                            />
                            <DashWidget
                                icon={<MdOutlineProductionQuantityLimits />}
                                title={"Products"}
                                account={products?.length && products.length}
                            />
                            <DashWidget
                                icon={<GiTakeMyMoney />}
                                title={"Total Earnings"}
                                orders={orders}
                            />
                        </div>
                    </section>

                    {/* Recent Order And Product Table */}
                    <section className="mt-10">
                        <div className="grid grid-cols-12 space-x-3 sm:grid-cols-1 md:grid-cols-1 sm:space-x-0 md:space-y-4 sm:space-y-4">
                            <div className="col-span-8">
                                <RecentOrder orders={orders} />
                            </div>
                            <div className="col-span-4">
                                <RecentProduct products={products} />
                            </div>
                        </div>
                    </section>

                    {/* Recent Users And Geography */}
                    <section className="mt-10">
                        <div className="grid grid-cols-12 space-x-3 sm:grid-cols-1 md:grid-cols-1 sm:space-x-0 sm:space-y-4 md:space-y-4">
                            <div className="col-span-6">
                                <Geography />
                            </div>
                            <div className="col-span-6">
                                <RecentUsers users={users} />
                            </div>
                        </div>
                    </section>
                </div>
            )}
        </DashboardLayout>
    );
}

export const getServerSideProps: GetServerSideProps = async () => {
    const { data } = await getProductsBySort("createdAt", "desc");
    return {
        props: {
            products: data,
        },
    };
};
