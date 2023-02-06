import React from "react";
import FilterMobileMenuItem from "./FilterMobileMenuItem";

type FilterMenuType = {
    checkboxColor: () => 0 | JSX.Element[];
    checkboxShipping: () => 0 | JSX.Element[];
    checkboxBrands: () => 0 | JSX.Element[];
    checkboxSubCategories: () => false | JSX.Element[];
    starRatingFilter: () => JSX.Element;
    showCategories: () => 0 | JSX.Element[];
    showRange: () => JSX.Element;
    openFilterMobileMenu: boolean;
    setOpenFilterMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
};
const FilterMobileMenu = ({
    checkboxColor,
    checkboxShipping,
    checkboxBrands,
    checkboxSubCategories,
    starRatingFilter,
    showCategories,
    showRange,
    openFilterMobileMenu,
    setOpenFilterMobileMenu,
}: FilterMenuType) => {
    return (
        <div
            className="relative z-40 block sm:block md:block transition-opacity ease-linear duration-300 "
            role="dialog"
            aria-modal="true"
        >
            <div className="fixed inset-0 bg-black bg-opacity-25"></div>

            <div className="fixed inset-0 z-40 flex">
                <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl px-3">
                    <div className="flex items-center justify-between px-4">
                        <h2 className="text-lg font-medium text-gray-900">
                            Filters
                        </h2>
                        <button
                            type="button"
                            className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-green-400"
                            onClick={() => setOpenFilterMobileMenu(!openFilterMobileMenu)}
                        >
                            <span className="sr-only">Close menu</span>

                            <svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                    <form className="mt-4 border-t border-gray-200">
                        <FilterMobileMenuItem
                            filterMenuItemName={"Price Range"}
                            filterMenuSubItems={showRange}
                            isShowCloseOpenButton={true}
                        />
                        <FilterMobileMenuItem
                            filterMenuItemName={"Categories"}
                            filterMenuSubItems={showCategories}
                        />
                        <FilterMobileMenuItem
                            filterMenuItemName={"Sub Categories"}
                            filterMenuSubItems={checkboxSubCategories}
                        />
                        <FilterMobileMenuItem
                            filterMenuItemName={"Rating"}
                            filterMenuSubItems={starRatingFilter}
                        />

                        <FilterMobileMenuItem
                            filterMenuItemName={"Color"}
                            filterMenuSubItems={checkboxColor}
                        />
                        <FilterMobileMenuItem
                            filterMenuItemName={"Brands"}
                            filterMenuSubItems={checkboxBrands}
                        />
                        <FilterMobileMenuItem
                            filterMenuItemName={"Shipping"}
                            filterMenuSubItems={checkboxShipping}
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FilterMobileMenu;
