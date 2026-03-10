import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Suspense } from "react";
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
  icons: {
    icon: "/bingebank.svg",
  },
};

const themeScript = `
(function() {
  try {
    var theme = localStorage.getItem('theme');
    if (theme === 'light' || theme === 'dark') {
      document.documentElement.classList.add(theme);
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.add('dark');
    }
  } catch(e) {
    document.documentElement.classList.add('dark');
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${poppins.variable} font-sans antialiased bg-[var(--bg-tinted)]`}>
        <div className="max-w-[1920px] mx-auto bg-[var(--bg-primary)] relative min-h-screen flex">
          <Providers>
            <Suspense fallback={null}>
              <MainLayout>
                {children}
              </MainLayout>
            </Suspense>
          </Providers>
          <BackToTop />
        </div>
      </body>
    </html>
  );
}
