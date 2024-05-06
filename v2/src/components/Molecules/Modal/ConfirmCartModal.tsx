import Link from "next/link";
import { FaCheck, FaWindowClose } from "react-icons/fa";

import Button from "../../Atoms/Button/Button";

interface ConfirmCartModalProps {
    handleCart: () => void;
    productName: string;
}

const ConfirmCartModal: React.FC<ConfirmCartModalProps> = ({
    handleCart,
    productName,
}) => {
    return (
        <div className="bg-white rounded-sm p-3 md:p-8 mx-5 shadow-lg w-full lg:w-1/3">
            <div className="flex justify-end mb-2 lg:-mt-3 ">
                <FaWindowClose
                    onClick={handleCart}
                    className="text-2xl text-black hover:text-green-400 transition-all cursor-pointer"
                />
            </div>
            <div className="flex flex-col gap-5 md:gap-0 items-center justify-center pt-5">
                <div className="flex gap-3 items-center mb-10">
                    <FaCheck className="text-xl bg-successGreen text-white p-1 rounded-full " />
                    <h1 className=" text-sm md:text-base">
                        You have added{" "}
                        <span className="text-green-400">{productName}</span> to
                        your shopping cart!
                    </h1>
                </div>

                <div className="flex gap-3">
                    <Link href="/checkout/cart">
                        <Button
                            label={"View Cart"}
                            className="text-white py-2 px-4 bg-black font-medium rounded  hover:bg-green-400 border-2 border-transparent"
                        />
                    </Link>
                    <Link href="/checkout/onepagecheckout">
                        <Button
                            label={"Confirm Order"}
                            className="border-2 py-2 px-4 border-black rounded font-medium hover:bg-black hover:text-white transition-all duration-400"
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ConfirmCartModal;
