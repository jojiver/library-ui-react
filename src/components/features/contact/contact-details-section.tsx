import { Mail, MapPin, Phone, MessagesSquare } from "lucide-react";
import { Section } from "@/components/common/section";

const details = [
  {
    icon: MapPin,
    title: "Visit us",
    lines: ["Gabi, Cordova, Cebu", "Main Street, beside the town plaza"],
  },
  {
    icon: Mail,
    title: "Email",
    lines: [
      "library@librarysystem.com",
      "For account issues: accounts@librarysystem.com",
    ],
  },
  {
    icon: Phone,
    title: "Phone",
    lines: ["(032) 345-6789", "Circulation desk: (032) 345-6790"],
  },
  {
    icon: MessagesSquare,
    title: "In person",
    lines: [
      "Ask at the circulation desk during library hours for help finding books or managing your account.",
    ],
  },
];

export function ContactDetailsSection() {
  return (
    <Section className="pt-0">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {details.map((item) => (
          <div key={item.title} className="rounded-2xl border border-gray-200 bg-white p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
              <item.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-display text-base font-bold text-gray-900">
              {item.title}
            </h3>
            <p className="mt-1 text-sm leading-6 text-gray-500">
              {item.lines.map((line, index) => (
                <span key={line}>
                  {line}
                  {index < item.lines.length - 1 && <br />}
                </span>
              ))}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}