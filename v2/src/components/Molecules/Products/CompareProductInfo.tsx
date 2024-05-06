import Link from "next/link";
import { FaCheck, FaWindowClose } from "react-icons/fa";

interface CompareProductInfoProps {
    onCloseCompareModal: (prevState: boolean) => void;
    compareProductName: string;
}

const CompareProductInfo: React.FC<CompareProductInfoProps> = ({
    onCloseCompareModal,
    compareProductName,
}) => {
    return (
        <div className="bg-white rounded-sm p-3 md:p-6 mx-5 shadow-lg w-full lg:w-3/6">
            <div className="flex justify-end mb-2 lg:-mt-3 ">
                <FaWindowClose
                    onClick={() => onCloseCompareModal(false)}
                    className="text-2xl text-primary cursor-pointer"
                />
            </div>
            <div className="flex flex-col gap-5 md:gap-0">
                <div className="flex gap-3 items-center">
                    <FaCheck className="text-xl bg-successGreen text-white p-1 rounded-full " />
                    <h1 className="text-base font-medium">
                        Success: You have added
                        <span className="text-primary px-1 font-semibold">
                            {compareProductName}
                        </span>
                        to your shopping cart!
                    </h1>
                </div>

                <div className="flex gap-4 mt-6">
                    <Link href="/product/compare">
                        <button className="text-white py-2 px-4 bg-primary font-medium rounded">
                            Compare Now
                        </button>
                    </Link>
                    <button
                        onClick={() => onCloseCompareModal(false)}
                        className="border-2 py-2 px-4 border-primary rounded font-medium hover:bg-primary hover:text-white transition-all duration-400"
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CompareProductInfo;
