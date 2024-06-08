import React from "react";
import { Metadata } from "next";
import ComingSoon from "@/components/Oraganisms/ComingSoon";

export const metadata: Metadata = {
    title: "StarPointPolicy",
    description:
        "Welcome to the Star Point Policy page of Aladin-E-Commerce Online Shopping Platform!",
};

const StarPointPolicy = () => {
    return (
        <div>
            <ComingSoon />
        </div>
    );
};

export default StarPointPolicy;
