import { UploadFile } from "antd";
import { useState } from "react";
import { UseFormReset, useForm } from "react-hook-form";

import FormGroup from "../../../Molecules/Form/FormInputGroup";
import FormRichTextGroup from "../../../Molecules/Form/FormRichTextGroup";
import FormSelectGroup from "../../../Molecules/Form/FormSelectGroup";
import FormTextAreaGroup from "../../../Molecules/Form/FormTextAreaGroup";
import AntdUploadImage from "../../../Molecules/Upload/Images/MultiImageUpload/AntdUploadImage";

import { IBrand } from "../../../../types/brand.types";
import { ICategory } from "../../../../types/category.type";
import { IColor } from "../../../../types/color.types";
import { ISize } from "../../../../types/size.types";
import { ISubCategory } from "../../../../types/sub-category.type";
import { ArrayDataModifyHelpers } from "../../../../utils/arrayDataModify";
import Button from "../../../Atoms/Button/Button";
import { ICreateProductForm } from "./CreateProductForm.types";

type CreateProductFormType = {
    handleAddProduct: (
        data: ICreateProductForm,
        reset: UseFormReset<ICreateProductForm>,
        setImageFiles: React.Dispatch<React.SetStateAction<UploadFile[]>>
    ) => void;
    sizes: ISize[];
    colors: IColor[];
    categories: ICategory[];
    subCategories: ISubCategory[];
    brands: IBrand[];
    loading: boolean;
};

const CreateProductForm = ({
    handleAddProduct,
    sizes,
    colors,
    categories,
    brands,
    loading,
    subCategories,
}: CreateProductFormType) => {
    // state
    const [imageFiles, setImageFiles] = useState<UploadFile[]>([]);

    // react hook form
    const {
        handleSubmit,
        register,
        control,
        formState: { errors },
        reset,
    } = useForm<ICreateProductForm>({
        defaultValues: {
            productName: "",
            metaName: "",
            description: "",
        },
    });

    // submit handler to submit data to server
    const handleControlProduct = (data: ICreateProductForm) => {
        handleAddProduct(
            { ...data, productImgFiles: imageFiles },
            reset,
            setImageFiles
        );
    };

    return (
        <form
            onSubmit={handleSubmit(handleControlProduct)}
            className="lg:mt-5 md:mt-0 mt-0"
        >
            <div className="grid grid-cols-2">
                <AntdUploadImage
                    fileList={imageFiles}
                    setFileList={setImageFiles}
                    isError={imageFiles?.length > 0 ? false : true}
                    maxCount={5}
                />
            </div>
            <div className="grid md:gap-x-5 lg:mb-5 lg:grid-cols-2 grid-cols-1 md:grid-cols-1 mb-2 md:mb-0 gap-x-3 gap-y-2">
                <div>
                    <FormGroup
                        register={register}
                        inputName={"productName"}
                        labelName={"Product Name"}
                        errors={errors.productName}
                        inputType={"text"}
                        placeholder={"Enter Your Product Name"}
                        errorMessage={"Product Title Is Required!"}
                        className={"drop-shadow-md"}
                    />
                </div>
                <div>
                    <FormGroup
                        register={register}
                        inputName={"price"}
                        labelName={"Price"}
                        errors={errors.price}
                        inputType={"number"}
                        placeholder={"Enter Your Product Price"}
                        errorMessage={"Product Price Is Required!"}
                        className={"drop-shadow-md"}
                    />
                </div>
                <div className="col-span-2">
                    <FormTextAreaGroup
                        register={register}
                        inputType="text"
                        inputName={"metaName"}
                        labelName={"Meta Title"}
                        errors={errors?.metaName}
                        placeholder={"Provide Product Description Here!"}
                        errorMessage={
                            "Product Product Description Is Required!"
                        }
                        className={"drop-shadow-md"}
                    />
                </div>

                <div>
                    <FormGroup
                        register={register}
                        inputName={"discount"}
                        labelName={"Discount"}
                        errors={errors.discount}
                        inputType={"number"}
                        placeholder={"Enter Your Product Discount"}
                        errorMessage={"Product Price Discount Is Required!"}
                        className={"drop-shadow-md"}
                    />
                </div>
                <div>
                    <FormGroup
                        register={register}
                        inputName={"quantity"}
                        labelName={"Quantity"}
                        errors={errors.quantity}
                        inputType={"number"}
                        className={"drop-shadow-md"}
                        placeholder={"Enter Your Product Quantity"}
                        errorMessage="Product Price Quantity Is Required!"
                    />
                </div>
                <div>
                    <FormSelectGroup
                        options={ArrayDataModifyHelpers.arrayDataToOptions(
                            categories,
                            "name",
                            {
                                id: "categoryId",
                                name: "name",
                            },
                            {
                                id: "_id",
                                name: "name",
                            }
                        )}
                        placeholder={"Select Product Category"}
                        labelName={"Category"}
                        selectName={"category"}
                        control={control}
                        errors={errors.category}
                        errorMessage={"Product Category Is Required!"}
                    />
                </div>
                <div>
                    <FormSelectGroup
                        options={ArrayDataModifyHelpers.arrayDataToOptions(
                            subCategories,
                            "name",
                            {
                                id: "subCategoryId",
                                name: "name",
                            },
                            {
                                id: "_id",
                                name: "name",
                            }
                        )}
                        placeholder={"Select Product Sub Category"}
                        labelName={"Sub Category"}
                        selectName={"subCategories"}
                        control={control}
                        mode={"multiple"}
                        errors={errors.subCategories}
                        errorMessage={"Product Sub Category Is Required!"}
                    />
                </div>
                <div>
                    <FormSelectGroup
                        options={ArrayDataModifyHelpers.arrayDataToOptions(
                            brands,
                            "name",
                            {
                                id: "brandId",
                                name: "name",
                            },
                            {
                                id: "_id",
                                name: "name",
                            }
                        )}
                        placeholder={"Select Product Brand"}
                        labelName={"Brand"}
                        selectName={"brand"}
                        control={control}
                        errors={errors.brand}
                        errorMessage={"Product Brand Is Required!"}
                    />
                </div>
                <div>
                    <FormSelectGroup
                        options={ArrayDataModifyHelpers.arrayDataToOptions(
                            colors,
                            "name",
                            {
                                id: "colorId",
                                name: "name",
                            },
                            {
                                id: "_id",
                                name: "name",
                            }
                        )}
                        placeholder={"Select Product Color"}
                        labelName={"Color"}
                        selectName={"colors"}
                        control={control}
                        errors={errors.colors}
                        mode={"multiple"}
                        errorMessage={"Product Color Is Required!"}
                    />
                </div>
                <div>
                    <FormSelectGroup
                        options={ArrayDataModifyHelpers.arrayDataToOptions(
                            sizes,
                            "name",
                            {
                                id: "sizeId",
                                name: "name",
                            },
                            {
                                id: "_id",
                                name: "name",
                            }
                        )}
                        placeholder={"Select Product Size"}
                        labelName={"Size"}
                        selectName={"sizes"}
                        control={control}
                        errors={errors.sizes}
                        mode={"multiple"}
                        errorMessage={"Product Size Is Required!"}
                    />
                </div>
            </div>

            <div>
                <FormRichTextGroup
                    inputName={"description"}
                    labelName={"Description"}
                    control={control}
                    errors={errors?.description}
                    placeholder={"Provide Product Description Here!"}
                    errorMessage={"Product Product Description Is Required!"}
                />
            </div>
            <div className="mt-5">
                <Button
                    className={`text-white py-3 px-4 disabled:cursor-not-allowed hover:shadow-green-500/40 bg-green-500 shadow-green-500/20`}
                    label={loading ? "Loading" : "Add Product"}
                    type="submit"
                    disabled={loading}
                />
            </div>
        </form>
    );
};

export default CreateProductForm;
