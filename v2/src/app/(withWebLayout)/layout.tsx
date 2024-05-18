import Footer from "@/components/Footer/Footer";
import MobileBottomNav from "@/components/Oraganisms/Navbar/MobileBottomNav";
import Navbar from "@/components/Oraganisms/Navbar/Navbar";
import ScrollSpeedDial from "@/components/Oraganisms/ScrollSpeedDial/ScrollSpeedDial";

const MainWebLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <ScrollSpeedDial />
            <MobileBottomNav/>
        </>
    );
};

export default MainWebLayout;
