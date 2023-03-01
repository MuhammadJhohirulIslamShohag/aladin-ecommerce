import React, { useState, useEffect } from "react";
import { getProduct, updateProduct } from "@/api/products";
import { useRouter } from "next/router";
import { IProduct } from "types/product.type";
import { useStoreContext } from "@/lib/contexts/StoreContextProvider";
import { getListOfCategory, subCategoryOnCategory } from "@/api/category";
import { ICategories } from "types/category.type";
import toast from "react-hot-toast";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import UpdateProductForm from "@/components/Form/UpdateProduct/UpdateProduct";
import { GetServerSideProps } from "next";
import { getListOfColor } from "@/api/color";
import { getListOfSizes } from "@/api/size";
import { getListOfBrands } from "@/api/brand";


const initialValues = {
    title: "",
    description: "",
    images: [],
    price: 0,
    shipping: "",
    quantity: 0,
    discount: 0,
    colors: [],
    colorsData: [],
    sizesData: [],
    brandData: [],
    sizes: [],
    brand: "",
    brands: [],
    category: "",
    categories: [],
    subCategory: [],
};

const UpdateProduct = ({categories, colorsData,
    sizesData,
    brandsData}:any) => {
    const [values, setValues] = useState({...initialValues,categories: categories, brandData:brandsData, colorsData: colorsData, sizesData: sizesData});
    const [selectedCategory, setSelectedCategory] = useState();
    // const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [arraySubCategories, setArraySubCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const {
        state: { user },
    } = useStoreContext();

    const router = useRouter();
    const { query } = router;
    const slug = router.query.slug;

    useEffect(() => {
        loadingProduct();
        // loadingCategory();
    }, [slug]);

    const loadingProduct = () => {
        getProduct(slug)
            .then((res) => {
                setValues({ ...values, ...res.data });
                subCategoryOnCategory(user!.token, res.data.category._id).then(
                    (res) => {
                        setSubCategories(res.data);
                    }
                );
                let array: {label:string; value:string;}[] = [];
                res.data.subCategory.map((d: any) => {
                    return array.push({label:d.name, value: d._id});
                });
                setArraySubCategories((prev) => array);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // const loadingCategory = () => {
    //     getListOfCategory()
    //         .then((res) => {
    //             setCategories(res.data);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // };

    const handleChange = (event: any) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    const handleCategoryChange = (event: any) => {
        setValues({
            ...values,
            subCategory: [],
        });
        setSelectedCategory(event.target.value);
        subCategoryOnCategory(user!.token, event.target.value)
            .then((res) => {
                const modifySubCategories = res.data.length && res.data.map(s=> {
                    return {
                        label: s.name,
                        value: s._id
                    }
                }) 
                console.log(modifySubCategories);
                setSubCategories(modifySubCategories);
            })
            .catch((error) => {
                console.log(error);
            });

        if (values.category === event.target.value) {
            loadingProduct();
        }
        setArraySubCategories([]);
    };

    const handleSubmitProduct = (event: any) => {
        event.preventDefault();
        values.category = selectedCategory ? selectedCategory : values.category;
        values.subCategory = arraySubCategories;
        setLoading(true);
        updateProduct(user!.token, slug, values)
            .then((res) => {
                toast.success(`${res.data.title} Product Is Updated!`);
                setLoading(false);
                router.push("/dashboard/admin/products");
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    toast.error(error.response.error.message);
                }
                setLoading(false);
            });
    };
    return (
        <DashboardLayout>
            <div className="container py-10">
                <div className="bg-secondary p-6 rounded-lg">
                    <h2 className="text-center font-semibold text-primary text-2xl">
                        Update Product
                    </h2>
                    <UpdateProductForm
                        values={values}
                        setValues={setValues}
                        // categories={categories}
                        subCategories={subCategories}
                        arraySubCategories={arraySubCategories}
                        setArraySubCategories={setArraySubCategories}
                        selectedCategory={selectedCategory}
                        loading={loading}
                        setLoading={setLoading}
                        handleSubmitProduct={handleSubmitProduct}
                        handleChange={handleChange}
                        handleCategoryChange={handleCategoryChange}
                    />
                </div>
            </div>
        </DashboardLayout>
    );
};

export default UpdateProduct;

export const getServerSideProps: GetServerSideProps = async () => {
    const { data } = await getListOfCategory();
    const { data: colorsData } = await getListOfColor();
    const { data: sizesData } = await getListOfSizes();
    const { data: brandsData } = await getListOfBrands();
    return {
        props: {
            categories: data,
            colorsData:colorsData && colorsData.map(c=> {
                return {
                    label:c.name,
                    value:c._id
                }
            }),
            sizesData: sizesData && sizesData.map(s=> {
                return {
                    label:s.name,
                    value:s._id
                }
            }),
            brandsData,
        },
    };
};
