import React from "react";
import { Metadata } from "next";
import ComingSoon from "@/components/Oraganisms/ComingSoon";

export const metadata: Metadata = {
    title: "Warranty Policy",
    description:
        "Welcome to the Warranty Policy page of Aladin-E-Commerce Online Shopping Platform!",
};

const WarrantyPolicy = () => {
    return (
        <div>
            <ComingSoon />
        </div>
    );
};

export default WarrantyPolicy;
