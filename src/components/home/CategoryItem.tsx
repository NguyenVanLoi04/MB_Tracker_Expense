import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLORS, RADIUS, SPACING } from "../../constants/theme";
import { ICategory } from "../../interfaces/category/interface";
import { Icon } from "../Icon";

interface CategoryItemProps {
  category: ICategory;
  isActive: boolean;
  onPress: (id: number) => void;
}

export const CategoryItem = React.memo(
  ({ category, isActive, onPress }: CategoryItemProps) => {
    return (
      <TouchableOpacity
        style={[
          styles.categoryItem,
          isActive && styles.categoryItemActive,
          isActive && {
            borderColor: category.color,
          },
        ]}
        onPress={() => onPress(category.id)}
      >
        <Icon
          name={category.icon}
          size={20}
          color={isActive ? category.color : COLORS.textLight}
        />
        <Text
          style={[
            styles.categoryLabel,
            isActive && {
              color: category.color,
              fontWeight: "700",
            },
          ]}
        >
          {category.name}
        </Text>
      </TouchableOpacity>
    );
  },
);

CategoryItem.displayName = "CategoryItem";

const styles = StyleSheet.create({
  categoryItem: {
    width: "23%",
    aspectRatio: 1,
    backgroundColor: COLORS.gray[50],
    borderRadius: RADIUS.md,
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING.xs,
    borderWidth: 1,
    borderColor: "transparent",
  },
  categoryItemActive: {
    backgroundColor: "rgba(0,0,0,0.03)",
  },
  categoryLabel: {
    fontSize: 10,
    marginTop: 4,
    color: COLORS.textLight,
    textAlign: "center",
  },
});
