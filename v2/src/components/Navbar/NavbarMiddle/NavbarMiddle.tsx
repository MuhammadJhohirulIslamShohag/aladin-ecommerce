"use client";
import Link from "next/link";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import SearchForm from "@/components/UI/SearchForm/SearchForm";

const NavbarMiddle: React.FC = (): JSX.Element => {
    // const [openShoppingCart, setOpenShoppingCart] = useState(false);
    // const { carts, user } = state;

    // const handleShoppingCart = () => {
    //     setTimeout(() => setOpenShoppingCart(!openShoppingCart), 200);
    // };
    return (
        <>
            <div className="container grid grid-cols-3 pt-2 md:gap-3 gap-0">
                <div>
                    <Link
                        href="/"
                        className="text-success italic font-bold text-4xl  cursor-pointer"
                    >
                        Aladin
                    </Link>
                </div>
                <div>
                    <SearchForm
                        className={"w-2/3 "}
                        placeholder={"What are you looking for?"}
                    />
                </div>
                <div>
                    <div className="flex justify-end">
                        <ul className="flex items-center">
                            {/* {(user && user.email) && (
                            <Link href="/products/wish-lists">
                                <li className="py-3 ml-[5px] px-3 rounded-lg border-2 border-secondary hover:bg-transparent hover:text-primary text-white bg-success transition ease-in-out delay-15 cursor-pointer">
                                    <FaHeart />
                                </li>
                            </Link>
                        )} */}

                            <Link href="/products/wish-lists">
                                <li className="py-3 ml-[5px] px-3 rounded-lg border-2 border-secondary hover:bg-transparent hover:text-primary text-white bg-success transition ease-in-out delay-15 cursor-pointer">
                                    <FaHeart />
                                </li>
                            </Link>

                            <li
                                // onMouseOver={handleShoppingCart}
                                className="relative py-3 px-3 rounded-lg ml-[5px] border-2 border-secondary hover:bg-transparent hover:text-primary  text-white bg-success transition ease-in-out delay-15 cursor-pointer"
                            >
                                <FaShoppingCart />
                                <div
                                    suppressHydrationWarning
                                    className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2"
                                >
                                    {/* {carts?.length} */}
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* <ShoppingCarts
                openShoppingCart={openShoppingCart}
                setOpenShoppingCart={setOpenShoppingCart}
            /> */}
        </>
    );
};

export default NavbarMiddle;
