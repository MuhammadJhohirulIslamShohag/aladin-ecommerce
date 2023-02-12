import "@/styles/globals.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "swiper/swiper.min.css";
import "react-datepicker/dist/react-datepicker.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import StoreContextProvider from "./../lib/contexts/StoreContextProvider";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <StoreContextProvider>
            <Toaster position="top-right" reverseOrder={false} />
            <Component {...pageProps} />
        </StoreContextProvider>
    );
}
