import { createElement, forwardRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "./cn";

type HeadingLevel = 1 | 2 | 3;

const tagName: Record<HeadingLevel, "h1" | "h2" | "h3"> = {
  1: "h1",
  2: "h2",
  3: "h3",
};

const levelClasses: Record<HeadingLevel, string> = {
  1: "text-2xl font-bold text-ui-fg",
  2: "text-xl font-semibold text-ui-fg",
  3: "text-lg font-semibold text-ui-fg",
};

export type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  level?: HeadingLevel;
  children?: ReactNode;
};

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(function Heading(
  { className, level = 1, ...props },
  ref,
) {
  return createElement(tagName[level], {
    ref,
    className: cn(levelClasses[level], className),
    ...props,
  });
});
