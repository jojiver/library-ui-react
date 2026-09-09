import { cn } from "@/lib/cn";

type AvatarProps = {
  img?: string;
  alt?: string;
  fallback?: string;
  className?: string;
};

export function Avatar({
  img,
  alt = "User",
  fallback = "U",
  className,
}: AvatarProps) {
  return (
    <div
      className={cn(
        "flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-gray-200 text-sm font-medium text-gray-600",
        className,
      )}
    >
      {img ? (
        <img src={img} alt={alt} className="h-full w-full object-cover" />
      ) : (
        fallback
      )}
    </div>
  );
}
