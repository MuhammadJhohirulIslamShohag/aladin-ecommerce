import React from "react";
import { FaSearch, FaHeart, FaShoppingCart } from "react-icons/fa";

const NavbarBottom: React.FC = (): JSX.Element => {
    return (
        <div className="container grid grid-cols-3 pt-2 gap-3 sm:gap-0">
            <div className="col-span-2 flex justify-end sm:justify-start">
                <form className="items-center w-2/3 sm:w-11/12 relative">
                    <input
                        type="text"
                        name="search"
                        className="bg-primary border-primary text-white text-sm rounded-lg  focus:border-primary block w-full pl-6 p-3 placeholder:text-white sm:placeholder:text-[9px]"
                        placeholder="What are you looking for?"
                        required
                    />
                    <button
                        type="submit"
                        className="inline-flex absolute top-0 right-0 items-center py-3 px-3 ml-2 text-sm font-medium text-white bg-primary rounded-lg border-2 border-primary focus:outline-none"
                    >
                        <FaSearch />
                    </button>
                </form>
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
