import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { CiCircleChevRight } from "react-icons/ci";

import Navbar from "../../components/shared/Navbar/Navbar";
import SidebarList from "../../components/shared/Sidebar/SidebarList/SidebarList";
import Footer from "../../components/shared/Footer/Footer";
import Styles from "../../assets/styles/scrollbar.module.css";

const MainLayout = () => {
    const [openSideBar, setOpenSideBar] = useState<boolean>(true);

    return (
        <div className="overflow-hidden">
            <div className="flex">
                <div
                    className={`relative duration-500 transition-all bg-white border-r border-gray-200 ${
                        Styles.scrollbar
                    } ${openSideBar ? "w-[350px]" : "w-20"}`}
                >
                    <div className="absolute -right-2 top-16 z-500 bg-white rounded-full">
                        <CiCircleChevRight
                            className="text-success"
                            size={25}
                            onClick={() => setOpenSideBar(!openSideBar)}
                        />
                    </div>
                    <div className="text-center">
                        <Link
                            to="/"
                            className="text-green-400 font-bold lg:text-4xl text-xl"
                        >
                            Aladin
                        </Link>
                    </div>

                    <div>
                        <SidebarList
                            openSideBar={openSideBar}
                            setOpenSideBar={setOpenSideBar}
                        />
                    </div>
                </div>

                <div className="h-[calc(100vh)] w-full overflow-y-auto">
                    <Navbar />
                    <div className={`px-5 py-5`}>
                        <Outlet />
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
