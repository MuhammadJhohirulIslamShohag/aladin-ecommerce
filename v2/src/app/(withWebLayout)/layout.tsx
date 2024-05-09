import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Oraganisms/Navbar/Navbar";
import ScrollSpeedDial from "@/components/ScrollSpeedDial/ScrollSpeedDial";

const MainWebLayout = ({ children }: { children: React.ReactNode }) => {
   
    
    return (
        <>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <ScrollSpeedDial/>
        </>
    );
};

export default MainWebLayout;
