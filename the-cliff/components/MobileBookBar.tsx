import { airbnbLink } from "@/lib/airbnb";

// Always-visible booking shortcut on small screens.
export default function MobileBookBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-stone bg-shell/95 px-4 py-3 backdrop-blur md:hidden">
      <div className="flex items-center gap-3">
        <a href="#book" className="flex-1 rounded-full border border-stone py-3 text-center text-sm font-medium text-ink">
          Choose dates
        </a>
        <a
          href={airbnbLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 rounded-full bg-gum-deep py-3 text-center text-sm font-medium text-white"
        >
          Book on Airbnb
        </a>
      </div>
    </div>
  );
}
