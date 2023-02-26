import FormGroup from "@/components/Form/FormGroup";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import { useStoreContext } from "@/lib/contexts/StoreContextProvider";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { createBrand } from "@/api/brand";

interface IFormInputs {
    brand: string;
}
const AddBrand = () => {
    const [loading, setLoading] = useState(false);
    const { state } = useStoreContext();
    const { user } = state;
    const router = useRouter();
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm<IFormInputs>();

    const handleBrandSubmit: SubmitHandler<IFormInputs> = async (data) => {
        setLoading(true);
        createBrand(user!.token, data.brand)
            .then((res) => {
                setLoading(false);
                toast.success(`${res.data.name} Brand Created!`);
                reset();
                router.push("/dashboard/admin/brands");
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    toast.error("Brand Creating Failed!");
                    setLoading(false);
                }
                setLoading(false);
            });
    };
    return (
        <DashboardLayout>
            <div className="container py-10">
                <div className="bg-secondary p-6 rounded-lg w-3/4">
                    <h2 className="text-center font-semibold text-primary text-2xl">
                        Add New Brand
                    </h2>
                    <form onSubmit={handleSubmit(handleBrandSubmit)}>
                        <FormGroup
                            register={register}
                            inputName={"brand"}
                            labelName={"Brand"}
                            errorField={errors.brand}
                            inputType={"text"}
                            placeholder={"Enter Your Brand"}
                            required="Brand Field Is Required!"
                        />

                        <button
                            disabled={loading}
                            type="submit"
                            className="btn block hover:bg-transparent hover:text-primary text-white btn-primary disabled:opacity-75 disabled:border-2 disabled:border-primary disabled:text-primary mt-2"
                        >
                            {loading ? "Loading" : "Submit"}
                        </button>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AddBrand;
