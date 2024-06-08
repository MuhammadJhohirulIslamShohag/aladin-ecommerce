import React from "react";
import { Metadata } from "next";
import ComingSoon from "@/components/Oraganisms/ComingSoon";

export const metadata: Metadata = {
    title: "Contact-Us",
    description:
        "Welcome to the Contact Us page of Aladin-E-Commerce Online Shopping Platform. Connect with us for inquiries, support, or feedback. We're here to assist you!",
};

const ContactUsPage = () => {
    return (
        <>
            <ComingSoon />
        </>
    );
};

export default ContactUsPage;
