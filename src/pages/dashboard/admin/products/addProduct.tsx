import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getListOfCategory, subCategoryOnCategory } from "@/api/category";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import { ICategories } from "types/category.type";
import { useStoreContext } from "@/lib/contexts/StoreContextProvider";
import { createProduct } from "@/api/products";
import toast from "react-hot-toast";
import CreateProductForm from "@/components/Form/CreateProduct/CreateProductForm";


const initialValues = {
    title: "",
    description: "",
    images: [],
    price: "",
    shipping: "",
    quantity: "",
    color: "",
    colors: ["Green", "Black", "Red", "White"],
    brand: "",
    brands: ["Apple", "Life-Digital", "Samsung", "ASUS", "Lenvo", "HP"],
    category: "",
    categories: [],
    subCategory: [],
};

const AddProduct = () => {
    const [values, setValues] = useState(initialValues);
    const [subCategories, setSubCategories] = useState([]);
    const [isShow, setIsShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const { state } = useStoreContext();
    const { user } = state;

    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
    } = useForm();

    useEffect(() => {
        loadingCategories();
    }, []);

    const loadingCategories = () => {
        getListOfCategory().then((res) => {
            setValues({
                ...values,
                categories: res.data,
            });
        });
    };
    const handleChange = (event: any) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };
    const handleChangeCategory = (event: any) => {
        console.log(event, "event")
        setValues({
            ...values,
            subCategory: [],
            category: event.target.value,
        });
        if (event.target.value === "Select Category") {
            setIsShow(false);
        } else {
            console.log(event.target.value, "target")
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

    const handleAddProduct = (data: any) => {
        setLoading(true); 
        const b = values.subCategory.map((sc:{value:string; label:string}) => sc.value);
        

        const a = {...values, subCategory: b}
        console.log(a,data);
        // createProduct(user!.token, values)
        //     .then((res) => {
        //         setLoading(false);
        //         window.alert(`${res.data.title} Product Created!`);
        //         window.location.reload();
        //     })
        //     .catch((error: any) => {
        //         if (error.response.status === 400) {
        //             toast.error(`${error.data.error}`);
        //         }
        //         setLoading(false);
        //     });
    };
    return (
        <DashboardLayout>
            <div className="container py-10">
                <div className="bg-secondary p-6 rounded-lg">
                    <h2 className="text-center font-semibold text-primary text-2xl">
                        Add New Product
                    </h2>
                    <CreateProductForm
                        handleSubmit={handleSubmit}
                        register={register}
                        errors={errors}
                        handleAddProduct={handleAddProduct}
                        handleChange={handleChange}
                        handleChangeCategory={handleChangeCategory}
                        subCategories={subCategories}
                        values={values}
                        setValues={setValues}
                        isShow={isShow}
                        loading={loading}
                    />
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AddProduct;
