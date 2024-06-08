import React from "react";
import { Metadata } from "next";
import ComingSoon from "@/components/Oraganisms/ComingSoon";

export const metadata: Metadata = {
    title: "Refund-Policy",
    description:
        "Welcome to the Refund Policy page of Aladin-E-Commerce Online Shopping Platform!",
};

const RefundPolicy = () => {
    return (
        <div>
            <ComingSoon />
        </div>
    );
};

export default RefundPolicy;
