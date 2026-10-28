import type { Metadata } from "next";
import { Anton, Cairo, Lalezar } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import CartProvider from "@/components/cart/CartProvider";
import CartDrawer from "@/components/cart/CartDrawer";
import { MobileCartBar } from "@/components/cart/CartButton";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { dictionaries, dirOf, hasLocale, locales } from "@/lib/i18n";

const cairo = Cairo({ variable: "--font-cairo", subsets: ["arabic", "latin"] });
const anton = Anton({ variable: "--font-anton", subsets: ["latin"], weight: "400" });
const lalezar = Lalezar({ variable: "--font-lalezar", subsets: ["arabic", "latin"], weight: "400" });

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = dictionaries[lang].meta;
  return {
    title: t.title,
    description: t.description,
    alternates: { languages: { ar: "/ar", en: "/en" } },
    openGraph: { title: t.title, description: t.description, locale: lang === "ar" ? "ar_SY" : "en_US" },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <html lang={lang} dir={dirOf(lang)} className={`${cairo.variable} ${anton.variable} ${lalezar.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col">
        <CartProvider lang={lang}>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer lang={lang} />
          <MobileCartBar />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
