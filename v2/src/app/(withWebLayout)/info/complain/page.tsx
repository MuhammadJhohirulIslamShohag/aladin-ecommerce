import React from "react";
import { Metadata } from "next";
import ComingSoon from "@/components/Oraganisms/ComingSoon";

export const metadata: Metadata = {
    title: "Complain",
    description:
        "Welcome to the Complain page of Aladin-E-Commerce Online Shopping Platform!",
};

const Complain = () => {
    return (
        <div>
            <ComingSoon />
        </div>
    );
};

export default Complain;
