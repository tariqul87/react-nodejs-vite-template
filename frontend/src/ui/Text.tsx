import { forwardRef } from "react";
import type { ComponentPropsWithRef } from "react";
import { cn } from "./cn";

type TextVariant = "default" | "muted" | "small" | "danger";

export type TextProps = ComponentPropsWithRef<"p"> & {
  variant?: TextVariant;
};

const variantClasses: Record<TextVariant, string> = {
  default: "text-base text-ui-fg",
  muted: "text-sm text-ui-muted",
  small: "text-sm text-ui-fg",
  danger: "text-sm text-ui-danger",
};

export const Text = forwardRef<HTMLParagraphElement, TextProps>(function Text(
  { className, variant = "default", ...props },
  ref,
) {
  return <p ref={ref} className={cn(variantClasses[variant], className)} {...props} />;
});
