import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS, RADIUS, SPACING } from "../constants/theme";
import { formatCurrency } from "../utils";
import { Icon } from "./Icon";

interface SummaryCardProps {
  balance: number;
  income: number;
  expense: number;
}

export const SummaryCard = ({ balance, income, expense }: SummaryCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.mainCard}>
        <View style={styles.decorCircle} />
        <View style={styles.decorCircleSmall} />

        <View style={styles.balanceHeader}>
          <View>
            <Text style={styles.label}>Tổng số dư</Text>
            <Text style={styles.balance}>{formatCurrency(balance)}</Text>
          </View>
          <View style={styles.chip}>
            <Text style={styles.chipText}>Hôm nay</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.statsItem}>
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: "rgba(255,255,255,0.2)" },
              ]}
            >
              <Icon name="arrow-down-left" size={18} color={COLORS.white} />
            </View>
            <View>
              <Text style={styles.statsLabel}>Thu nhập</Text>
              <Text style={styles.statsValue}>{formatCurrency(income)}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.statsItem}>
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: "rgba(255,255,255,0.2)" },
              ]}
            >
              <Icon name="arrow-up-right" size={18} color={COLORS.white} />
            </View>
            <View>
              <Text style={styles.statsLabel}>Chi tiêu</Text>
              <Text style={styles.statsValue}>{formatCurrency(expense)}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
  },
  mainCard: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    elevation: 8,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    overflow: "hidden",
  },
  decorCircle: {
    position: "absolute",
    top: -50,
    right: -50,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  decorCircleSmall: {
    position: "absolute",
    bottom: -30,
    left: -30,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  balanceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: SPACING.xl,
  },
  label: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 4,
  },
  balance: {
    color: COLORS.white,
    fontSize: 32,
    fontWeight: "bold",
  },
  chip: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
  },
  chipText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
  },
  statsItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  statsLabel: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 10,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  statsValue: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "700",
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: "rgba(255,255,255,0.2)",
    marginHorizontal: 8,
  },
});
