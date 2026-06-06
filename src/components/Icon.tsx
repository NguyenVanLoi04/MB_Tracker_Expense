import * as Icons from "lucide-react-native";
import { LucideProps } from "lucide-react-native";
import React from "react";
import { StyleProp, ViewStyle } from "react-native";

interface IconProps extends LucideProps {
  name: string;
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}

export const Icon = React.memo(({ name, strokeWidth = 1.5, ...props }: IconProps) => {
  if (!name) return null;

  // Smart aliases for specific icon preferences
  const aliasMap: Record<string, string> = {
    // e.g. "wallet": "wallet-cards"
  };

  const finalName = aliasMap[name] || name;

  const iconName = finalName
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("") as keyof typeof Icons;

  // eslint-disable-next-line import/namespace
  const LucideIcon = Icons[iconName] as React.ElementType;

  return LucideIcon ? <LucideIcon strokeWidth={strokeWidth} {...props} /> : null;
});

Icon.displayName = "Icon";
