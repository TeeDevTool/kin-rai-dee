import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:size-6 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-secondary text-primary-foreground hover:bg-primary/80 active:bg-primary disabled:bg-gray-200 disabled:text-gray-400",
        outline:
          "border border-input border-primary bg-background/70 text-secondary hover:bg-secondary/80 hover:text-secondary-foreground hover:border-0 active:bg-secondary active:text-secondary-foreground active:border-0 disabled:border-gray-400 disabled:text-gray-400 disabled:bg-background/0",
        text: "text-primary hover:bg-primary/80 hover:text-primary-foreground active:bg-primary active:text-primary-foreground disabled:text-gray-400",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3 text-xs",
        lg: "h-20 px-21 py-5 text-[2rem] md:h-28 md:px-40 lg:px-45 [&_svg]:size-12",
        icon: "h-10 w-10",
      },
      active: {
        true: null,
        false: null,
      },
    },
    compoundVariants: [
      {
        variant: "default",
        active: true,
        class: "bg-primary",
      },
      {
        variant: "outline",
        active: true,
        class: "bg-secondary text-secondary-foreground border-0",
      },
      {
        variant: "text",
        active: true,
        class: "bg-primary text-primary-foreground",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
      active: false,
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, active, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          buttonVariants({
            variant,
            size,
            active,
            className,
          }),
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
