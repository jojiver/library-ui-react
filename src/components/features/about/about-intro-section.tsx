import { Link } from "react-router";
import { Section } from "@/components/common/section";
import { Fleuron } from "@/components/common/fleuron";

export function AboutIntroSection() {
  return (
    <Section className="py-12">
      <nav className="mb-2 text-sm text-gray-400">
        <Link to="/" className="transition-colors hover:text-brand-700">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-600">About</span>
      </nav>

      <div className="max-w-3xl">
        <Fleuron className="mb-3" />
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-700">
          About the library
        </p>
        <h1 className="mt-4 font-display text-3xl font-bold text-brand-900 lg:text-4xl">
          About the Library System
        </h1>
        <p className="mt-4 text-base leading-7 text-gray-600">
          The Library System is the heart of the community in Gabi, Cordova,
          Cebu. With a growing collection of books, journals, and digital
          resources — plus a team of librarians ready to help you succeed — it
          connects students, teachers, and residents with knowledge and
          reading.
        </p>
        <p className="mt-3 text-base leading-7 text-gray-600">
          Beyond lending, the library offers study spaces, research assistance,
          and a quiet environment designed for deep work. This catalog portal
          makes it easy to search the collection, check availability, and manage
          your borrowings online.
        </p>
      </div>
    </Section>
  );
}