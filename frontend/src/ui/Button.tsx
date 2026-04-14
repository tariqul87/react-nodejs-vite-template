import { forwardRef } from "react";
import type { ComponentPropsWithRef } from "react";
import { cn } from "./cn";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md";

export type ButtonProps = ComponentPropsWithRef<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-ui-primary text-white hover:bg-ui-primary-hover disabled:opacity-60",
  secondary:
    "border border-ui-border bg-white text-ui-fg hover:bg-slate-50 disabled:opacity-60",
  ghost: "text-ui-fg hover:bg-slate-100 disabled:opacity-60",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2.5 text-sm font-medium",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = "primary", size = "md", type = "button", ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        "inline-flex items-center justify-center rounded-(--radius-ui) transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ui-border-focus focus-visible:ring-offset-2",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  );
});
