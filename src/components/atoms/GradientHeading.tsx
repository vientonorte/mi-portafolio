import { cn } from "../../lib/utils";

interface GradientHeadingProps {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "span";
  className?: string;
}

export function GradientHeading({
  children,
  as: Tag = "span",
  className,
}: GradientHeadingProps) {
  return (
    <Tag className={cn("heading-gradient block", className)}>
      {children}
    </Tag>
  );
}