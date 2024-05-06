import React from "react";
import { Link } from "react-router-dom";

const NavbarMenu = ({ data }) => {
    return (
        <ul className="flex p-4 space-x-10">
            {data?.map((navbar) => (
                <li>
                    <Link
                        to={`${navbar?.path}`}
                        className="block px-3 text-black transition-all duration-300 hover:text-white"
                    >
                        {navbar?.title}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default NavbarMenu;
