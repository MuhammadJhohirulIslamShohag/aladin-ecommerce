import React from "react";
import { Metadata } from "next";
import ComingSoon from "@/components/Oraganisms/ComingSoon";

export const metadata: Metadata = {
    title: "Privacy",
    description:
        "Welcome to the Privacy page of Aladin-E-Commerce Online Shopping Platform!",
};

const Privacy = () => {
    return (
        <div>
            <ComingSoon />
        </div>
    );
};

export default Privacy;
