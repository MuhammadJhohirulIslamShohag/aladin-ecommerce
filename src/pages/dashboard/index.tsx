import Loader from "@/components/Loader/Loader";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import { useStoreContext } from "@/lib/contexts/StoreContextProvider";
import React, { useState, useEffect } from "react";

const Dashboard = () => {
    const { state } = useStoreContext();
    const { user } = state;
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setFetching(false);
        }, 800);
    }, [fetching]);

    return (
        <DashboardLayout>
            {fetching ? (
                <Loader />
            ) : (
                <section className="container h-screen flex justify-center py-10">
                    <div className="text-center italic text-primary text-5xl sm:text-2xl md:text-3xl space-y-4 sm:space-y-2 md:space-y-2">
                        <h2>Welcome To The</h2>
                        <h2>Admin</h2>
                        <h2>DashBoard</h2>
                    </div>
                </section>
            )}
        </DashboardLayout>
    );
};

export default Dashboard;
