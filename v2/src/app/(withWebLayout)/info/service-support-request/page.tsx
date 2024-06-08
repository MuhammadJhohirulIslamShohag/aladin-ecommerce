import React from "react";
import { Metadata } from "next";
import ComingSoon from "@/components/Oraganisms/ComingSoon";

export const metadata: Metadata = {
    title: "Refund-Policy",
    description:
        "Welcome to the Service Support Request page of Aladin-E-Commerce Online Shopping Platform!",
};

const ServiceSupportRequest = () => {
    return (
        <div>
            <ComingSoon />
        </div>
    );
};

export default ServiceSupportRequest;
