import React, { Fragment } from "react";
import { Tab } from "@headlessui/react";
import ProductDescription from "./ProductDescription/ProductDescription";
const ProductDetailsTab = ({ product }: any) => {
    return (
        <Tab.Group>
            <Tab.List className="bg-primary">
                {["Description", "Warranty", "Show Reviews"].map(
                    (tabList: string, i: number) => (
                        <Tab key={i} as={Fragment}>
                            {({ selected }) => (
                                <button
                                    className={
                                        selected
                                            ? "bg-white text-primary px-10 rounded-none py-3 border-2 border-primary"
                                            : "btn hover:bg-white hover:text-primary border-0 rounded-none text-white btn-primary px-10"
                                    }
                                >
                                    {tabList}
                                </button>
                            )}
                        </Tab>
                    )
                )}
            </Tab.List>
            <Tab.Panels className="border-x-2 border-gray-400">
                <ProductDescription product={product}/>
                <Tab.Panel>Content 2</Tab.Panel>
                <Tab.Panel>Content 3</Tab.Panel>
            </Tab.Panels>
        </Tab.Group>
    );
};

export default ProductDetailsTab;
