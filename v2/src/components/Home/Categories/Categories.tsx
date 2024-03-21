import { useState, useEffect } from "react";
import Category from "./Category/Category";
import { getListOfCategory } from "@/api/category";
import Loader from "@/components/Loader/Loader";
import { ICategories } from "@/types/category.type";

const Categories = () => {
    const [categoriesData, setCategoriesData] = useState<ICategories[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        loadingCategories();
    }, []);

    // 1.1 loading categories
    const loadingCategories = () => {
        setLoading(true);
        getListOfCategory()
            .then((res) => {
                setCategoriesData(res.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    };


    return (
        <>
            {loading ? (
                <Loader height={"h-[360px]"} />
            ) : (
                <div
                    data-aos="fade-up"
                    data-aos-delay="1"
                    className="grid grid-cols-4 gap-4 px-3 sm:grid-cols-1 md:grid-cols-2"
                >

                    {categoriesData?.length > 0 ? (
                        <>
                            {categoriesData?.slice(0, 4).map((category: ICategories) => (
                                <Category key={category._id} category={category} />
                            ))}
                        </>
                    ) : (
                        <h2 className="text-center text-xl text-primary">
                            There is no category
                        </h2>
                    )}
                </div>
            )}
        </>

    );
};

export default Categories;
