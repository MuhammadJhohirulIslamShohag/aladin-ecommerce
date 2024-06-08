import type { Metadata } from "next";
import React from "react";
import ComingSoon from "@/components/Oraganisms/ComingSoon";

export const metadata: Metadata = {
    title: "Blogs",
    description:
        "Welcome to Aladin-E-Commerce Online Shopping Platform, Explore our curated selection of blogs, discover the latest products across various categories, and delve into a world of deals and new arrivals.",
};

const BlogPage = () => {
    return (
        <>
            <ComingSoon />
        </>
    );
};

export default BlogPage;
