import React from "react";

interface FunFactCardProps {
    icon: React.ReactNode;
    count: number;
    name: string;
}

const FunFactCard: React.FC<FunFactCardProps> = ({ icon, count, name }) => {
    return (
        <div className="group flex-col items-center justify-center bg-white hover:bg-green-400 transition-all duration-300 ease-in-out rounded-lg p-6 text-center rounded-tl-[5px] hover:rounded-tr-[90px] hover:rounded-bl-[90px] rounded-br-[5px] w-full cursor-pointer">
            <div className="flex justify-center items-center pb-5">{icon}</div>
            <h2 className="text-black group-hover:text-white text-5xl transition-all duration-300 font-semibold mb-2">
                {count}
            </h2>
            <span className="text-black group-hover:text-white lg:text-sm uppercase transition-all duration-300">
                {name}
            </span>
        </div>
    );
};

export default FunFactCard;
