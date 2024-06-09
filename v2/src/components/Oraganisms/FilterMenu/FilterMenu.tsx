"use client";

import FilterMenuItem from "../../Molecules/FilterMenu/FilterMenuItem";

type FilterMenuType = {
    checkboxColor: JSX.Element;
    checkboxFeatured: JSX.Element;
    checkboxBrands: JSX.Element;
    checkboxSubCategories: JSX.Element;
    starRatingFilter: JSX.Element;
    showCategories: JSX.Element;
    showRange: JSX.Element;
    openFilterMobileMenu: boolean;
};
const FilterMenu = ({
    checkboxColor,
    checkboxFeatured,
    checkboxBrands,
    checkboxSubCategories,
    starRatingFilter,
    showCategories,
    showRange,
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
                filterMenuItemName={"Featured Products"}
                filterMenuSubItems={checkboxFeatured}
            />
        </form>
    );
};

export default FilterMenu;
