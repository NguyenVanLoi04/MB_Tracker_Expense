import * as Icons from "lucide-react-native";
import { LucideProps } from "lucide-react-native";
import React from "react";

interface IconProps extends LucideProps {
  name: string;
}

export const Icon = ({ name, ...props }: IconProps) => {
  if (!name) return null;

  const iconName = name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("") as keyof typeof Icons;

  // eslint-disable-next-line import/namespace
  const LucideIcon = Icons[iconName] as React.ElementType;

  return LucideIcon ? <LucideIcon {...props} /> : null;
};
