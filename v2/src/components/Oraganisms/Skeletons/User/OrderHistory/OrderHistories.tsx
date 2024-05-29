import React from "react";
import OrderHistory from "../../../../Molecules/Skeletons/OrderHistory";

const OrderHistories = () => {
    return (
        <div className="space-y-2 mt-2">
            <OrderHistory />
            <OrderHistory />
            <OrderHistory />
            <OrderHistory />
        </div>
    );
};

export default OrderHistories;
