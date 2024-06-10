"use client";

import React from "react";
import { MdOutlineFreeCancellation } from "react-icons/md";
import { AiOutlineFileProtect } from "react-icons/ai";
import { FaMoneyBillAlt, FaGift } from "react-icons/fa";

import Service from "../Molecules/Service/Service";

const Services = () => {
    return (
        <div
            className="container grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 lg:pt-10 md:pt-10 pt-8 pb-8 md:pb-12"
            id="about-us"
        >
            <Service name="Free Delivery" info="On Order Over $100">
                <MdOutlineFreeCancellation className="text-3xl text-success" />
            </Service>
            <Service name="Order Protection" info="Secured Information">
                <AiOutlineFileProtect className="text-3xl text-success" />
            </Service>
            <Service name="Promotion Gift" info="Special Offers!">
                <FaGift className="text-3xl text-success" />
            </Service>
            <Service name="Money Back" info="Return Over 30 days">
                <FaMoneyBillAlt className="text-3xl text-success" />
            </Service>
        </div>
    );
};

export default Services;
