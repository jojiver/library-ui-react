import React from "react";
import { cn } from "@/lib/cn";

export type CardProps = React.HTMLAttributes<HTMLDivElement>;
export type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>;
export type CardDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;
export type CardContentProps = React.HTMLAttributes<HTMLDivElement>;
export type CardFooterProps = React.HTMLAttributes<HTMLDivElement>;
export type CardTitleProps = React.HTMLAttributes<HTMLHeadingElement> & {
  icon?: React.ReactNode;
  imageSrc?: string;
  imageFullWidth?: boolean;
};

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "group flex flex-col justify-between border border-gray-200 hover:border-gray-400 rounded-2xl p-6 bg-white transition-colors duration-300",
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: CardHeaderProps) {
  return  <div className={cn("space-y-4", className)} {...props} />;

    
}

export function CardTitle({className, icon, imageSrc, imageFullWidth =  false, children, ...props}: CardTitleProps){
    return(
        <div className="space-y-4">
            
    {imageSrc && (
        <img
          src={imageSrc}
          alt=""
          className={cn(
            "w-full h-40 object-cover",
            imageFullWidth
              ? "-mx-6 -mt-6 w-[calc(100%+3rem)] max-w-none rounded-t-2xl rounded-b-none border-b border-gray-200"
              : "rounded-xl border border-gray-100"
          )}
        />
      )}
      <div className="flex items-center gap-3">
        {icon && (
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gray-50 text-gray-700 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors duration-300 shrink-0">
            {icon}
          </div>
        )}
        <h3
          className={cn(
            "text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300",
            className
          )}
          {...props}
        >
          {children}
        </h3>
      </div>
    </div>
  );
}

export function CardDescription({ className, ...props }: CardDescriptionProps) {
  return (
    <p
      className={cn("text-sm text-gray-500 mt-2 leading-relaxed", className)}
      {...props}
    />
  );
}


export function CardContent({ className, ...props }: CardContentProps) {
  return <div className={cn("py-2", className)} {...props} />;
}

export function CardFooter({ className, ...props }: CardFooterProps) {
  return <div className={cn("pt-6 mt-auto", className)} {...props} />;
}
