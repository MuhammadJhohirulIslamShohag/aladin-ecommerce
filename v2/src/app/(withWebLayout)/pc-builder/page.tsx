import React from "react";
import { Metadata } from "next";
import ComingSoon from "@/components/Oraganisms/ComingSoon";

export const metadata: Metadata = {
    title: "Pc-Builder",
    description:
        "Welcome to the Pc Builder page of Aladin-E-Commerce Online Shopping Platform!",
};

const PcBuilder = () => {
    return (
        <>
            <ComingSoon />
        </>
    );
};

export default PcBuilder;
