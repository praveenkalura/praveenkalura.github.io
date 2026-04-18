import { useState } from "react";
import { Menu, X } from "lucide-react";
import { profileData } from "@/data/content";

const navItems = [
  ["About", "#about"],
  ["Publications", "#/publications"],
  ["Apps", "#/apps"],
  ["Projects", "#/projects"],
  ["Events", "#/events"],
  ["Background", "#/background"],
  ["Blogs", "#/blogs"],
  ["Contact", "#/contact"],
];

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <a href="#about" className="flex items-center">
            <img src="/images/signature.png" alt={profileData.shortName} className="h-8 w-auto max-w-[12rem] sm:h-10 sm:max-w-none" />
          </a>
          <div className="hidden items-center gap-5 text-sm font-medium lg:flex xl:gap-7 xl:text-base">
            {navItems.map(([label, href]) => (
              <a key={href} href={href} className="text-gray-600 hover:text-gray-900 transition-colors">
                {label}
              </a>
            ))}
          </div>
          <button
            type="button"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((current) => !current)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 text-gray-700 transition-colors hover:bg-gray-100 lg:hidden"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {isMenuOpen ? (
          <div className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-gray-100 py-4 lg:hidden">
            <div className="grid gap-2 text-base font-medium">
              {navItems.map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-md px-3 py-2 text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        ) : null}
      </nav>
    </header>
  );
}
