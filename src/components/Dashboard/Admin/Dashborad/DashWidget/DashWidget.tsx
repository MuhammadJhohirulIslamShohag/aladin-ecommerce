import React from "react";
import CountUp from "react-countup";
import { DashWidgetTypes } from "./DashWidget.types";

const DashWidget = (props: DashWidgetTypes) => {
    const { icon, title, account, orders } = props;

    const totalEarings = () => {
        // total earings calculation
        if (orders !== undefined && orders.length > 0) {
            let totalAmount = 0;
            for (let order of orders) {
                if (order.products.length) {
                    for (let product of order.products) {
                        totalAmount += product?.count * product.product?.price;
                    }
                }
            }
            return totalAmount;
        }
    };
    return (
        <div className="bg-white shadow-lg transition-all border-2 hover:border-green-400 shadow-gray-200 rounded-2xl p-4 cursor-pointer">
            <div className="flex items-center">
                <div className="inline-flex flex-shrink-0 justify-center items-center w-12 h-12 text-white bg-gradient-to-br from-green-500 to-voilet-500 rounded-lg">
                    {icon}
                </div>
                <div className="flex-shrink-0 ml-3">
                    <span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl">
                        {account ? (
                            <>
                                +<CountUp start={0} end={account!} />
                            </>
                        ) : (
                            <>
                                $
                                <CountUp start={0} end={totalEarings()!} />
                            </>
                        )}
                    </span>
                    <h3 className="text-base font-normal text-gray-500">
                        {title}
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default DashWidget;
