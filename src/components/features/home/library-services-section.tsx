import { NavLink } from "react-router";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { BookCopy, Clock, BookOpenCheck } from "lucide-react";
import { Section } from "@/components/common/section";

export function LibraryServicesSection() {
  return (
    <Section className="mt-5 pb-0">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Catalog card */}
        <NavLink to="/books" className="block">
          <Card className="h-full transition-shadow duration-300 hover:shadow-md">
            <CardHeader>
              <CardTitle icon={<BookCopy className="h-5 w-5" />}>
                Student Catalog
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="mt-0">
                Browse the collection and check live availability before you
                visit the stacks.
              </CardDescription>
            </CardContent>
          </Card>
        </NavLink>

        {/* Borrow card */}
        <NavLink to="/books" className="block">
          <Card className="h-full transition-shadow duration-300 hover:shadow-md">
            <CardHeader>
              <CardTitle icon={<BookOpenCheck className="h-5 w-5" />}>
                Borrow a Book
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="mt-0">
                No account needed. Just open a book and enter your name and
                email — we will remember them for next time.
              </CardDescription>
            </CardContent>
          </Card>
        </NavLink>

        {/* Library hours card */}
        <Card className="h-full">
          <CardHeader>
            <CardTitle icon={<Clock className="h-5 w-5" />}>
              Library Hours
            </CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-1.5 text-sm text-gray-500">
              <div className="flex justify-between">
                <dt>Mon – Fri</dt>
                <dd className="text-gray-700">7:00 AM – 9:00 PM</dd>
              </div>
              <div className="flex justify-between">
                <dt>Saturday</dt>
                <dd className="text-gray-700">9:00 AM – 5:00 PM</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}