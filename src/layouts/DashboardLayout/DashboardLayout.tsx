import DashboardNavbar from "@/components/Dashboard/DashboardNavbar/DashboardNavbar";
import SidebarList from "@/components/Dashboard/DashboardSidebar/DashboardSidebarList/SidebarList";
import SideBarCollapseButton from "@/components/Dashboard/DashboardSidebar/SideBarCollapseButton/SideBarCollapseButton";
import React, { useState } from "react";


const DashboardLayout = ({ children }: React.PropsWithChildren<{}>) => {
    const [toggleAdminSidebar, setToggleAdminSidebar] = useState<boolean>(false);

    return (
        <>
            <DashboardNavbar />
            <div className="flex h-full max-h-full min-h-full">
                <aside className={`w-72 ${toggleAdminSidebar ? "w-16" : ""}`}>
                    <div className="relative h-full min-h-screen py-4 bg-gray-50 dark:bg-gray-800 flex flex-col justify-between">
                        <SidebarList toggleAdminSidebar={toggleAdminSidebar} />
                        <SideBarCollapseButton
                            toggleAdminSidebar={toggleAdminSidebar}
                            setToggleAdminSidebar={setToggleAdminSidebar}
                        />
                    </div>
                </aside>

                <section className="w-full w-max-full">{children}</section>
            </div>
        </>
    );
};

export default DashboardLayout;
