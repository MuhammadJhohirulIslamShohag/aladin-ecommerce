import UserSideBar from "@/components/Dashboard/User/UserSideBar/UserSideBar";
import Footer from "@/components/Footer/Footer";
import NavbarMiddle from "@/components/Molecules/Navbar/NavbarMiddle/NavbarMiddle";
import NavbarTop from "@/components/Molecules/Navbar/NavbarTop/NavbarTop";

const UserLayout = ({ children }: React.PropsWithChildren<{}>) => {
    return (
        <>
            <header>
                <NavbarTop />
                <NavbarMiddle/>
            </header>
            <main>
                <section className="container mt-8 lg:mt-4 md:mt-4">
                    <div className="grid lg:grid-cols-12 grid-cols-1 md:grid-cols-1">
                        <div
                            className={`lg:col-span-3 col-auto transition-all`}
                        >
                            <UserSideBar />
                        </div>
                        <div className="col-span-8">{children}</div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default UserLayout;
