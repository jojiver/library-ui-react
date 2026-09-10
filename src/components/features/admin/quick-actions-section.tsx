import { Link } from "react-router";
import { Button } from "@/components/ui/button";

export function QuickActionsSection() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 font-semibold text-gray-900">Quick Actions</h3>
      <div className="flex flex-wrap gap-2">
        <Link to="/dashboard/admin/books">
          <Button>Manage Books</Button>
        </Link>
        <Link to="/dashboard/admin/borrowings">
          <Button variant="secondary">View Borrowings</Button>
        </Link>
      </div>
    </div>
  );
}