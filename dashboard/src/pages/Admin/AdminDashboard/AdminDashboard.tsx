import { AiOutlineUserAdd } from "react-icons/ai";
import { GiTakeMyMoney } from "react-icons/gi";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { SlHandbag } from "react-icons/sl";

import DashWidget from "../../../components/shared/Dashboard/DashWidget/DashWidget";
import LineChart from "../../../components/shared/Dashboard/LineChart/LineChart";
import RecentOrder from "../../../components/shared/Dashboard/RecentOrder/RecentOrders";
import RecentProduct from "../../../components/shared/Dashboard/RecentProduct/RecentProducts";
import RecentUsers from "../../../components/shared/Dashboard/RecentUsers/RecentUsers";

import { useGetDashWidgetInfosQuery } from "../../../redux/services/dashboard/dashboardApi";

const AdminDashboard = () => {
    const { data: dashWidgetInfosData } = useGetDashWidgetInfosQuery({});
    const dashWidgetInfos = dashWidgetInfosData?.data;

    return (
        <>
            <div>
                {/* Dash Widget Card */}
                <section>
                    <div className="grid lg:grid-cols-4 gap-3 grid-cols-1 md:grid-cols-3">
                        <DashWidget
                            icon={<AiOutlineUserAdd />}
                            title={"Users"}
                            account={dashWidgetInfos?.users?.total}
                        />
                        <DashWidget
                            icon={<SlHandbag />}
                            title={"Orders"}
                            account={dashWidgetInfos?.orders?.total}
                        />
                        <DashWidget
                            icon={<MdOutlineProductionQuantityLimits />}
                            title={"Products"}
                            account={dashWidgetInfos?.products?.total}
                        />
                        <DashWidget
                            icon={<GiTakeMyMoney />}
                            title={"Total Earnings"}
                            account={dashWidgetInfos?.orders?.totalEarnings}
                        />
                    </div>
                </section>

                {/* Recent Order And Product Table */}
                <section className="mt-10">
                    <div className="grid lg:grid-cols-12 grid-cols-1 md:grid-cols-1 gap-3">
                        <div className="col-span-8">
                            <RecentOrder
                                orders={dashWidgetInfos?.orders?.orders || []}
                            />
                        </div>
                        <div className="col-span-4">
                            <RecentProduct
                                products={dashWidgetInfos?.products?.products || []}
                            />
                        </div>
                    </div>
                </section>

                {/* Recent Users And Line Chart */}
                <section className="mt-10 sm:mt-5">
                    <div className="grid lg:grid-cols-12 grid-cols-1 gap-3">
                        <div className="col-span-6">
                            <LineChart
                                data={{
                                    users: dashWidgetInfos?.users?.total,
                                    orders: dashWidgetInfos?.orders?.total,
                                    products: dashWidgetInfos?.products?.total,
                                }}
                            />
                        </div>
                        <div className="col-span-6  mt-6">
                            <RecentUsers
                                users={dashWidgetInfos?.users?.users || []}
                            />
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default AdminDashboard;
