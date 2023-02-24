import React from "react";
import Select, { OnChangeValue } from 'react-select';
import makeAnimated from "react-select/animated";
import { useForm } from "react-hook-form";
import { ICategories } from "types/category.type";
import { ISubCategories } from "types/sub-category.type";
import FormGroup from "../FormGroup";

const animatedComponents = makeAnimated();
type CreateProductFormType = {
    handleAddProduct: any;
    handleSubmit:any;
    handleChange: any;
    register:any;
    errors:any;
    handleChangeCategory: any;
    values: any;
    setValues: any;
    subCategories: ISubCategories[];
    isShow: boolean;
    loading: boolean;
};

const CreateProductForm = (props: CreateProductFormType) => {
    const {
        handleAddProduct,
        handleChange,
        handleChangeCategory,
        handleSubmit,
        values,
        errors,
        setValues,
        subCategories,
        register,
        isShow,
        loading,
    } = props;
    const {
        title,
        description,
        price,
        quantity,
        colors,
        brands,
        categories,
        subCategory,
    } = values;
    console.log(errors)
    return (
        <form onSubmit={handleSubmit(handleAddProduct)} className="mt-5">
            <div className="grid grid-cols-2">
                <div className="my-5">
                    <input
                        type="file"
                        {...register("productImg", {
                            required: "product Img Is Required!",
                        })}
                        className="file-input file-input-bordered file-input-success w-full max-w-xs"
                    />
                </div>
            </div>
            <div className="grid gap-6 mb-6 grid-cols-2">
                <div>
                    <FormGroup
                        register={register}
                        inputName={"productName"}
                        labelName={"Product Name"}
                        errorField={errors.productName}
                        inputType={"text"}
                        placeholder={"Enter Your Product Name"}
                        required="Product Title Is Required!"
                    />
                </div>

                <div>
                    <FormGroup
                        register={register}
                        inputName={"price"}
                        labelName={"Price"}
                        errorField={errors.price}
                        inputType={"text"}
                        placeholder={"Enter Your Product Price"}
                        required="Product Price Is Required!"
                    />
                </div>
                <div>
                    <FormGroup
                        register={register}
                        inputName={"discount"}
                        labelName={"Discount"}
                        errorField={errors.discount}
                        inputType={"number"}
                        placeholder={"Enter Your Product Discount"}
                        required="Product Price Discount Is Required!"
                    />
                </div>
                <div>
                    <FormGroup
                        register={register}
                        inputName={"quantity"}
                        labelName={"Quantity"}
                        errorField={errors.quantity}
                        inputType={"number"}
                        placeholder={"Enter Your Product Quantity"}
                        required="Product Price Quantity Is Required!"
                    />
                </div>
            </div>
            <div className="mb-6">
                <label
                    htmlFor="productCategory"
                    className="block mb-2 text-sm font-medium text-primary"
                >
                    Category
                </label>
                <select
                    className="select select-success w-full max-w-xs text-primary text-base"
                    {...register("productCategory", {
                        required: "Product Category Is Required!",
                        onChange: (e:any) => handleChangeCategory(e)
                    })}
                >
                    <option>Select Category</option>
                    {categories.map((category:any) => (
                        <option
                            className="text-sm"
                            key={category._id}
                            value={category._id}
                        >
                            {category.name}
                        </option>
                    ))}
                </select>
                {errors.productCategory && (
                    <p className="text-red-600">
                        {errors.productCategory?.message}
                    </p>
                )}
            </div>
            {isShow && (
                <div className="mb-6">
                    <label
                        htmlFor="subCategory"
                        className="block mb-2 text-sm font-medium text-primary"
                    >
                        Sub Category
                    </label>
                    <Select
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        isMulti
                        options={subCategories.map(sc=> {
                            const scObject = {
                                label: sc.name,
                                value:sc._id
                            }
                            return scObject;
                        })}
                        value={subCategory}
                        onChange={(newValue:OnChangeValue<{ label:string; value:string}, true>) =>
                            setValues({ ...values, subCategory: newValue})
                        }
                    />
                </div>
            )}
            <div className="mb-6">
                <label
                    htmlFor="brand"
                    className="block mb-2 text-sm font-medium text-primary"
                >
                    Brand
                </label>
                <select
                    className="select select-success w-full max-w-xs text-primary text-base"
                    {...register("brand", {
                        required: "Product Brand Is Required!",
                    })}
                >
                    <option>Select Brand</option>
                    {brands.map((brand:string) => (
                        <option
                            className="text-sm"
                            key={brand} 
                            value={brand}
                        >
                            {brand}
                        </option>
                    ))}
                </select>
                {errors.brand && (
                    <p className="text-red-600">
                        {errors.brand?.message}
                    </p>
                )}
            </div>
            <div className="mb-6">
                <label
                    htmlFor="color"
                    className="block mb-2 text-sm font-medium text-primary"
                >
                    Color
                </label>
                <select
                    className="select select-success w-full max-w-xs text-primary text-base"
                   {...register('color', { required: true })}
                >
                    <option >Select Color</option>
                    {colors.map((color:string) => (
                        <option
                            className="text-sm"
                            key={color} 
                            value={color}
                        >
                            {color}
                        </option>
                    ))}
                </select>
                {errors.color && (
                    <p className="text-red-600">
                        {errors.color?.message}
                    </p>
                )}
            </div>

            <div>
                <FormGroup
                    register={register}
                    inputName={"description"}
                    labelName={"Description"}
                    errorField={errors?.description}
                    placeholder={"Provide Product Description Here!"}
                    required="Product Product Description Is Required!"
                />
            </div>
            <button
                disabled={loading}
                type="submit"
                value="Add Product"
                className="btn hover:bg-transparent hover:text-primary text-white btn-primary disabled:opacity-75 disabled:border-2 disabled:border-primary disabled:text-primary mt-2"
            >
                {loading ? "Loading" : "Add Product"}
            </button>
        </form>
    );
};

export default CreateProductForm;
