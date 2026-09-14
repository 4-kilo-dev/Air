import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-xl border border-input/80 bg-background/90 px-3.5 py-2 text-base shadow-[inset_0_1px_1px_rgb(0_0_0_/0.03),0_1px_2px_rgb(0_0_0_/0.03)] transition-[border-color,box-shadow,background-color] duration-200 ease-out file:mr-3 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground/85 hover:border-foreground/15 focus-visible:border-ring focus-visible:bg-background focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/20 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none aria-invalid:border-destructive aria-invalid:ring-4 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
