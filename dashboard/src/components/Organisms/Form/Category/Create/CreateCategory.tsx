import { useState } from "react";
import { UploadFile } from "antd";
import { useForm } from "react-hook-form";

import AntdModal from "../../../../Atoms/Modal/AntdModal";
import FormInputGroup from "../../../../Molecules/Form/FormInputGroup";
import Button from "../../../../Atoms/Button/Button";
import AntdUploadImage from "../../../../Molecules/Upload/Images/MultiImageUpload/AntdUploadImage";

import { TCreateCategoryForm } from "./createCategory.type";
import { useCreateCategoryMutation } from "../../../../../redux/services/category/categoryApi";

type CreateCategoryFormType = {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateCategory = ({
    isModalOpen,
    setIsModalOpen,
}: CreateCategoryFormType) => {
    // state
    const [imageFiles, setImageFiles] = useState<UploadFile[]>([]);

    // redux api call
    const [createCategory, { isLoading }] = useCreateCategoryMutation();

    // react hook form
    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
    } = useForm<TCreateCategoryForm>({
        defaultValues: {
            name: "",
        },
    });

    // submit handler to submit data to server
    const handleAddCategory = (data: TCreateCategoryForm) => {
        console.log(data, "data");
        
    };
    return (
        <AntdModal
            title="Add New Category"
            isModalOpen={isModalOpen}
            onCancel={() => setIsModalOpen((prev) => !prev)}
        >
            <form
                onSubmit={handleSubmit(handleAddCategory)}
                className="lg:mt-5 md:mt-0 mt-0  pt-4 pb-7 px-6"
            >
                <div className="grid grid-cols-1">
                    <AntdUploadImage
                        fileList={imageFiles}
                        setFileList={setImageFiles}
                        isError={imageFiles?.length > 0 ? false : true}
                        maxCount={4}
                    />
                </div>
                <div className="grid grid-cols-1">
                    <div>
                        <FormInputGroup
                            register={register}
                            inputName={"name"}
                            labelName={"Category Name"}
                            errors={errors.name}
                            inputType={"text"}
                            placeholder={"Enter Your Category Name"}
                            errorMessage={"Category Name Is Required!"}
                            className={"drop-shadow-md"}
                        />
                    </div>
                </div>

                <div className="mt-5">
                    <Button
                        className={`text-white py-3 px-4 disabled:cursor-not-allowed hover:shadow-green-500/40 bg-green-500 shadow-green-500/20`}
                        label={isLoading ? "Loading" : "Add Category"}
                        type="submit"
                        disabled={isLoading}
                    />
                </div>
            </form>
        </AntdModal>
    );
};

export default CreateCategory;
