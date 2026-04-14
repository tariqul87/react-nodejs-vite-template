import { forwardRef } from "react";
import type { ComponentPropsWithRef } from "react";
import { cn } from "./cn";

export type InputProps = ComponentPropsWithRef<"input">;

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      className={cn(
        "w-full rounded-(--radius-ui) border border-ui-border bg-white px-3 py-2 text-ui-fg placeholder:text-slate-400 focus:border-ui-border-focus focus:outline-none",
        className,
      )}
      {...props}
    />
  );
});
