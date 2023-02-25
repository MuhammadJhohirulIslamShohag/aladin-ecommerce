import React, { useEffect, useState } from "react";
import { getListOfCategory, subCategoryOnCategory } from "@/api/category";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import { ICategories } from "types/category.type";
import { useStoreContext } from "@/lib/contexts/StoreContextProvider";
import { createProduct } from "@/api/products";
import toast from "react-hot-toast";
import CreateProductForm from "@/components/Form/CreateProduct/CreateProductForm";
import { getListOfColor } from "@/api/color";
import { getListOfSizes } from "@/api/size";
import { GetServerSideProps } from "next";

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
    sizes:[],
    brand: "",
    brands: ["Apple", "Life-Digital", "Samsung", "ASUS", "Lenovo", "HP"],
    category: "",
    categories: [],
    subCategory: [],
};

const AddProduct = ({categories,colorsData,sizesData}:any) => {
    const [values, setValues] = useState({...initialValues,categories:categories, colorsData:colorsData, sizesData:sizesData});
    const [subCategories, setSubCategories] = useState([]);
    const [isShow, setIsShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const { state } = useStoreContext();
    const { user } = state;
    

    const handleChangeCategory = (event: any) => {
        console.log(event, "event");
        setValues({
            ...values,
            subCategory: [],
            category: event.target.value,
        });
        if (event.target.value === "Select Category") {
            setIsShow(false);
        } else {
            console.log(event.target.value, "target");
            subCategoryOnCategory(user!.token, event.target.value)
                .then((res) => {
                    setSubCategories(res.data);
                })
                .catch((error) => {
                    console.log(error);
                    setIsShow(false);
                });
            setIsShow(true);
        }
    };

    const handleAddProduct = (data: any, reset: any) => {
        setLoading(true);
        const updateSubCategory = values.subCategory.map(
            (sc: { value: string; label: string }) => sc.value
        );
        const updateColors = values.colors.map(
            (c: { value: string; label: string }) => c.value
        );
        const updateSizes = values.sizes.map(
            (s: { value: string; label: string }) => s.value
        );
        const updatedValues = {
            ...values,
            subCategory: updateSubCategory,
            title: data.productName,
            description: data.description,
            price: data.price,
            quantity: data.quantity,
            colors: updateColors,
            sizes: updateSizes,
            brand: data.brand,
            shipping: data.shipping,
            discount: data.discount,
            category: data.productCategory,
        };
        createProduct(user!.token, updatedValues)
            .then((res) => {
                setLoading(false);
                window.alert(`${res.data.title} Product Created!`);
                reset();
            })
            .catch((error: any) => {
                if (error.response.status === 400) {
                    toast.error(`${error.data.error}`);
                }
                setLoading(false);
            });
    };
    return (
        <DashboardLayout>
            <div className="container py-10">
                <div className="bg-secondary p-6 rounded-lg">
                    <h2 className="text-center font-semibold text-primary text-2xl">
                        Add New Product
                    </h2>
                    <CreateProductForm
                        handleAddProduct={handleAddProduct}
                        handleChangeCategory={handleChangeCategory}
                        subCategories={subCategories}
                        values={values}
                        setValues={setValues}
                        isShow={isShow}
                        loading={loading}
                        setLoading={setLoading}
                    />
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AddProduct;

export const getServerSideProps: GetServerSideProps = async () => {
    const { data } = await getListOfCategory();
    const { data:colorsData } = await getListOfColor();
    const { data: sizesData } = await getListOfSizes();
    return {
        props: {
            categories: data,
            colorsData,
            sizesData
        },
    };
};
