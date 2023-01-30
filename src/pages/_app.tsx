import "@/styles/globals.css";
import "swiper/swiper.min.css";
import type { AppProps } from "next/app";
import StoreContextProvider from "./../lib/contexts/StoreContextProvider";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <StoreContextProvider>
            <Component {...pageProps} />
        </StoreContextProvider>
    );
}
