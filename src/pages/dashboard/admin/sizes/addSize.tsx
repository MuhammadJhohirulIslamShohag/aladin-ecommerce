import React, { useState } from "react";
import FormGroup from "@/components/Form/FormGroup";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import { useStoreContext } from "@/lib/contexts/StoreContextProvider";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { createSize } from "@/api/size";

interface IFormInputs {
    size: string;
}
const AddSize = () => {
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

    const handleSizeSubmit: SubmitHandler<IFormInputs> = async (data) => {
        setLoading(true);
        createSize(user!.token, data.size)
            .then((res) => {
                setLoading(false);
                toast.success(`${res.data.name} Size Created!`);
                reset();
                router.push("/dashboard/admin/sizes");
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    toast.error("Size Creating Failed!");
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
                        Add New Size
                    </h2>
                    <form onSubmit={handleSubmit(handleSizeSubmit)}>
                        <FormGroup
                            register={register}
                            inputName={"size"}
                            labelName={"Size"}
                            errorField={errors.size}
                            inputType={"text"}
                            placeholder={"Enter Your Size"}
                            required="Size Field Is Required!"
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

export default AddSize;
