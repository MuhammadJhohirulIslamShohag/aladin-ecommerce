import type { Metadata } from "next";
import React from "react";

import ComingSoon from "@/components/Oraganisms/ComingSoon";

export const metadata: Metadata = {
    title: "AboutUs",
    description:
        "Welcome to Aladin-E-Commerce's About-Us page, where you'll discover the story behind our platform. Learn about our mission, values, and commitment to providing an exceptional online shopping experience. ",
};

const AboutUs = () => {
    return (
        <>
            <ComingSoon />
        </>
    );
};

export default AboutUs;
