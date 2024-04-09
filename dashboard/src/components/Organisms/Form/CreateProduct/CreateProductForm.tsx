/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormReset, UseFormSetValue, useForm } from "react-hook-form";
import { IFormInput } from "./FormInput.types";
// import ImageFileUploadForm from "../ImageFileUploadForm/ImageFileUploadForm";
import FormGroup from "../../../Molecules/Form/FormInputGroup";
import FormTextAreaGroup from "../../../Molecules/Form/FormTextAreaGroup";
// import SelectInput from "../../../Molecules/Form/SelectInput";
// import MultiSelect from "../../../Molecules/Form/MultiSelect";

type CreateProductFormType = {
    handleAddProduct: (
        data: IFormInput,
        reset: UseFormReset<IFormInput>,
        setValue: UseFormSetValue<IFormInput>
    ) => void;
};

const CreateProductForm = (props: CreateProductFormType) => {
    const { handleAddProduct } = props;

    const {
        handleSubmit,
        register,
        // control,
        setValue,
        watch,
        formState: { errors },
        reset,
    } = useForm<IFormInput>({
        defaultValues: {
            productName: "",
        },
    });

    console.log(watch("description"), "errors");

    return (
        <form
            onSubmit={handleSubmit((data) =>
                handleAddProduct(data, reset, setValue)
            )}
            className="mt-5 md:mt-0 sm:mt-0"
        >
            <div className="grid grid-cols-2">
                {/* <ImageFileUploadForm
                    values={values}
                    setValues={setValues}
                    setLoading={setLoading}
                    errorField={errors.productImg}
                    register={register}
                /> */}
            </div>
            <div className="grid gap-6 mb-6 grid-cols-2 sm:grid-cols-1 md:grid-cols-1 sm:mb-2 md:mb-0 sm:gap-3">
                <div>
                    <FormGroup
                        register={register}
                        inputName={"productName"}
                        labelName={"Product Name"}
                        errors={errors.productName}
                        inputType={"text"}
                        placeholder={"Enter Your Product Name"}
                        errorMessage={"Product Title Is Required!"}
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
                    />
                </div>
                <div>
                    <FormGroup
                        register={register}
                        inputName={"quantity"}
                        labelName={"Quantity"}
                        errors={errors.quantity}
                        inputType={"number"}
                        placeholder={"Enter Your Product Quantity"}
                        errorMessage="Product Price Quantity Is Required!"
                    />
                </div>
            </div>
            {/* <div className="mb-6 sm:mb-3 md:mb-3">
                <SelectInput
                    dataArray={categories}
                    labelName={"Product Category"}
                    inputName={"productCategory"}
                    register={register}
                    errors={errors.productCategory}
                    errorMessage={"Product Category Is Required!"}
                />
            </div> */}
            {/* {isShow && (
                <div className="mb-6 sm:mb-3 md:mb-3">
                    <MultiSelect
                        dataArray={subCategories}
                        valueData={subCategory}
                        placeholder={"Select the Sub Category"}
                        multiLabel={"Sub Category"}
                        multiName={"subCategory"}
                        required={"Sub Category Is Required!"}
                        errorFields={errors.subCategory}
                        control={control}
                        setValueRef={setSubCategoryRef}
                    />
                </div>
            )} */}
            {/* <div className="mb-6 sm:mb-3 md:mb-3">
                <SelectInput
                    dataArray={brands}
                    labelName={"Brand"}
                    inputName={"brand"}
                    register={register}
                    errorField={errors.brand}
                    required={{
                        required: "Product Brand Is Required!",
                    }}
                />
            </div> */}
            {/* <div className="mb-6 sm:mb-3 md:mb-3">
                <MultiSelect
                    dataArray={colorsData}
                    valueData={colors}
                    placeholder={"Select the Colors"}
                    multiLabel={"Product Colors"}
                    multiName={"colors"}
                    required={"Color Is Required!"}
                    errorFields={errors.colors}
                    control={control}
                    setValueRef={setColorRef}
                />
            </div> */}
            {/* <div className="mb-6 sm:mb-3 md:mb-3">
                <MultiSelect
                    dataArray={sizesData}
                    valueData={sizes}
                    placeholder={"Select the Sizes"}
                    multiLabel={"Product Sizes"}
                    multiName={"sizes"}
                    required={"Size Is Required!"}
                    errorFields={errors.sizes}
                    control={control}
                    setValueRef={setSizeRef}
                />
            </div> */}

            {/* <div className="mb-6 sm:mb-3 md:mb-3">
                <SelectInput
                    dataArray={["Yes", "No"]}
                    labelName={"Shipping"}
                    inputName={"shipping"}
                    register={register}
                    errorField={errors.shipping}
                    required={{
                        required: "Product Shipping Is Required!",
                    }}
                />
            </div> */}

            <div>
                <FormTextAreaGroup
                    register={register}
                    inputType="text"
                    inputName={"description"}
                    labelName={"Description"}
                    errors={errors?.description}
                    placeholder={"Provide Product Description Here!"}
                    errorMessage="Product Product Description Is Required!"
                />
            </div>
            <button
                // disabled={loading}
                type="submit"
                value="Add Product"
                className="btn hover:bg-transparent hover:text-primary text-white btn-primary disabled:opacity-75 disabled:border-2 disabled:border-primary disabled:text-primary mt-2"
            >
                {/* {loading ? "Loading" : "Add Product"} */}Add Product
            </button>
        </form>
    );
};

export default CreateProductForm;
