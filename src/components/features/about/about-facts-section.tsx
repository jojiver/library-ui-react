import { BookOpen, Clock, Globe, Users } from "lucide-react";
import { Section } from "@/components/common/section";

const facts = [
  {
    icon: BookOpen,
    title: "Growing collection",
    description: "Thousands of titles added every year across every discipline.",
  },
  {
    icon: Users,
    title: "Open to the community",
    description: "Students, faculty, staff, and public patrons are all welcome.",
  },
  {
    icon: Clock,
    title: "Extended hours",
    description: "Open late on weekdays to support study and research schedules.",
  },
  {
    icon: Globe,
    title: "Digital-first portal",
    description: "Search and borrow from anywhere on campus or at home.",
  },
];

export function AboutFactsSection() {
  return (
    <Section className="pt-0">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {facts.map((fact) => (
          <div key={fact.title} className="rounded-2xl border border-gray-200 bg-white p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
              <fact.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-display text-base font-bold text-gray-900">
              {fact.title}
            </h3>
            <p className="mt-1 text-sm leading-6 text-gray-500">
              {fact.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}