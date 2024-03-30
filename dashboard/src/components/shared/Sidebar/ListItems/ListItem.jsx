import React from "react";
import { Link } from "react-router-dom";

const ListItem = ({ path, name, openSideBar, icon }) => {
    return (
        <Link to={path}>
            <li
                className={`flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 `}
            >
                <span>{icon}</span>
                {openSideBar && <span>{name}</span>}
            </li>
        </Link>
    );
};

export default ListItem;
