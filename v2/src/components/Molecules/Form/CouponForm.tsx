import React, { FormEvent } from "react";

import Input from "../../Atoms/Input/Input";
import Label from "../../Atoms/Input/Label";

import { CartType } from "@/types/cart.types";

interface CouponFormProps {
    handleCouponSubmit: (e: FormEvent<HTMLFormElement>) => void;
    couponName: string;
    setCouponName: React.Dispatch<React.SetStateAction<string>>;
    carts: CartType[];
    loading: boolean;
}

const CouponForm: React.FC<CouponFormProps> = ({
    handleCouponSubmit,
    couponName,
    setCouponName,
    carts,
    loading,
}) => {
    return (
        <form onSubmit={handleCouponSubmit}>
            <div>
                <Label name="Coupon" />
                <Input
                    type="text"
                    name="couponName"
                    value={couponName}
                    handleChange={(e) => setCouponName(e.target.value)}
                    placeholder="Enter Coupon"
                />
            </div>
            <button
                className="btn block hover:bg-transparent hover:text-primary text-white btn-primary disabled:opacity-75 disabled:border-2 disabled:border-primary disabled:text-primary mt-2"
                disabled={carts.length === 0 || loading}
            >
                {loading ? "Saving..." : "Save"}
            </button>
        </form>
    );
};

export default CouponForm;
