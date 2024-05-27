"use client"

import Category from "../Molecules/Category";
import { ICategory } from "@/types/category.type";

const Categories = ({ data }: { data: ICategory[] }) => {
    let content = null;

    if (data.length) {
        content = data.map((category: ICategory) => (
            <Category key={category._id} category={category} />
        ));
    }

    if (!data.length) {
        content = <h1>There is no category</h1>;
    }

    return (
        <>
            <div
                data-aos="fade-up"
                data-aos-delay="1"
                className="md:grid lg:grid-cols-4 gap-4 px-3 grid-cols-1 md:grid-cols-2 hidden lg:pb-28 md:pb-16 pb-10"
            >
                {content}
            </div>
        </>
    );
};

export default Categories;
