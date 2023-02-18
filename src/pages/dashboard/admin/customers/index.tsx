/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useStoreContext } from "@/lib/contexts/StoreContextProvider";
import { allUsers } from "@/api/admin";
import CustomerTable from "@/components/Dashboard/Admin/CustomerTable/CustomerTable";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";

const Customers = () => {
    const [fetching, setFetching] = useState(true);
    const [users, setUsers] = useState([]);
    const { state } = useStoreContext();
    const { user } = state;
    useEffect(() => {
        loadingAllUsers();
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
    return (
        <DashboardLayout>
            <div className="px-20 mt-5">
                <CustomerTable data={users} />
            </div>
        </DashboardLayout>
    );
};

export default Customers;
