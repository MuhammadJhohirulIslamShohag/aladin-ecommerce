import Link from "next/link";
import React, {
    startTransition,
    useEffect,
    useOptimistic,
    useRef,
} from "react";
import { AiOutlineClose } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

import ValidateImage from "../../../Atoms/ValidateImage";

import { useStoreContext } from "@/contexts/StoreContextProvider";
import { StoreActionType } from "@/contexts/storeReducer/storeReducer.type";
import {
    getCompareProducts,
    storeCompareProducts,
} from "@/store/compare/compare.product";
import { IProduct } from "@/types/product.type";

interface CompareItemModalProps {
    setIsCompareModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onClose: () => void;
}

const CompareItemModal: React.FC<CompareItemModalProps> = ({
    setIsCompareModalOpen,
    onClose,
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
            storeCompareProducts(JSON.stringify([]));
            setRemoveComProductOptimistic([]);
            // store store context
            dispatch({
                type: StoreActionType.REMOVE_ALL_COMPARE,
                payload: [],
            });
        });
    };

    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            if (
                modalRef.current &&
                !modalRef.current.contains(e.target as Node)
            ) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [onClose]);

    return (
        <div
            ref={modalRef}
            className="animate-popup origin-right min-h-[20vh] transition-all bg-white min-w-[320px] w-[360px] md:w-[380px] shadow-2xl duration-500 rounded-md font-Quicksand"
        >
            <div className="flex items-center justify-between px-1 py-2 bg-primaryBlack rounded-t-sm">
                <p className="uppercase text-white font-semibold">
                    compare product
                </p>
                <button
                    onClick={() => setIsCompareModalOpen(false)}
                    className="text-black hover:text-opacity-80 "
                >
                    <AiOutlineClose
                        size={25}
                        className="text-green-500 hover:text-green-700 "
                    />
                </button>
            </div>
            {comProductOptimistic.length > 0 ? (
                <>
                    {comProductOptimistic.map(
                        (compareProductItem: IProduct) => (
                            <div
                                key={compareProductItem?._id}
                                className="flex justify-between w-full border-b pl-1 pr-2 py-2 hover:bg-gray-50"
                            >
                                <div className="w-[15%]">
                                    <ValidateImage
                                        className="w-[45px] h-[45px]"
                                        imageUrl={
                                            compareProductItem?.imageURLs?.[0]
                                        }
                                        alt={compareProductItem?.name}
                                    />
                                </div>
                                <div className="w-[80%]">
                                    <p className="text-sm font-semibold text-black">
                                        {compareProductItem?.name}
                                    </p>
                                </div>
                                <MdDelete
                                    onClick={() => {
                                        removeCompareProduct(
                                            compareProductItem?._id
                                        );
                                    }}
                                    className="hover:text-red-600 cursor-pointer"
                                    size={20}
                                />
                            </div>
                        )
                    )}
                    <div className="mt-4 pb-2 flex items-center justify-end p-2 gap-8">
                        <button
                            onClick={removeAllCompareProduct}
                            className="text-black font-semibold hover:underline"
                        >
                            Clear
                        </button>
                        <Link href="/products/compare">
                            <button className="w-fit h-9 px-4 text-sm text-white font-bold border-2 border-infoColor py-1 tracking-wide rounded-md hover:text-white bg-btnPrimary hover:bg-primary transition-all duration-300">
                                Compare Now
                            </button>
                        </Link>
                    </div>
                </>
            ) : (
                <p className="text-center font-semibold text-black mt-2">
                    Your compare list is empty!
                </p>
            )}
        </div>
    );
};

export default CompareItemModal;
