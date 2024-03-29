import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

type SidebarTopProps = {
    openSideBar: boolean;
    setOpenSideBar: React.Dispatch<React.SetStateAction<boolean>>;
};

const SideBarTop = ({ openSideBar, setOpenSideBar }: SidebarTopProps) => {
    return (
        <div className="absolute bg-white w-full z-[100] border-b p-3 flex flex-col gap-4">
            <div className="flex">
                <div>
                    {openSideBar ? (
                        <img className="w-32" src={""} />
                    ) : (
                        <img className="w-32" src={""} />
                    )}
                </div>
                <div
                    className={`absolute z-50 -right-4 ${
                        openSideBar ? "top-20" : "top-[90px]"
                    } w-7 h-7 bg-white flex justify-center items-center rounded-full shadow-lg cursor-pointer`}
                    onClick={() => setOpenSideBar((prev) => !prev)}
                >
                    {openSideBar ? <FaAngleLeft /> : <FaAngleRight />}
                </div>
            </div>
        </div>
    );
};

export default SideBarTop;
