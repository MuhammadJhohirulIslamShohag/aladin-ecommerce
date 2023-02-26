import React, { useState, useEffect } from "react";
import { getProduct, updateProduct } from "@/api/products";
import { useRouter } from "next/router";
import { IProduct } from "types/product.type";
import { useStoreContext } from "@/lib/contexts/StoreContextProvider";
import { getListOfCategory, subCategoryOnCategory } from "@/api/category";
import { ICategories } from "types/category.type";
import toast from "react-hot-toast";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import UpdateProduct from './../../../../components/Form/UpdateProduct/UpdateProduct';


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
    sizes: [],
    brand: "",
    brands: [],
    category: "",
    categories: [],
    subCategory: [],
};

const UpdateProduct = () => {
    const [values, setValues] = useState(initialValues);
    const [selectedCategory, setSelectedCategory] = useState();
    const [categories, setCategories] = useState([]);
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
        loadingCategory();
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
                let array: any[] = [];
                res.data.subCategory.map((d: any) => {
                    return array.push(d._id);
                });
                setArraySubCategories((prev: any[]) => array);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const loadingCategory = () => {
        getListOfCategory()
            .then((res) => {
                setCategories(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

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
                setSubCategories(res.data);
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
                    <UpdateProduct
                        values={values}
                        setValues={setValues}
                        categories={categories}
                        subCategories={subCategories}
                        arraySubCategories={arraySubCategories}
                        setArraySubCategories={setArraySubCategories}
                        selectedCategory={selectedCategory}
                        loading={loading}
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
