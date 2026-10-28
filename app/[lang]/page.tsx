import { notFound } from "next/navigation";
import Hero from "@/components/home/Hero";
import { Combos, Featured, Gallery, Visit, WhyUs } from "@/components/home/Sections";
import RoadDivider from "@/components/ui/RoadDivider";
import { hasLocale } from "@/lib/i18n";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <>
      <Hero lang={lang} />
      <RoadDivider />
      <Featured lang={lang} />
      <Combos lang={lang} />
      <WhyUs lang={lang} />
      <Gallery lang={lang} />
      <Visit lang={lang} />
    </>
  );
}
