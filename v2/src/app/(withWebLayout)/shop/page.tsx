"use client";

import HeadSeo from "@/lib/seo/HeadSeo/HeadSeo";
import React, { useState } from "react";

import ShowBrand from "@/components/Molecules/FilterMenu/ShowBrand";
import ShowCategory from "@/components/Molecules/FilterMenu/ShowCategory";
import ShowColors from "@/components/Molecules/FilterMenu/ShowColors";
import ShowRatting from "@/components/Molecules/FilterMenu/ShowRatting";
import ShowShipping from "@/components/Molecules/FilterMenu/ShowShipping";
import ShowSubCategory from "@/components/Molecules/FilterMenu/ShowSubCategory";
import ProductCard from "@/components/Molecules/Products/ProductCard";
import ShowRange from "@/components/Molecules/ShowRange";
import Skeleton from "@/components/Molecules/Skeleton/Skeleton";
import FilterMenu from "@/components/Oraganisms/FilterMenu/FilterMenu";
import FilterMobileMenu from "@/components/Oraganisms/FilterMenu/FilterMobileMenu/FilterMobileMenu";
import SortingMenu from "@/components/Oraganisms/SortingMenu";

import { useStoreContext } from "@/contexts/StoreContextProvider";
import { StoreActionType } from "@/contexts/storeReducer/storeReducer.type";
import { useGetBrandsQuery } from "@/redux/services/brand/brandApiService";
import { useGetCategoriesQuery } from "@/redux/services/category/categoryApiService";
import { useGetColorsQuery } from "@/redux/services/color/colorApiService";
import { useGetProductsQuery } from "@/redux/services/product/productApiService";
import { useGetSubCategoriesQuery } from "@/redux/services/subCategory/subCategoryApiService";
import { IProduct } from "@/types/product.type";
import Pagination from "@/components/Molecules/Pagination/Pagination";

const Shop = () => {
    const [openSortingMenu, setOpenSortingMenu] = useState<boolean>(false);
    const [openFilterMobileMenu, setOpenFilterMobileMenu] =
        useState<boolean>(false);
    const [gridColumn, setGridColumn] = useState<boolean>(true);
    const [price, setPrice] = useState<number[]>([0, 3000]);
    const [categoriesId, setCategoriesId] = useState<string[]>([]);
    const [subCategoryId, setSubCategoryId] = useState<string[]>([]);
    const [sortConfig, setSortConfig] = useState<string>("");
    const [brand, setBrand] = useState<string>("");
    const [color, setColor] = useState<string>("");
    const [shipping, setShipping] = useState<string>("");
    const [pageNumber, setPageNumber] = useState(1);

    const { state, dispatch } = useStoreContext();
    const { text } = state;

    const query: Record<string, string> = {
        limit: String(6),
        page: String(pageNumber),
        searchTerm: text,
        sort: sortConfig,
        minPrice: String(price[0]),
        maxPrice: String(price[1]),
    };

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

    const queryParams = new URLSearchParams(query);

    // redux wrapper
    const { data: productsInfo, isLoading } = useGetProductsQuery({
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
        setCategoriesId([]);
        setSubCategoryId([]);
        setBrand("");
        setColor("");
        setShipping("");
        setTimeout(() => {
            setPrice(value);
        }, 400);
        setPageNumber(1)
    };

    // handle check for categories
    const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        // reset
        dispatch({
            type: StoreActionType.SEARCH_FILTER_VALUE,
            payload: "",
        });
        setPrice([0, 3000]);
        setBrand("");
        setColor("");
        setShipping("");

        // console.log(e.target.value);
        let inTheState = [...categoriesId];
        let justChecked = e.target.value;
        let foundInTheState = inTheState.indexOf(justChecked); // index or -1

        // indexOf method ?? if not found returns -1 else return index [1,2,3,4,5]
        if (foundInTheState === -1) {
            inTheState.push(justChecked);
        } else {
            // if found pull out one item from index
            inTheState.splice(foundInTheState, 1);
        }
        setCategoriesId(inTheState);
        setPageNumber(1)
    };

    const clickRating = (num: number) => {
        // reset
        dispatch({
            type: StoreActionType.SEARCH_FILTER_VALUE,
            payload: "",
        });
        setPrice([0, 3000]);
        setCategoriesId([]);
        setSubCategoryId([]);
        setBrand("");
        setColor("");
        setShipping("");
        setPageNumber(1)
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
        setPrice([0, 3000]);
        setBrand("");
        setColor("");
        setShipping("");
        let inTheState = [...subCategoryId];
        let justChecked = e.target.value;

        let foundTheState = inTheState.indexOf(justChecked);
        if (foundTheState === -1) {
            inTheState.push(justChecked);
        } else {
            inTheState.splice(foundTheState, 1);
        }
        setPageNumber(1)
        setSubCategoryId(inTheState);
    };

    // check for brand
    const handleBrandChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // reset
        dispatch({
            type: StoreActionType.SEARCH_FILTER_VALUE,
            payload: "",
        });
        setPrice([0, 3000]);
        setCategoriesId([]);
        setSubCategoryId([]);
        setShipping("");
        setColor("");
        setPageNumber(1)
        setBrand(event.target.value);
    };

    // check for brand
    const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // reset
        dispatch({
            type: StoreActionType.SEARCH_FILTER_VALUE,
            payload: "",
        });
        setPageNumber(1)
        setPrice([0, 3000]);
        setCategoriesId([]);
        setSubCategoryId([]);
        setBrand("");
        setShipping("");
        setColor(event.target.value);
    };

    // check shipping
    const handleShipping = (e: React.ChangeEvent<HTMLInputElement>) => {
        // reset
        dispatch({
            type: StoreActionType.SEARCH_FILTER_VALUE,
            payload: "",
        });
        setPageNumber(1)
        setPrice([0, 3000]);
        setCategoriesId([]);
        setSubCategoryId([]);
        setBrand("");
        setColor("");
        setShipping(e.target.value);
    };
    // sorting products
    const handleSortingProducts = (sort: string, order: number | string) => {
        setPageNumber(1)
        setSortConfig(sort);
    };
    return (
        <>
            <HeadSeo
                title="Shopping"
                content="Aladin Industries Ltd. Providing reliable products since 2022"
            />
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
                    setOpenFilterMobileMenu={setOpenFilterMobileMenu}
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
                            setOpenSortingMenu={setOpenSortingMenu}
                            setGridColumn={setGridColumn}
                            gridColumn={gridColumn}
                            openFilterMobileMenu={openFilterMobileMenu}
                            setOpenFilterMobileMenu={setOpenFilterMobileMenu}
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
                                            <Skeleton numbers={6} />
                                        </div>
                                    ) : products && products.length < 1 ? (
                                        <p className="text-center text-xl text-primary">
                                            No Product Found
                                        </p>
                                    ) : (
                                        <div
                                            className={`grid gap-5 ${
                                                gridColumn
                                                    ? `lg:grid-cols-3 md:grid-cols-2 grid-cols-1`
                                                    : `md:grid-cols-2 grid-cols-1`
                                            }`}
                                        >
                                            {products &&
                                                products.length &&
                                                products.map(
                                                    (product: IProduct) => (
                                                        <div key={product._id}>
                                                            <ProductCard
                                                                product={
                                                                    product
                                                                }
                                                            />
                                                        </div>
                                                    )
                                                )}
                                        </div>
                                    )}
                                </div>

                                <div className="mt-5">
                                    <Pagination
                                        pages={
                                            productsInfo?.meta?.totalPage || 10
                                        }
                                        page={pageNumber}
                                        setPage={setPageNumber}
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
};

export default Shop;
