import { cn } from "@/lib/cn";

type FleuronProps = {
  className?: string;
};

export function Fleuron({ className }: FleuronProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-gold-500",
        className,
      )}
      aria-hidden="true"
    >
      <span className="inline-block h-px w-7 bg-gold-400/60" />
      <span className="font-display text-base leading-none">❦</span>
      <span className="inline-block h-px w-7 bg-gold-400/60" />
    </span>
  );
}