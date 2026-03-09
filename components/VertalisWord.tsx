import React from "react";

type VertalisWordProps = {
  className?: string;
  style?: React.CSSProperties;
  as?: React.ElementType;
  children?: React.ReactNode;
};

const baseStyle: React.CSSProperties = {
  fontFamily: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
  color: "#c06020",
  textShadow:
    "0 1px 0 rgba(255,255,255,0.22), 0 14px 30px rgba(192,96,32,0.38), 0 26px 58px rgba(0,0,0,0.55)",
};

export default function VertalisWord({
  className,
  style,
  as = "div",
  children,
}: VertalisWordProps) {
  const Component = as || "div";

  return (
    <Component className={className} style={{ ...baseStyle, ...style }}>
      {children ?? "Vertalis"}
    </Component>
  );
}
