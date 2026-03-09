"use client";

import React from "react";

type VertalisWordProps = {
  className?: string;
  style?: React.CSSProperties;
  as?: React.ElementType;
  children?: React.ReactNode;
};

export default function VertalisWord({
  as: Component = "div",
  className,
  style,
  children = "Vertalis",
}: VertalisWordProps) {
  return (
    <Component className={className} style={style}>
      {children}
    </Component>
  );
}
