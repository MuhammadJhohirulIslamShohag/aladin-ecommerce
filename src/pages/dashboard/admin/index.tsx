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

type DashboardPropType = {
    products: IProduct[];
};
export default function Dashboard({ products }: DashboardPropType){
    const [fetching, setFetching] = useState(true);
    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState<any[]>([]);
    const [totalEarning, setTotalEarning] = useState(0);
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
                const data  = await allUsers(user.token);
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
                const data  = await getOrders(user.token);
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
                <div className="container h-screen py-10">
                    {/* Dash Widget Card */}
                    <section>
                        <div className="grid grid-cols-4 gap-3">
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
                                account={
                                    products?.length && products.length
                                }
                            />
                            <DashWidget
                                icon={<GiTakeMyMoney />}
                                title={"Total Earnings"}
                                orders={orders}
                            />
                        </div>
                        
                    </section>
                </div>
            )}

        </DashboardLayout>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    const { data } = await getProductsBySort("createdAt", "desc");
    return {
        props: {
            products: data,
        },
    };
};



