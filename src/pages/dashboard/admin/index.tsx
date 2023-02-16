import React, { useState, useEffect } from "react";
import Loader from "@/components/Loader/Loader";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import { useStoreContext } from "@/lib/contexts/StoreContextProvider";

const Dashboard = () => {
    const { state } = useStoreContext();
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
                <div className="container h-screen py-10">
                    <section>
                        <div className="grid grid-cols-4">
                            <div className="bg-white shadow-lg shadow-gray-200 rounded-2xl p-4">
                                <div className="flex items-center">
                                    <div className="inline-flex flex-shrink-0 justify-center items-center w-12 h-12 text-white bg-gradient-to-br from-pink-500 to-voilet-500 rounded-lg">
                                        <svg
                                            className="w-8 h-8"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                                                clip-rule="evenodd"
                                            ></path>
                                        </svg>
                                    </div>
                                    <div className="flex-shrink-0 ml-3">
                                        <span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl">
                                            $3,600
                                        </span>
                                        <h3 className="text-base font-normal text-gray-500">
                                            Today's Money
                                        </h3>
                                    </div>
                                    <div className="flex flex-1 justify-end items-center ml-5 w-0 text-base font-bold text-green-500">
                                        +16%
                                        <svg
                                            className="w-5 h-5"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                                                clip-rule="evenodd"
                                            ></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            )}
        </DashboardLayout>
    );
};

export default Dashboard;
