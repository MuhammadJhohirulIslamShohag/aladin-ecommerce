import React from "react";
import { Tab } from "@headlessui/react";
import ProductDescriptionItem from "./ProductDescriptionItem";

const ProductDescription = ({ product }: any) => {
    const {
        title,
        category,
        shipping,
        sold,
        description,
        brand,
        subCategory,
        slug,
        _id,
        quantity,
    } = product;
    return (
        <Tab.Panel>
            <ProductDescriptionItem name="Product Name" value={title}/>
            <ProductDescriptionItem name="Brand" value={brand}/>
            <ProductDescriptionItem name="Category" value={category?.name}/>
            <ProductDescriptionItem name="Sub-Category" value={subCategory}/>
            <ProductDescriptionItem name="Sold" value={sold}/>
            <ProductDescriptionItem name="Quantity" value={quantity}/>
            <ProductDescriptionItem name="Shipping" value={shipping}/>
            <ProductDescriptionItem name="Description" description={description}/>
        </Tab.Panel>
    );
};

export default ProductDescription;
