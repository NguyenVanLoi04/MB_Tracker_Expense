import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { CATEGORIES } from "../constants/categories";
import { COLORS, RADIUS, SPACING } from "../constants/theme";
import { Transaction } from "../types";
import { formatCurrency, formatDate } from "../utils";
import { Icon } from "./Icon";

interface TransactionItemProps {
  transaction: Transaction;
  onPress?: () => void;
}

export const TransactionItem = ({
  transaction,
  onPress,
}: TransactionItemProps) => {
  const category =
    CATEGORIES.find((c) => c.id === transaction.categoryId) || CATEGORIES[7];
  const isExpense = transaction.type === "expense";

  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={onPress}
    >
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: category.color + "15" },
        ]}
      >
        <Icon name={category.icon} size={22} color={category.color} />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.categoryName}>{category.name}</Text>
          <Text
            style={[
              styles.amount,
              { color: isExpense ? COLORS.danger : COLORS.success },
            ]}
          >
            {isExpense ? "-" : "+"}
            {formatCurrency(transaction.amount)}
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.note} numberOfLines={1}>
            {transaction.note || "Không có ghi chú"}
          </Text>
          <Text style={styles.date}>
            {formatDate(transaction.date, "dd/MM, HH:mm")}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: SPACING.md,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.sm,
  },
  pressed: {
    opacity: 0.7,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.md,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.md,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  note: {
    fontSize: 13,
    color: COLORS.textLight,
    flex: 1,
    marginRight: SPACING.sm,
  },
  date: {
    fontSize: 12,
    color: COLORS.gray[400],
  },
});
