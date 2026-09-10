import { cn } from "@/lib/cn";
import type { TextareaHTMLAttributes } from "react";
type TextAreaProps = TextareaHTMLAttributes<HTMLElement> & {
    error?: string;

}

export function TextArea({className, error, ...props}:TextAreaProps){
    return(
        <textarea className={cn("w-full rounded-md border border-gray-300 px-3 py-2 text-sm",
            "focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900", error && "border-red-500 focus:border-red-500 focus:ring-red-500", className,
        )}
        {...props}
        />
    )
}