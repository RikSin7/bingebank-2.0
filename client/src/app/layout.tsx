import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "../store/Provider";
import Sidebar from "../components/layout/Sidebar";
import Footer from "../components/layout/Footer";

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
      <body className={`${poppins.variable} font-sans antialiased bg-black`}>
        <div className="max-w-[1920px] mx-auto bg-black relative min-h-screen shadow-[0_0_50px_rgba(0,0,0,0.5)] flex">
          <Providers>
            <Sidebar />
            <div className="flex-1 md:ml-[80px] flex flex-col min-h-screen w-full overflow-x-hidden">
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
          </Providers>
        </div>
      </body>
    </html>
  );
}
