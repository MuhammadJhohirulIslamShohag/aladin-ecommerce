import React from "react";
import { Metadata } from "next";
import ComingSoon from "@/components/Oraganisms/ComingSoon";

export const metadata: Metadata = {
    title: "Information",
    description:
        "Welcome to the Information page of Aladin-E-Commerce Online Shopping Platform!",
};

const InformationPage = () => {
    return (
        <div>
            <ComingSoon />
        </div>
    );
};

export default InformationPage;
