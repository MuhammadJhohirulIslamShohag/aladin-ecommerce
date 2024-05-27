"use client";

import Link from "next/link";
import { useState } from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";

import SearchForm from "@/components/Molecules/Form/LocalSearch/SearchForm/SearchForm";
import ShoppingCarts from "../../Cart/ShoppingCarts/ShoppingCarts";

import { useStoreContext } from "@/contexts/StoreContextProvider";

const NavbarMiddle: React.FC = (): JSX.Element => {
    const { state } = useStoreContext();
    const { carts } = state;

    const [openShoppingCart, setOpenShoppingCart] = useState(false);

    const handleShoppingCart = () => {
        setOpenShoppingCart((prev) => !prev)
        // setTimeout(() => setOpenShoppingCart(!openShoppingCart), 200);
    };
    return (
        <>
            <div className="container mx-auto px-6 grid lg:grid-cols-3 grid-cols-2 py-2 md:gap-3 gap-0">
                <div>
                    <Link
                        href="/"
                        className="text-success italic font-bold text-4xl  cursor-pointer"
                    >
                        Aladin
                    </Link>
                </div>
                <div className="lg:block hidden">
                    <SearchForm
                        className={"w-2/3 "}
                        placeholder={"What are you looking for?"}
                    />
                </div>
                <div>
                    <div className="flex justify-end">
                        <ul className="flex items-center">
                            <Link href="/products/wish-list">
                                <li className="py-3 ml-[5px] px-3 rounded-lg border-2 border-secondary hover:bg-transparent hover:text-primary text-white bg-success hover:border-primary transition ease-in-out delay-15 cursor-pointer relative">
                                    <FaHeart />
                                    <div
                                        suppressHydrationWarning
                                        className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2"
                                    >
                                        {state?.wishLists?.length ?? 0}
                                    </div>
                                </li>
                            </Link>

                            <li
                                onClick={handleShoppingCart}
                                className="relative py-3 px-3 rounded-lg ml-[5px] border-2 border-secondary hover:bg-transparent hover:text-primary  text-white hover:border-primary bg-success transition ease-in-out delay-15 cursor-pointer"
                            >
                                <FaShoppingCart />
                                <div
                                    suppressHydrationWarning
                                    className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2"
                                >
                                    {carts?.length}
                                    {/* {allCart?.length} */}
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <ShoppingCarts
                openShoppingCart={openShoppingCart}
                setOpenShoppingCart={setOpenShoppingCart}
            />
        </>
    );
};

export default NavbarMiddle;
