import React from "react";
import { Metadata } from "next";
import ComingSoon from "@/components/Oraganisms/ComingSoon";

export const metadata: Metadata = {
    title: "Online-Delivery",
    description:
        "Welcome to the Online Delivery page of Aladin-E-Commerce Online Shopping Platform!",
};

const OnlineDelivery = () => {
    return (
        <div>
            <ComingSoon />
        </div>
    );
};

export default OnlineDelivery;
