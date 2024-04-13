// import toast from "react-hot-toast";
import { UploadFile } from "antd";
import React from "react";
import { UseFormReset } from "react-hook-form";
import CreateProductForm from "../../../components/Organisms/Form/CreateProduct/CreateProductForm";
import { ICreateProductForm } from "../../../components/Organisms/Form/CreateProduct/CreateProductForm.types";
import { useGetBrandsQuery } from "../../../redux/services/brand/brandApi";
import { useGetCategoriesQuery } from "../../../redux/services/category/categoryApi";
import { useGetColorsQuery } from "../../../redux/services/color/colorApi";
import { useCreateProductMutation } from "../../../redux/services/product/productApi";
import { useGetSizesQuery } from "../../../redux/services/size/sizeApi";
import { useGetSubCategoriesQuery } from "../../../redux/services/subCategory/subCategoryApi";

const AddProductPage = () => {
    const { data: categoryData } = useGetCategoriesQuery({});
    const { data: subCategoryData } = useGetSubCategoriesQuery({});
    const { data: brandData } = useGetBrandsQuery({});
    const { data: colorData } = useGetColorsQuery({});
    const { data: sizeData } = useGetSizesQuery({});

    const [createProduct, { isLoading }] = useCreateProductMutation();

    const handleAddProduct = (
        data: ICreateProductForm,
        reset: UseFormReset<ICreateProductForm>,
        setImageFiles: React.Dispatch<React.SetStateAction<UploadFile[]>>
    ) => {
        console.log(data, "data");
        reset();
        setImageFiles([]);
        // setLoading(true);
        // let updateSubCategory;
        // let updateColors;
        // let updateSizes;
        // if (
        //     Array.isArray(data.subCategory) &&
        //     Array.isArray(data.colors) &&
        //     Array.isArray(data.sizes)
        // ) {
        //     updateSubCategory = data.subCategory.map(
        //         (sc: { value: string; label: string }) => sc.value
        //     );
        //     updateColors = data.colors.map(
        //         (c: { value: string; label: string }) => c.value
        //     );
        //     updateSizes = data.sizes.map(
        //         (s: { value: string; label: string }) => s.value
        //     );
        // }
        // const updatedValues = {
        //     ...values,
        //     subCategory: updateSubCategory,
        //     title: data.productName,
        //     description: data.description,
        //     price: data.price,
        //     quantity: data.quantity,
        //     colors: updateColors,
        //     sizes: updateSizes,
        //     brand: data.brand,
        //     shipping: data.shipping,
        //     discount: data.discount,
        //     category: data.productCategory,
        // };
        // createProduct(user!.token, updatedValues)
        //     .then((res) => {
        //         setLoading(false);
        //         toast.success(`${res.data.title} Product Created!`);
        //         subCategoryRef.clearValue();
        //         sizeRef.clearValue();
        //         colorRef.clearValue();
        //         // window.location.reload();
        //         reset();
        //         setValues({ ...values, images: [] });
        //     })
        //     .catch((error: any) => {
        //         if (error.response.status === 400) {
        //             toast.error(`${error.data.error}`);
        //         }
        //         setLoading(false);
        //     });
    };
    return (
        <div>
            <div className="bg-secondary px-9 pt-10  pb-9 rounded-lg">
                <h2 className="text-center font-semibold text-primary text-2xl">
                    Add New Product
                </h2>
                <CreateProductForm
                    handleAddProduct={handleAddProduct}
                    sizes={sizeData?.data}
                    colors={colorData?.data}
                    categories={categoryData?.data}
                    brands={brandData?.data}
                    loading={isLoading}
                    subCategories={subCategoryData?.data}
                />
            </div>
        </div>
    );
};

export default AddProductPage;
