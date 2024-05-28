"use client";

import Link from "next/link";

const Advertise = () => {
    return (
        <section
            data-aos="zoom-in"
            data-aos-offset="200"
            data-aos-delay="1"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            className="lg:py-24 md:py-16 py-12"
        >
            <div className="z-20 relative">
                <Link href={"/shop"}>
                    <picture>
                        <img
                            className="w-full h-full"
                            src="../../../../../advertise/summer-offer-v.png"
                            alt="advertised product"
                        />
                    </picture>
                </Link>
            </div>
        </section>
    );
};

export default Advertise;
