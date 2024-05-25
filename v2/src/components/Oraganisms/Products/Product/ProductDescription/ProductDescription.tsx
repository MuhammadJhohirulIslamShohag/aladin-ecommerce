"use client"

import React from "react";
import parse from 'html-react-parser';
import { Tab } from "@headlessui/react";
import { IProduct } from "@/types/product.type";

import ProductDescriptionItem from "../../../../Molecules/Products/Product/ProductDescription/ProductDescriptionItem";

const ProductDescription = ({ product }: { product: IProduct }) => {
    const { name, shipping, sold, description, brand, quantity } = product;

    return (
        <Tab.Panel>
            <ProductDescriptionItem name="Product Name" value={name} />
            <ProductDescriptionItem name="Brand" value={brand?.name} />
            <ProductDescriptionItem name="Sold" value={sold} />
            <ProductDescriptionItem name="Quantity" value={quantity} />
            <ProductDescriptionItem name="Shipping" value={shipping} />
            <ProductDescriptionItem
                name="Description"
                description={<>{description ? parse(description): "No Info"}</>}
            />
        </Tab.Panel>
    );
};

export default ProductDescription;
