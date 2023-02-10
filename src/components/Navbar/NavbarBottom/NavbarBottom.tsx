import SearchForm from "@/components/UI/SearchForm/SearchForm";
import React from "react";
import { FaSearch, FaHeart, FaShoppingCart } from "react-icons/fa";

const NavbarBottom: React.FC = (): JSX.Element => {
    return (
        <div className="container grid grid-cols-3 pt-2 gap-3 sm:gap-0">
            <div className="col-span-2 flex justify-end sm:justify-start">
                <SearchForm className={"w-2/3"} />
            </div>
            <div className="flex justify-start">
                <ul className="flex items-center">
                    <li className="py-3 px-3 rounded-lg border-2 border-secondary hover:bg-transparent hover:text-primary text-white bg-success transition ease-in-out delay-15 cursor-pointer">
                        <FaHeart />
                    </li>
                    <li className="py-3 px-3 rounded-lg ml-2 border-2 border-secondary hover:bg-transparent hover:text-primary  text-white bg-success transition ease-in-out delay-15 cursor-pointer">
                        <FaShoppingCart />
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default NavbarBottom;
