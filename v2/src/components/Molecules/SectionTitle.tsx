import cn from "@/lib/cn";
import Image from "next/image";
import React from "react";

interface SectionTitleProps {
    title?: string;
    className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
    title = "",
    className = "",
}) => {
    const firstIndex = title?.indexOf(" ");
    const modifiedTitle = title?.substring(firstIndex);

    return (
        <div className={cn("text-center lg:mb-10 md:mb-6 mb-4", className)}>
            <h2 className="lg:text-4xl md:text-3xl text-2xl relative font-bold uppercase z-20 text-black">
                <span className="text-green-400 font-extrabold">
                    {title?.split(" ")[0]}
                </span>{" "}
                {modifiedTitle}
                <span className="absolute leading-10 -top-1 left-0 text-black/60 opacity-5 text-6xl lg:text-6xl md:text-4xl text-3xl w-full">
                    {title}
                </span>
            </h2>
            <div className="before:block before:absolute before:bg-black/80 relative inline-block before:w-16 before:h-1 before:top-1/2 before:-translate-y-1/2 before:right-[100%] after:block after:absolute after:bg-black/80 after:w-16 after:h-1 after:top-1/2 after:-translate-y-1/2 after:left-[100%] ">
                <Image
                    src={"/section-title.png"}
                    alt=""
                    className="w-14 h-9 mx-auto"
                    width={100}
                    height={100}
                />
            </div>
        </div>
    );
};

export default SectionTitle;
