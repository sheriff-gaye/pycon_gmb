import type { Metadata } from "next";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

export const metadata: Metadata = {
    icons: {
        icon: '/images/logo.png',
    },
  title: "Pycon Senegambia",
  description: "Pycon Senegambia",
};

export default async function WebsiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>; 
}) {
  const { locale } = await params;

  return (
    <>
      <Navbar currentLocale={locale} />
      {children}
      <Footer currentLocale={locale} />
    </>
  );
}