import Image from "next/image";

import FooterBottom from "../../Molecules/Footer/FooterBottom";
import FooterContent from "../../Molecules/Footer/FooterContent/FooterContent";
import FooterMiddle from "../../Molecules/Footer/FooterMiddle";
import NewsLetter from "../../Molecules/Footer/NewsLetter/NewsLetter";

const Footer = () => {
    return (
        <>
            <footer className="bg-gradient-to-tr from-black to-black overflow-hidden relative mt-3">
                <div className="ocean">
                    <div className="wave"></div>
                    <div className="wave"></div>
                    <div className="wave"></div>
                </div>
                <Image
                    className="shape1"
                    src={"/footer/flower01.png"}
                    alt="Not Available"
                    height={100}
                    width={100}
                />
                <Image
                    className="shape2"
                    src={"/footer/flower01.png"}
                    height={100}
                    width={100}
                    alt="Not Available"
                />
                <Image
                    className="shape3"
                    src={"/footer/right-shape.png"}
                    height={100}
                    width={100}
                    alt="Not Available"
                />
                <NewsLetter />
                <div className="relative mt-20">
                    <div className="ocean1">
                        <div className="wave"></div>
                        <div className="wave"></div>
                        <div className="wave"></div>
                    </div>
                </div>
                <div className="container m-auto mt-14">
                    <div
                        className="w-full text-white relative bottom-0 
       pt-20 pb-6 font-Quicksand"
                    >
                        <FooterContent />
                        <FooterMiddle />
                    </div>
                    <FooterBottom />
                </div>
            </footer>
        </>
    );
};

export default Footer;
