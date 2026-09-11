import { Link } from "react-router";
import { Section } from "@/components/common/section";
import { Fleuron } from "@/components/common/fleuron";

export function ContactIntroSection() {
  return (
    <Section className="py-12">
      <nav className="mb-2 text-sm text-gray-400">
        <Link to="/" className="transition-colors hover:text-brand-700">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-600">Contact</span>
      </nav>

      <div className="max-w-3xl">
        <Fleuron className="mb-3" />
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-700">
          Get in touch
        </p>
        <h1 className="mt-4 font-display text-3xl font-bold text-brand-900 lg:text-4xl">
          Contact the Library
        </h1>
        <p className="mt-4 text-base leading-7 text-gray-600">
          Questions about a book, an account, or your borrowings? Reach out to
          the library team — we usually reply within one business day.
        </p>
      </div>
    </Section>
  );
}