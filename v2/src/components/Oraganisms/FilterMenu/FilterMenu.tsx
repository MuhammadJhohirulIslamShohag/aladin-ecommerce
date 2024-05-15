"use client";

import React from "react";
import FilterMenuItem from "../../Molecules/FilterMenu/FilterMenuItem";

type FilterMenuType = {
    checkboxColor: JSX.Element;
    checkboxShipping: JSX.Element;
    checkboxBrands: JSX.Element;
    checkboxSubCategories: JSX.Element;
    starRatingFilter: JSX.Element;
    showCategories: JSX.Element;
    showRange: JSX.Element;
    openFilterMobileMenu: boolean;
};
const FilterMenu = ({
    checkboxColor,
    checkboxShipping,
    checkboxBrands,
    checkboxSubCategories,
    starRatingFilter,
    showCategories,
    showRange,
    openFilterMobileMenu,
}: FilterMenuType) => {
    return (
        <form className="lg:block hidden">
            <FilterMenuItem
                filterMenuItemName={"Price Range"}
                filterMenuSubItems={showRange}
                isShowCloseOpenButton={true}
            />
            <FilterMenuItem
                filterMenuItemName={"Categories"}
                filterMenuSubItems={showCategories}
            />
            <FilterMenuItem
                filterMenuItemName={"Sub Categories"}
                filterMenuSubItems={checkboxSubCategories}
            />
            <FilterMenuItem
                filterMenuItemName={"Rating"}
                filterMenuSubItems={starRatingFilter}
            />

            <FilterMenuItem
                filterMenuItemName={"Color"}
                filterMenuSubItems={checkboxColor}
            />
            <FilterMenuItem
                filterMenuItemName={"Brands"}
                filterMenuSubItems={checkboxBrands}
            />
            <FilterMenuItem
                filterMenuItemName={"Shipping"}
                filterMenuSubItems={checkboxShipping}
            />
        </form>
    );
};

export default FilterMenu;
