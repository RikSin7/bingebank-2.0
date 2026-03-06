import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "../store/Provider";
import BackToTop from "@/components/common/BackToTop";
import MainLayout from "@/components/layout/MainLayout";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Bingebank - Movie & TV Shows",
  description: "Track and discover your favorite TV shows and movies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans antialiased`}>
        <div className="max-w-[1920px] mx-auto bg-black relative min-h-screen flex">
          <Providers>
            <MainLayout>
              {children}
            </MainLayout>
          </Providers>
          <BackToTop />
        </div>
      </body>
    </html>
  );
}
