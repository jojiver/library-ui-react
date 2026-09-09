import { cn } from "@/lib/cn";
import type {
  ReactNode,
  TableHTMLAttributes,
  ThHTMLAttributes,
  TdHTMLAttributes,
} from "react";

type TableProps = TableHTMLAttributes<HTMLTableElement>;

type TableSectionProps = {
  children: ReactNode;
  className?: string;
};

type TableCellProps = ThHTMLAttributes<HTMLTableCellElement>;
type TableDataCellProps = TdHTMLAttributes<HTMLTableCellElement>;

export function Table({ className, ...props }: TableProps) {
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-gray-200">
      <table className={cn("w-full text-sm text-left", className)} {...props} />
    </div>
  );
}

export function TableHeader({
  className,
  children,
  ...props
}: TableSectionProps & TableHTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead className={cn("border-b bg-gray-50", className)} {...props}>
      {children}
    </thead>
  );
}

export function TableBody({
  className,
  children,
  ...props
}: TableSectionProps & TableHTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody className={cn("divide-y divide-gray-200", className)} {...props}>
      {children}
    </tbody>
  );
}

export function TableRow({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr className={cn("hover:bg-gray-50", className)} {...props}>
      {children}
    </tr>
  );
}

export function TableHead({ className, children, ...props }: TableCellProps) {
  return (
    <th
      className={cn(
        "px-4 py-3 text-xs font-medium uppercase tracking-wide text-gray-500",
        className,
      )}
      {...props}
    >
      {children}
    </th>
  );
}

export function TableCell({
  className,
  children,
  ...props
}: TableDataCellProps) {
  return (
    <td className={cn("px-4 py-3 text-gray-700", className)} {...props}>
      {children}
    </td>
  );
}
