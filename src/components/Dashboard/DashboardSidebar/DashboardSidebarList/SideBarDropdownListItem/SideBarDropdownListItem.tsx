import React from "react";
import Link from "next/link";

type SideBarDropdownListItemPropType = {
    dropdownNavigationLink: string;
    name: string;
};
const SideBarDropdownListItem = ({
    dropdownNavigationLink,
    name,
}: SideBarDropdownListItemPropType) => {
    return (
        <li>
            <Link
                href={dropdownNavigationLink}
                className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
                {name}
            </Link>
        </li>
    );
};

export default SideBarDropdownListItem;
