import { AiOutlineUserAdd } from "react-icons/ai";
import { GiTakeMyMoney } from "react-icons/gi";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { SlHandbag } from "react-icons/sl";

import DashWidget from "../../../components/shared/Dashboard/DashWidget/DashWidget";
import LineChart from "../../../components/shared/Dashboard/LineChart/LineChart";
import RecentOrder from "../../../components/shared/Dashboard/RecentOrder/RecentOrders";
import RecentProduct from "../../../components/shared/Dashboard/RecentProduct/RecentProducts";
import RecentUsers from "../../../components/shared/Dashboard/RecentUsers/RecentUsers";

const Dashboard = () => {
    return (
        <>
            <div>
                {/* Dash Widget Card */}
                <section>
                    <div className="grid lg:grid-cols-4 gap-3 grid-cols-1 md:grid-cols-3">
                        <DashWidget
                            icon={<AiOutlineUserAdd />}
                            title={"Users"}
                            account={10}
                        />
                        <DashWidget
                            icon={<SlHandbag />}
                            title={"Orders"}
                            account={10}
                        />
                        <DashWidget
                            icon={<MdOutlineProductionQuantityLimits />}
                            title={"Products"}
                            account={10}
                        />
                        <DashWidget
                            icon={<GiTakeMyMoney />}
                            title={"Total Earnings"}
                            account={10}
                        />
                    </div>
                </section>

                {/* Recent Order And Product Table */}
                <section className="mt-10">
                    <div className="grid grid-cols-12 space-x-3 sm:grid-cols-1 md:grid-cols-1 sm:space-x-0 md:space-y-4 sm:space-y-4">
                        <div className="col-span-8">
                            <RecentOrder orders={[]} />
                        </div>
                        <div className="col-span-4">
                            <RecentProduct products={[]} />
                        </div>
                    </div>
                </section>

                {/* Recent Users And Line Chart */}
                <section className="mt-10 sm:mt-5">
                    <div className="grid grid-cols-12 space-x-3 sm:grid-cols-1 md:grid-cols-1 sm:space-x-0 sm:space-y-4 md:space-y-4">
                        <div className="col-span-6">
                            <LineChart
                                data={{ users: 1, orders: 1, products: 1 }}
                            />
                        </div>
                        <div className="col-span-6">
                            <RecentUsers users={[]} />
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Dashboard;
