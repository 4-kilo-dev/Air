import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-xl border border-transparent bg-clip-padding text-sm font-medium tracking-[-0.01em] whitespace-nowrap shadow-[0_1px_2px_rgb(0_0_0_/0.08)] transition-[color,background-color,border-color,box-shadow,transform] duration-200 ease-out outline-none select-none hover:-translate-y-px focus-visible:border-ring focus-visible:ring-4 focus-visible:ring-ring/20 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:not-aria-[haspopup]:translate-y-0 active:not-aria-[haspopup]:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none aria-invalid:border-destructive aria-invalid:ring-4 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 motion-reduce:transform-none motion-reduce:transition-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[0_1px_2px_rgb(0_0_0_/0.14),0_4px_12px_rgb(0_0_0_/0.08)] hover:bg-primary/90 hover:shadow-[0_2px_4px_rgb(0_0_0_/0.14),0_8px_18px_rgb(0_0_0_/0.1)]",
        outline:
          "border-border/80 bg-background/90 shadow-[inset_0_1px_0_rgb(255_255_255_/0.5),0_1px_2px_rgb(0_0_0_/0.04)] hover:border-foreground/15 hover:bg-muted/70 hover:text-foreground aria-expanded:border-foreground/15 aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-secondary/85 text-secondary-foreground hover:bg-secondary aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "bg-transparent shadow-none hover:bg-muted/75 hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive text-destructive-foreground shadow-[0_1px_2px_rgb(0_0_0_/0.12),0_4px_12px_rgb(0_0_0_/0.08)] hover:bg-destructive/90 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        link: "h-auto bg-transparent px-0 py-0 text-primary shadow-none underline-offset-4 hover:translate-y-0 hover:underline",
      },
      size: {
        default:
          "h-9 gap-1.5 px-3.5 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        xs: "h-7 gap-1 rounded-lg px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1 rounded-[0.7rem] px-3 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-10 gap-2 rounded-[0.85rem] px-4 has-data-[icon=inline-end]:pr-3.5 has-data-[icon=inline-start]:pl-3.5",
        icon: "size-9",
        "icon-xs":
          "size-7 rounded-lg in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-8 rounded-[0.7rem] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-10 rounded-[0.85rem]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
