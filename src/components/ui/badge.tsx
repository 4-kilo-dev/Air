import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold tracking-[-0.01em] shadow-[inset_0_1px_0_rgb(255_255_255_/0.2)] transition-[color,background-color,border-color,box-shadow,transform] duration-200 ease-out focus:outline-none focus-visible:ring-4 focus-visible:ring-ring/20 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-sm",
        secondary:
          "border-transparent bg-secondary/90 text-secondary-foreground hover:bg-secondary",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border-border/80 bg-background/70 text-foreground shadow-[inset_0_1px_0_rgb(255_255_255_/0.5)] hover:bg-muted/70",
        success:
          "border-emerald-200/80 bg-emerald-50/90 text-emerald-700 hover:bg-emerald-100/80 dark:border-emerald-800/40 dark:bg-emerald-950/40 dark:text-emerald-300 dark:hover:bg-emerald-950/60",
        gold:
          "border-amber-200/80 bg-amber-50/90 text-amber-800 hover:bg-amber-100/80 dark:border-amber-800/40 dark:bg-amber-950/40 dark:text-amber-300 dark:hover:bg-amber-950/60",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
