import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../style/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://tsnextjs-portfolio-v2.vercel.app/"),
  title: "Next.js Blog Portfolio",
  description:
    "This is the description",
  keywords: "NextJS",
  icons: {
    icon: ["/favicon.ico"],
  },
  robots: {
    index: false,
    follow: false,
    nocache: false,
  },
  openGraph: {
    title: "Next.js Blog Portfolio",
    description:
      "This is the description",
  },
  twitter: {
    title: "Next.js Blog Portfolio",
    description:
      "This is the description",
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=G-X46X74W5ZJ`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-X46X74W5ZJ');
          `,
          }}
        /> */}
      </head>
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
