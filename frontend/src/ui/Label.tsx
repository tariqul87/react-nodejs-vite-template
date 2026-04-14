import { forwardRef } from "react";
import type { ComponentPropsWithRef } from "react";
import { cn } from "./cn";

export type LabelProps = ComponentPropsWithRef<"label">;

export const Label = forwardRef<HTMLLabelElement, LabelProps>(function Label(
  { className, ...props },
  ref,
) {
  return (
    <label
      ref={ref}
      className={cn("mb-1 block text-sm font-medium text-ui-label", className)}
      {...props}
    />
  );
});
