import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/common/section";
import { Fleuron } from "@/components/common/fleuron";

const heroImageUrl =
  "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80";

export function HomepageHeroSection() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/books?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <Section className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-900 to-brand-800 py-14 lg:py-20">
      <span
        className="pointer-events-none absolute -bottom-20 -right-4 select-none font-display text-[18rem] leading-none text-gold-300/[0.06]"
        aria-hidden="true"
      >
        ❦
      </span>

      <div className="relative z-10 flex items-center justify-between gap-10">
        <div className="max-w-2xl">
          <Fleuron className="text-gold-300/80" />
          <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-gold-300">
            Welcome to the Library System
          </p>

          <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-white lg:text-5xl">
            Discover, borrow, and{" "}
            <span className="font-light italic text-gold-300">
              explore the full collection
            </span>
          </h1>

          <p className="mt-4 max-w-xl text-base leading-7 text-gray-300">
            Search books by title, author, or ISBN, check real-time
            availability, and manage your loans — all in one place.
          </p>

          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="mt-7 flex max-w-xl items-center gap-2 rounded-xl bg-white p-2 shadow-lg"
          >
            <Search className="ml-2 h-5 w-5 shrink-0 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the catalog — title, author, or ISBN"
              className="w-full bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
            />
            <Button type="submit" className="shrink-0">
              Search
            </Button>
          </form>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Button variant="primary" className="bg-gold-500 text-brand-900 hover:bg-gold-400" onClick={() => navigate("/books")}>
              Browse the catalog
            </Button>
            <Button variant="secondary" className="bg-transparent border-white/25 text-gray-200 hover:bg-white/10 hover:text-white" onClick={() => navigate("/books?q=")}>
              View all books
            </Button>
          </div>
        </div>

        <img
          src={heroImageUrl}
          alt="Library stacks in Gabi, Cordova, Cebu"
          className="hidden h-56 w-56 rounded-2xl object-cover shadow-2xl ring-1 ring-gold-400/30 lg:block xl:h-64 xl:w-64"
        />
      </div>
    </Section>
  );
}