import type { HTMLAttributes } from "react";
import { NavLink } from "react-router";
import { BookOpen, Clock, Mail, MapPin } from "lucide-react";
import { cn } from "@/lib/cn";
import { Section } from "@/components/common/section";
import { Fleuron } from "@/components/common/fleuron";

type FooterProps = HTMLAttributes<HTMLElement>;

const footerLinks = [
  { label: "Home", to: "/" },
  { label: "Catalog", to: "/books" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "Staff Login", to: "/admin/login" },
];

export function Footer({ className, ...props }: FooterProps) {
  return (
    <footer
      className={cn("bg-brand-900 text-gray-300", className)}
      {...props}
    >
      <Section className="py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-800 text-gold-400 ring-1 ring-gold-400/40">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
<span className="block font-display text-base font-bold leading-none text-white">
                Library{" "}
                <span className="font-medium italic text-gold-400">System</span>
              </span>
                <span className="mt-1 block text-[11px] uppercase tracking-wider text-gray-400">
                  Gabi, Cordova, Cebu
                </span>
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-gray-400">
              Supporting teaching, research, and lifelong learning with a
              growing print and digital collection for students, faculty, and
              the community.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h2 className="font-display text-sm font-bold uppercase tracking-wider text-gold-400">
              Quick Links
            </h2>

            <nav className="mt-4 flex flex-col gap-2.5">
              {footerLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    cn(
                      "text-sm transition-colors",
                      isActive
                        ? "text-gold-300"
                        : "text-gray-400 hover:text-white",
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Hours */}
          <div>
            <h2 className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wider text-gold-400">
              <Clock className="h-4 w-4" />
              Library Hours
            </h2>

            <dl className="mt-4 space-y-2.5 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-gray-400">Mon – Fri</dt>
                <dd className="text-gray-200">7:00 AM – 9:00 PM</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-gray-400">Saturday</dt>
                <dd className="text-gray-200">9:00 AM – 5:00 PM</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-gray-400">Sunday</dt>
                <dd className="text-gray-200">Closed</dd>
              </div>
            </dl>
          </div>

          {/* Visit */}
          <div>
            <h2 className="font-display text-sm font-bold uppercase tracking-wider text-gold-400">
              Visit Us
            </h2>

            <ul className="mt-4 space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                Gabi, Cordova, Cebu
                <br />
                Philippines
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-gold-400" />
                library@librarysystem.com
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex items-center justify-center">
          <Fleuron className="text-gold-400/70" />
        </div>
        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-sm text-gray-500 md:flex-row">
          <p>© 2026 Library System. All rights reserved.</p>
          <p>Serving Gabi, Cordova, Cebu · Catalog accessible to all</p>
        </div>
      </Section>
    </footer>
  );
}