import type { ReactNode } from "react";
import { cn } from "@/lib/cn"

type SectionProps = {
    children: ReactNode;
    className?: string;
}

    export function Section({ children, className }: SectionProps){
        return (
        <section className={cn("max-w-7xl mx-auto px-4 py-10", className)}>
            {children}
        </section>
        )

}