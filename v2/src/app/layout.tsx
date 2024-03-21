import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ReduxProvider from "@/lib/Providers/ReduxProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Aladin-E-Commerce",
    description: "Aladin-E-Commerce is the seller and buyer project!",
};


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ReduxProvider>{children} </ReduxProvider>
            </body>
        </html>
    );
}
