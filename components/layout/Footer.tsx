import Link from "next/link";
import Logo from "@/components/brand/Logo";
import { dictionaries, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

export default function Footer({ lang }: { lang: Locale }) {
  const t = dictionaries[lang];
  return (
    <footer className="asphalt text-cream">
      <div className="road-line h-1.5 bg-brand" aria-hidden="true" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div className="space-y-3">
          <Logo size={88} />
          <p className="text-cream/70">{t.footer.tagline}</p>
        </div>
        <ul className="space-y-2 font-semibold">
          <li><Link href={`/${lang}`} className="hover:text-brand">{t.nav.home}</Link></li>
          <li><Link href={`/${lang}/menu`} className="hover:text-brand">{t.nav.menu}</Link></li>
          <li><Link href={`/${lang}#visit`} className="hover:text-brand">{t.nav.visit}</Link></li>
        </ul>
        <div className="space-y-2">
          <p className="font-display text-xl text-brand">{t.footer.follow}</p>
          <div className="flex gap-3 font-semibold">
            <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="rounded-full bg-white/10 px-4 py-2 hover:bg-brand">Instagram</a>
            <a href={site.facebook} target="_blank" rel="noopener noreferrer" className="rounded-full bg-white/10 px-4 py-2 hover:bg-brand">Facebook</a>
          </div>
          <p className="pt-2 text-cream/70" dir="ltr">{site.phone}</p>
        </div>
      </div>
      <p className="border-t border-white/10 py-5 text-center text-sm text-cream/50">
        © Road 8. {t.footer.rights}
      </p>
    </footer>
  );
}
