"use client";

import React, { useReducer } from "react";

import ShowBrand from "@/components/Molecules/FilterMenu/ShowBrand";
import ShowCategory from "@/components/Molecules/FilterMenu/ShowCategory";
import ShowColors from "@/components/Molecules/FilterMenu/ShowColors";
import ShowRatting from "@/components/Molecules/FilterMenu/ShowRatting";
import ShowShipping from "@/components/Molecules/FilterMenu/ShowShipping";
import ShowSubCategory from "@/components/Molecules/FilterMenu/ShowSubCategory";
import ShowRange from "@/components/Molecules/ShowRange";
import FilterMenu from "@/components/Oraganisms/FilterMenu/FilterMenu";
import FilterMobileMenu from "@/components/Oraganisms/FilterMenu/FilterMobileMenu/FilterMobileMenu";
import SortingMenu from "@/components/Oraganisms/SortingMenu";
import Pagination from "@/components/Molecules/Pagination/Pagination";
import ShopProducts from "@/components/Oraganisms/Products/ShopProducts";
import ShopProductsSkeleton from "@/components/Oraganisms/Skeletons/Products/ShopProductsSkeleton";
import Empty from "@/components/Molecules/Empty";

import { useStoreContext } from "@/contexts/StoreContextProvider";
import { StoreActionType } from "@/contexts/storeReducer/storeReducer.type";
import { useGetBrandsQuery } from "@/redux/services/brand/brandApiService";
import { useGetCategoriesQuery } from "@/redux/services/category/categoryApiService";
import { useGetColorsQuery } from "@/redux/services/color/colorApiService";
import { useGetProductsByFiltersQuery } from "@/redux/services/product/productApiService";
import { useGetSubCategoriesQuery } from "@/redux/services/subCategory/subCategoryApiService";
import { shopInitialState, shopReducer } from "@/utils/shopReducer";



const Shop = () => {
    const [shopState, shopDispatch] = useReducer(shopReducer, shopInitialState);
    const { state, dispatch } = useStoreContext();
    const { text } = state;

    const {
        pageNumber,
        sortConfig,
        price,
        brand,
        categoriesId,
        subCategoryId,
        color,
        shipping,
        rating,
        openSortingMenu,
        openFilterMobileMenu,
        gridColumn,
    } = shopState;

    const query: Record<string, string> = {
        limit: String(6),
        page: String(pageNumber),
    };

    if (text) {
        query["searchTerm"] = text;
    }
    if (brand) {
        query["brand.name"] = brand;
    }
    if (categoriesId?.length) {
        query["category.name"] = categoriesId.join(",");
    }
    if (subCategoryId?.length) {
        query["subCategories.name"] = subCategoryId.join(",");
    }
    if (color) {
        query["colors.name"] = color;
    }
    if (rating > 0) {
        query["rating"] = rating.toString();
    }
    if (price?.[0] > 0 && price?.[1] > 0) {
        query["minPrice"] = price[0].toString();
        query["maxPrice"] = price[1].toString();
    }
    if (sortConfig.sortBy && sortConfig.sortOrder) {
        query["sortBy"] = sortConfig.sortBy;
        query["sortOrder"] = sortConfig.sortOrder;
    }

    const queryParams = new URLSearchParams(query);

    // redux wrapper
    const { data: productsInfo, isLoading } = useGetProductsByFiltersQuery({
        queryParams: queryParams.toString(),
    });
    const products = productsInfo?.data;

    const { data: colorsInfo } = useGetColorsQuery({});
    const colors = colorsInfo?.data;

    const { data: categoriesData } = useGetCategoriesQuery({});
    const categories = categoriesData?.data;

    const { data: subCategoriesData } = useGetSubCategoriesQuery({});
    const subCategories = subCategoriesData?.data;

    const { data: brandsData } = useGetBrandsQuery({});
    const brands = brandsData?.data;

    const priceChangeHandler = (value: number[]) => {
        dispatch({
            type: StoreActionType.SEARCH_FILTER_VALUE,
            payload: "",
        });
        shopDispatch({
            type: "CLEAR_SHOP_STATE",
        });
        setTimeout(() => {
            shopDispatch({
                type: "SET_SHOP_STATE",
                payload: {
                    price: value,
                },
            });
        }, 400);
    };

    // handle check for categories
    const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        // reset
        dispatch({
            type: StoreActionType.SEARCH_FILTER_VALUE,
            payload: "",
        });

        shopDispatch({
            type: "CLEAR_SHOP_STATE",
        });

        let inTheState = [...categoriesId];
        let justChecked = e.target.value;
        let foundInTheState = inTheState.indexOf(justChecked);

        if (foundInTheState === -1) {
            inTheState.push(justChecked);
        } else {
            // if found pull out one item from index
            inTheState.splice(foundInTheState, 1);
        }
        shopDispatch({
            type: "SET_SHOP_STATE",
            payload: {
                categoriesId: inTheState,
            },
        });
    };

    const clickRating = (num: number) => {
        // reset
        dispatch({
            type: StoreActionType.SEARCH_FILTER_VALUE,
            payload: "",
        });
        shopDispatch({
            type: "CLEAR_SHOP_STATE",
        });
        shopDispatch({
            type: "SET_SHOP_STATE",
            payload: {
                rating: num,
            },
        });
    };

    // check for sub-categories
    const changeHandlerSubCategory = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        // reset
        dispatch({
            type: StoreActionType.SEARCH_FILTER_VALUE,
            payload: "",
        });
        shopDispatch({
            type: "CLEAR_SHOP_STATE",
        });
        let inTheState = [...subCategoryId];
        let justChecked = e.target.value;

        let foundTheState = inTheState.indexOf(justChecked);
        if (foundTheState === -1) {
            inTheState.push(justChecked);
        } else {
            inTheState.splice(foundTheState, 1);
        }
        shopDispatch({
            type: "SET_SHOP_STATE",
            payload: {
                subCategoryId: inTheState,
            },
        });
    };

    // check for brand
    const handleBrandChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // reset
        dispatch({
            type: StoreActionType.SEARCH_FILTER_VALUE,
            payload: "",
        });
        shopDispatch({
            type: "CLEAR_SHOP_STATE",
        });
        shopDispatch({
            type: "SET_SHOP_STATE",
            payload: {
                brand: event.target.value,
            },
        });
    };

    // check for brand
    const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // reset
        dispatch({
            type: StoreActionType.SEARCH_FILTER_VALUE,
            payload: "",
        });
        shopDispatch({
            type: "CLEAR_SHOP_STATE",
        });
        shopDispatch({
            type: "SET_SHOP_STATE",
            payload: {
                color: event.target.value,
            },
        });
    };

    // check shipping
    const handleShipping = (e: React.ChangeEvent<HTMLInputElement>) => {
        // reset
        dispatch({
            type: StoreActionType.SEARCH_FILTER_VALUE,
            payload: "",
        });
        shopDispatch({
            type: "CLEAR_SHOP_STATE",
        });
        shopDispatch({
            type: "SET_SHOP_STATE",
            payload: {
                shipping: e.target.value,
            },
        });
    };
    // sorting products
    const handleSortingProducts = (sort: string, order: string) => {
        shopDispatch({
            type: "SET_SHOP_STATE",
            payload: {
                sortConfig: {
                    sortBy: sort,
                    sortOrder: order,
                },
                pageNumber: 1,
            },
        });
    };

    const handlePageSet = (page: number) => {
        shopDispatch({
            type: "SET_SHOP_STATE",
            payload: {
                pageNumber: page,
            },
        });
    };
    return (
        <>
            <div>
                {/* Filter Mobile Side Bar Menu */}
                <FilterMobileMenu
                    checkboxColor={
                        <ShowColors
                            handleChange={handleColorChange}
                            checkValue={color}
                            values={colors}
                        />
                    }
                    checkboxShipping={
                        <ShowShipping
                            handleChange={handleShipping}
                            checkValue={shipping}
                        />
                    }
                    checkboxBrands={
                        <ShowBrand
                            handleChange={handleBrandChange}
                            checkValue={brand}
                            brands={brands}
                        />
                    }
                    checkboxSubCategories={
                        <ShowSubCategory
                            subCategories={subCategories}
                            checkValue={subCategoryId}
                            handleChange={changeHandlerSubCategory}
                        />
                    }
                    starRatingFilter={<ShowRatting clickRating={clickRating} />}
                    showCategories={
                        <ShowCategory
                            categories={categories}
                            checkValue={categoriesId}
                            handleChange={handleCheck}
                        />
                    }
                    showRange={
                        <ShowRange priceChangeHandler={priceChangeHandler} />
                    }
                    openFilterMobileMenu={openFilterMobileMenu}
                    setOpenFilterMobileMenu={() =>
                        shopDispatch({
                            type: "SET_SHOP_STATE",
                            payload: {
                                openFilterMobileMenu: !openFilterMobileMenu,
                            },
                        })
                    }
                />
                <div className="mx-auto max-w-7xl md:px-4 px-6 lg:px-8">
                    <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
                        <h1 className="md:text-4xl font-bold tracking-tight text-gray-900 text-2xl">
                            Filter Products
                        </h1>
                        {/* Filter Sorting Menu */}
                        <SortingMenu
                            handleSortingProducts={handleSortingProducts}
                            openSortingMenu={openSortingMenu}
                            setOpenSortingMenu={() =>
                                shopDispatch({
                                    type: "SET_SHOP_STATE",
                                    payload: {
                                        openSortingMenu: !openSortingMenu,
                                    },
                                })
                            }
                            setGridColumn={() =>
                                shopDispatch({
                                    type: "SET_SHOP_STATE",
                                    payload: {
                                        gridColumn: !gridColumn,
                                    },
                                })
                            }
                            gridColumn={gridColumn}
                            openFilterMobileMenu={openFilterMobileMenu}
                            setOpenFilterMobileMenu={() =>
                                shopDispatch({
                                    type: "SET_SHOP_STATE",
                                    payload: {
                                        openFilterMobileMenu:
                                            !openFilterMobileMenu,
                                    },
                                })
                            }
                        />
                    </div>
                    <section
                        aria-labelledby="products-heading"
                        className="pt-6 pb-24"
                    >
                        <h2 id="products-heading" className="sr-only">
                            Products
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                            {/* Filter Side Bar Menu */}
                            <FilterMenu
                                openFilterMobileMenu={openFilterMobileMenu}
                                checkboxColor={
                                    <ShowColors
                                        handleChange={handleColorChange}
                                        checkValue={color}
                                        values={colors}
                                    />
                                }
                                checkboxShipping={
                                    <ShowShipping
                                        handleChange={handleShipping}
                                        checkValue={shipping}
                                    />
                                }
                                checkboxBrands={
                                    <ShowBrand
                                        handleChange={handleBrandChange}
                                        checkValue={brand}
                                        brands={brands}
                                    />
                                }
                                checkboxSubCategories={
                                    <ShowSubCategory
                                        subCategories={subCategories}
                                        checkValue={subCategoryId}
                                        handleChange={changeHandlerSubCategory}
                                    />
                                }
                                starRatingFilter={
                                    <ShowRatting clickRating={clickRating} />
                                }
                                showCategories={
                                    <ShowCategory
                                        categories={categories}
                                        checkValue={categoriesId}
                                        handleChange={handleCheck}
                                    />
                                }
                                showRange={
                                    <ShowRange
                                        priceChangeHandler={priceChangeHandler}
                                    />
                                }
                            />

                            {/* Filter Products */}
                            <div className="col-span-3">
                                <div className="">
                                    {isLoading ? (
                                        <div
                                            className={`grid gap-5 ${
                                                gridColumn
                                                    ? `lg:grid-cols-3 md:grid-cols-2 grid-cols-1`
                                                    : `md:grid-cols-2 grid-cols-1`
                                            }`}
                                        >
                                            <ShopProductsSkeleton />
                                        </div>
                                    ) : products && products.length < 1 ? (
                                        <Empty description="No Shop Product Data" />
                                    ) : (
                                        <div
                                            className={`grid gap-5 ${
                                                gridColumn
                                                    ? `lg:grid-cols-3 md:grid-cols-2 grid-cols-1`
                                                    : `md:grid-cols-2 grid-cols-1`
                                            }`}
                                        >
                                            <ShopProducts products={products} />
                                        </div>
                                    )}
                                </div>
                                {productsInfo?.meta?.totalItems > 0 && (
                                    <div className="mt-7">
                                        <Pagination
                                            pages={
                                                productsInfo?.meta?.totalPage ||
                                                10
                                            }
                                            page={pageNumber}
                                            setPage={handlePageSet}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
};

export default Shop;
