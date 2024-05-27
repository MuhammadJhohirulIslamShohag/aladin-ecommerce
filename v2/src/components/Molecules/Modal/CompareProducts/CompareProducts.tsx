"use client";

import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import { Fragment, startTransition, useOptimistic } from "react";

import CompareProduct from "./CompareProduct";

import { useStoreContext } from "@/contexts/StoreContextProvider";
import { StoreActionType } from "@/contexts/storeReducer/storeReducer.type";
import {
    getCompareProducts,
    storeCompareProducts,
    removeCompareProducts,
} from "@/store/compare/compare.product";
import { IProduct } from "@/types/product.type";

interface CompareProductProps {
    openCompareProduct: boolean;
    setIsCompareModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CompareProducts: React.FC<CompareProductProps> = ({
    openCompareProduct,
    setIsCompareModalOpen,
}) => {
    let allCompareProducts: IProduct[] = getCompareProducts();
    const { dispatch } = useStoreContext();

    const [comProductOptimistic, setRemoveComProductOptimistic] = useOptimistic(
        allCompareProducts,
        (state: IProduct[], newState: unknown) => {
            if (Array.isArray(newState)) {
                return (state = []);
            } else {
                return state.filter((p: IProduct) => p._id !== newState);
            }
        }
    );

    const removeCompareProduct = (productId: string) => {
        let compareProducts: IProduct[] = allCompareProducts.filter(
            (product) => product._id !== productId
        );

        // set undeleted compare products into the window local storage
        startTransition(() => {
            storeCompareProducts(JSON.stringify(compareProducts));
            setRemoveComProductOptimistic(productId);
            // store store context
            dispatch({
                type: StoreActionType.REMOVE_TO_COMPARE,
                payload: productId,
            });
        });
    };

    const removeAllCompareProduct = () => {
        // set undeleted compare products into the window local storage
        startTransition(() => {
            removeCompareProducts();
            setRemoveComProductOptimistic([]);
            // store store context
            dispatch({
                type: StoreActionType.REMOVE_ALL_COMPARE,
                payload: [],
            });
        });
    };

    return (
        <Transition.Root show={openCompareProduct} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-[999999]"
                onClose={setIsCompareModalOpen}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                        <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                                            <div className="flex items-start justify-between">
                                                <Dialog.Title className="text-lg font-medium text-gray-900">
                                                    Compare Products
                                                </Dialog.Title>
                                                <div className="ml-3 flex h-7 items-center">
                                                    <button
                                                        type="button"
                                                        className="-m-2 p-2 focus-visible:outline-none transition-all text-gray-400 hover:text-green-400"
                                                        onClick={() =>
                                                            setIsCompareModalOpen(
                                                                false
                                                            )
                                                        }
                                                    >
                                                        <span className="sr-only">
                                                            Close panel
                                                        </span>
                                                        <svg
                                                            className="h-6 w-6"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth="1.5"
                                                            stroke="currentColor"
                                                            aria-hidden="true"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M6 18L18 6M6 6l12 12"
                                                            />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                            {comProductOptimistic?.length <
                                            1 ? (
                                                <div className="flex flex-col justify-center items-center h-96">
                                                    <h2 className="font-medium text-xl mb-2 text-green-600">
                                                        No Product Added For
                                                        Compare Products
                                                    </h2>
                                                    <Link href="/shop">
                                                        <button
                                                            type="button"
                                                            className="transition-all font-medium text-primary hover:text-green-600"
                                                            onClick={() =>
                                                                setIsCompareModalOpen(
                                                                    false
                                                                )
                                                            }
                                                        >
                                                            Continue Compare
                                                            Products
                                                            <span aria-hidden="true">
                                                                {" "}
                                                                &rarr;
                                                            </span>
                                                        </button>
                                                    </Link>
                                                </div>
                                            ) : (
                                                <div className="mt-8">
                                                    <div className="flow-root">
                                                        <ul
                                                            role="list"
                                                            className="-my-6 divide-y divide-gray-200"
                                                        >
                                                            {comProductOptimistic?.map(
                                                                (
                                                                    product: IProduct
                                                                ) => (
                                                                    <CompareProduct
                                                                        product={
                                                                            product
                                                                        }
                                                                        removeCompareProduct={
                                                                            removeCompareProduct
                                                                        }
                                                                        key={
                                                                            product._id
                                                                        }
                                                                    />
                                                                )
                                                            )}
                                                        </ul>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {comProductOptimistic?.length > 0 && (
                                            <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                                                <div className="mt-6">
                                                    <Link
                                                        onClick={() =>
                                                            setIsCompareModalOpen(
                                                                false
                                                            )
                                                        }
                                                        href="/products/compare"
                                                        className="flex transition-all items-center justify-center rounded-md border border-primary bg-primary px-6 py-3 sm:py-2 text-base font-medium text-white shadow-sm hover:bg-transparent hover:text-primary"
                                                    >
                                                        Compare Now
                                                    </Link>
                                                </div>
                                                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                                    <button
                                                        type="button"
                                                        className="transition-all font-medium text-primary hover:text-green-600"
                                                        onClick={
                                                            removeAllCompareProduct
                                                        }
                                                    >
                                                        Clear
                                                        <span aria-hidden="true">
                                                            &rarr;
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default CompareProducts;
