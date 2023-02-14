import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import "@/styles/globals.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "swiper/swiper.min.css";
import "react-datepicker/dist/react-datepicker.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import StoreContextProvider from "./../lib/contexts/StoreContextProvider";

type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page);
    return getLayout(
        <StoreContextProvider>
            <Toaster position="top-right" reverseOrder={false} />
            <Component {...pageProps} />
        </StoreContextProvider>
    );
}
