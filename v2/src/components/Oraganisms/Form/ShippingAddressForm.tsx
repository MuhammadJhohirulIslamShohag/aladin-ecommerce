"use client";

import React from "react";
import { useForm } from "react-hook-form";
import RegisterInputGroup from "../../Molecules/Form/RegisterInputGroup";
import { IShippingAddress } from "@/types/user.type";

const ShippingAddressForm = ({ loading, submitShippingAddress }: any) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IShippingAddress>();

    return (
        <form onSubmit={handleSubmit(submitShippingAddress)}>
            <div>
                <RegisterInputGroup
                    register={register}
                    inputName={"firstName"}
                    labelName={"First Name"}
                    errors={errors.firstName}
                    inputType={"text"}
                    placeholder={"Enter Your First Name"}
                    errorMessage={"First Name Is Required!"}
                    className={"drop-shadow-md"}
                />
            </div>
            <div>
                <RegisterInputGroup
                    register={register}
                    inputName={"lastName"}
                    labelName={"Last Name"}
                    errors={errors.lastName}
                    inputType={"text"}
                    placeholder={"Enter Your Last Name"}
                    errorMessage={"Last Name Is Required!"}
                    className={"drop-shadow-md"}
                />
            </div>
            <div>
                <RegisterInputGroup
                    register={register}
                    inputName={"address1"}
                    labelName={"Address 1"}
                    errors={errors.address1}
                    inputType={"text"}
                    placeholder={"Enter Your Address1"}
                    errorMessage={"Address1 Is Required!"}
                    className={"drop-shadow-md"}
                />
            </div>
            <div>
                <RegisterInputGroup
                    register={register}
                    inputName={"address2"}
                    labelName={"Address 2"}
                    errors={errors.address2}
                    inputType={"text"}
                    placeholder={"Enter Your Address2"}
                    errorMessage={"Address2 Is Required!"}
                    className={"drop-shadow-md"}
                />
            </div>
            <div>
                <RegisterInputGroup
                    register={register}
                    inputName={"country"}
                    labelName={"Country"}
                    errors={errors.country}
                    inputType={"text"}
                    placeholder={"Enter Your Country"}
                    errorMessage={"Country Is Required!"}
                    className={"drop-shadow-md"}
                />
            </div>
            <div>
                <RegisterInputGroup
                    register={register}
                    inputName={"city"}
                    labelName={"City"}
                    errors={errors.city}
                    inputType={"text"}
                    placeholder={"Enter Your City"}
                    errorMessage={"City Is Required!"}
                    className={"drop-shadow-md"}
                />
            </div>
            <div>
                <RegisterInputGroup
                    register={register}
                    inputName={"state"}
                    labelName={"State"}
                    errors={errors.state}
                    inputType={"text"}
                    placeholder={"Enter Your State"}
                    errorMessage={"State Is Required!"}
                    className={"drop-shadow-md"}
                />
            </div>
            <div>
                <RegisterInputGroup
                    register={register}
                    inputName={"postCode"}
                    labelName={"Post Code"}
                    errors={errors.postCode}
                    inputType={"text"}
                    placeholder={"Enter Your Post Code"}
                    errorMessage={"Post Code Is Required!"}
                    className={"drop-shadow-md"}
                />
            </div>

            <button
                type="submit"
                className="btn block hover:bg-transparent hover:text-primary text-white btn-primary disabled:opacity-75 disabled:border-2 disabled:border-primary disabled:text-primary mt-2"
                disabled={loading}
            >
                {loading ? "Saving..." : "Save"}
            </button>
        </form>
    );
};

export default ShippingAddressForm;
