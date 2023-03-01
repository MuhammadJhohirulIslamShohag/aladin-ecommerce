import { DefaultValues, useForm } from "react-hook-form";
import { ISubCategories } from "types/sub-category.type";
import FormGroup from "../FormGroup";
import ImageFileUploadForm from "../ImageFileUploadForm/ImageFileUploadForm";
import MultiSelect from "../MultiSelect";
import SelectInput from "../SelectInput";
import React, { useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { IFormInput } from "../CreateProduct/FormInput.types";
const animatedComponents = makeAnimated();
const customStyles = {
    option: (provided: any, state: any) => ({
        ...provided,
        borderBottom: "1px solid transparent",
        color: state.isSelected ? "#fff" : "black",
    }),
};

const UpdateProductForm = ({
    handleSubmitProduct,
    handleChange,
    handleCategoryChange,
    setArraySubCategories,
    setValues,
    values,
    loading,
    // categories,
    subCategories,
    selectedCategory,
    arraySubCategories,
    setLoading,
}: any) => {
    const [value, setValue] = useState(
        values.colors.map((c) => {
            return {
                label: c.name,
                value: c._id,
            };
        })
    );

    const onChange = (newValue) => {
        setValue(newValue);
    };

    const {
        title,
        description,
        price,
        discount,
        shipping,
        colors,
        color,
        brands,
        sizesData,
        sizes,
        brand,
        category,
        quantity,
        brandData,
        colorsData,
        categories,
    } = values;
    console.log(value, "value", values, "selectedCategory", selectedCategory);

    const {
        handleSubmit,
        register,
        control,
        formState: { errors },
        reset,
    } = useForm<IFormInput>();


    return (
        <form
            onSubmit={handleSubmit((data) =>
                handleSubmitProduct(data, reset, setValue)
            )}
            className="mt-5"
        >
            <div className="grid grid-cols-2">
                <ImageFileUploadForm
                    values={values}
                    setValues={setValues}
                    setLoading={setLoading}
                    errorField={errors.productImg}
                    register={register}
                />
            </div>
            <div className="grid gap-6 mb-6 grid-cols-2">
                <div>
                    {title && (
                        <FormGroup
                            register={register}
                            isDefaultValue
                            defaultValue={title}
                            inputName={"productName"}
                            labelName={"Product Name"}
                            errorField={errors.productName}
                            inputType={"text"}
                            placeholder={"Enter Your Product Name"}
                            required="Product Title Is Required!"
                        />
                    )}
                </div>

                <div>
                    {
                        price && (
                            <FormGroup
                            register={register}
                            inputName={"price"}
                            labelName={"Price"}
                            isDefaultValue
                            defaultValue={price}
                            errorField={errors.price}
                            inputType={"number"}
                            placeholder={"Enter Your Product Price"}
                            required="Product Price Is Required!"
                        />
                        )
                    }
                   
                </div>
                <div>
                    {discount && (
                        <FormGroup
                        register={register}
                        inputName={"discount"}
                        labelName={"Discount"}
                        isDefaultValue
                        defaultValue={discount}
                        errorField={errors.discount}
                        inputType={"number"}
                        placeholder={"Enter Your Product Discount"}
                        required="Product Price Discount Is Required!"
                    />
                    )}
                    
                </div>
                <div>
                    {
                       quantity && (
<FormGroup
                        register={register}
                        inputName={"quantity"}
                        labelName={"Quantity"}
                        isDefaultValue
                        defaultValue={quantity}
                        errorField={errors.quantity}
                        inputType={"number"}
                        placeholder={"Enter Your Product Quantity"}
                        required="Product Price Quantity Is Required!"
                    />
                       ) 
                    }
                    
                </div>
            </div>
            <div className="mb-6">
                {(selectedCategory || category._id) && (
                    <SelectInput
                    register={register}
                    dataArray={categories}
                    labelName={"Product Category"}
                    inputName={"productCategory"}
                    isDefaultValue
                    defaultValue={
                        selectedCategory ? selectedCategory : category._id
                    }
                    errorField={errors.productCategory}
                    required={{
                        required: "Product Category Is Required!",
                        onChange: (e: any) => handleCategoryChange(e),
                    }}
                />
                )}
                
            </div>
            <div className="mb-6">
                {brand._id && (
                    <SelectInput
                        dataArray={brandData}
                        labelName={"Brand"}
                        inputName={"brand"}
                        register={register}
                        isDefaultValue
                        defaultValue={brand._id}
                        errorField={errors.brand}
                        required={{
                            required: "Product Brand Is Required!",
                        }}
                    />
                )}
            </div>
            {/* <div className="mb-6">
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
            {/* <div className="mb-6">
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

            <div className="mb-6">
                <SelectInput
                    dataArray={["Yes", "No"]}
                    labelName={"Shipping"}
                    inputName={"shipping"}
                    isDefaultValue
                    defaultValue={shipping === "Yes" ? "Yes" : "No"}
                    register={register}
                    errorField={errors.shipping}
                    required={{
                        required: "Product Shipping Is Required!",
                    }}
                />
            </div>

            <div>
                {description && (
                    <FormGroup
                        register={register}
                        inputName={"description"}
                        labelName={"Description"}
                        isDefaultValue
                        defaultValue={description}
                        errorField={errors?.description}
                        placeholder={"Provide Product Description Here!"}
                        required="Product Product Description Is Required!"
                    />
                )}
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
        // <form onSubmit={handleSubmitProduct}>
        //     <div className="form-group">
        //         <label>Title</label>
        //         <input
        //             type="text"
        //             name="title"
        //             className="form-control"
        //             value={title}
        //             onChange={handleChange}
        //         />
        //     </div>

        //     <div className="form-group">
        //         <label>Description</label>
        //         <input
        //             type="text"
        //             name="description"
        //             className="form-control"
        //             value={description}
        //             onChange={handleChange}
        //         />
        //     </div>

        //     <div className="form-group">
        //         <label>Price</label>
        //         <input
        //             type="number"
        //             name="price"
        //             className="form-control"
        //             value={price}
        //             onChange={handleChange}
        //         />
        //     </div>

        //     <div className="form-group">
        //         <label>Shipping</label>
        //         <select
        //             name="shipping"
        //             className="form-control"
        //             onChange={handleChange}
        //             value={shipping === "Yes" ? "Yes" : "No"}
        //         >
        //             <option value="Yes">Yes</option>
        //             <option value="No">No</option>
        //         </select>
        //     </div>

        //     <div className="form-group">
        //         <label>Quantity</label>
        //         <input
        //             type="number"
        //             name="quantity"
        //             className="form-control"
        //             value={quantity}
        //             onChange={handleChange}
        //         />
        //     </div>

        //     <div className="">
        //         <label>Colors</label>
        //         <Select
        //         className="react-select-container bg-white border border-green-300 text-sm rounded-md block  text-black font-semibold"
        //         closeMenuOnSelect={false}
        //         components={animatedComponents}
        //         isMulti

        //         options={colorsData}
        //         value={value}
        //         onChange={onChange}
        //         classNamePrefix="react-select"
        //         placeholder={"placeholder"}
        //         theme={(theme:any) => ({
        //             ...theme,
        //             borderRadius: 0,
        //             colors: {
        //                 ...theme.colors,
        //                 primary25: "#d4d4d8",
        //                 primary: "#d4d4d8",
        //             },
        //         })}
        //         styles={customStyles}
        //         isClearable
        //         />
        //     </div>
        //     <div className="">
        //         <label>Sizes</label>
        //         <Select
        //         className="react-select-container bg-white border border-green-300 text-sm rounded-md block  text-black font-semibold"
        //         closeMenuOnSelect={false}
        //         components={animatedComponents}
        //         isMulti

        //         value={sizes && sizes.map(s=> {
        //             return {
        //                 label:s.name,
        //                 value:s._id
        //             }
        //         })}
        //         options={sizesData}

        //         onChange={(value)=> console.log(value)}
        //         classNamePrefix="react-select"
        //         placeholder={"placeholder"}
        //         theme={(theme:any) => ({
        //             ...theme,
        //             borderRadius: 0,
        //             colors: {
        //                 ...theme.colors,
        //                 primary25: "#d4d4d8",
        //                 primary: "#d4d4d8",
        //             },
        //         })}
        //         styles={customStyles}
        //         isClearable
        //         />
        //     </div>
        //     <div className="form-group">
        //         <label>Brand</label>
        //         <select
        //             name="brand"
        //             className="form-control"
        //             onChange={handleChange}
        //             value={brand?._id}
        //         >
        //             {brandData &&
        //                 brandData.map((brand:any) => (
        //                     <option key={brand._id} value={brand._id}>
        //                         {brand.name}
        //                     </option>
        //                 ))}
        //         </select>
        //     </div>
        //     <div className="form-group">
        //         <label>Category</label>
        //         <select
        //             name="category"
        //             className="form-select"
        //             aria-label="Default select example"
        //             onChange={handleCategoryChange}
        //             value={selectedCategory ? selectedCategory : category._id}
        //         >
        //             {categories &&
        //                 categories.length &&
        //                 categories.map((category:any) => (
        //                     <option key={category._id} value={category._id}>
        //                         {category.name}
        //                     </option>
        //                 ))}
        //         </select>
        //     </div>

        //     <div className="">
        //         <label>Sub Category</label>
        //         <Select
        //         className="react-select-container bg-white border border-green-300 text-sm rounded-md block  text-black font-semibold"
        //         closeMenuOnSelect={false}
        //         components={animatedComponents}
        //         isMulti

        //         options={subCategories}
        //         value={arraySubCategories}
        //         onChange={(value) => setArraySubCategories(value)}
        //         classNamePrefix="react-select"
        //         placeholder={"placeholder"}
        //         theme={(theme:any) => ({
        //             ...theme,
        //             borderRadius: 0,
        //             colors: {
        //                 ...theme.colors,
        //                 primary25: "#d4d4d8",
        //                 primary: "#d4d4d8",
        //             },
        //         })}
        //         styles={customStyles}
        //         isClearable
        //         />
        //     </div>

        //     <br />
        //     <button className="btn btn-outline-info">
        //         {loading ? "Saving" : "Save"}
        //     </button>
        // </form>
    );
};

export default UpdateProductForm;
