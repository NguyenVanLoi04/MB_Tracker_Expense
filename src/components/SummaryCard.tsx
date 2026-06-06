import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { COLORS, RADIUS, SHADOWS, SPACING } from "../constants/theme";
import { formatCurrency } from "../utils";
import { Icon } from "./Icon";

interface SummaryCardProps {
  balance: number;
  income: number;
  expense: number;
}

const LiquidBackground = () => {
  const blob1Rotation = useSharedValue(0);
  const blob2Rotation = useSharedValue(0);
  const blob3Rotation = useSharedValue(0);

  const blob1Scale = useSharedValue(1);
  const blob2Scale = useSharedValue(1);
  const blob3Scale = useSharedValue(1);

  useEffect(() => {
    blob1Rotation.value = withRepeat(
      withTiming(360, { duration: 15000, easing: Easing.linear }),
      -1,
      false
    );
    blob2Rotation.value = withRepeat(
      withTiming(-360, { duration: 18000, easing: Easing.linear }),
      -1,
      false
    );
    blob3Rotation.value = withRepeat(
      withTiming(360, { duration: 25000, easing: Easing.linear }),
      -1,
      false
    );

    blob1Scale.value = withRepeat(
      withTiming(1.2, { duration: 6000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
    blob2Scale.value = withRepeat(
      withTiming(1.3, { duration: 8000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
    blob3Scale.value = withRepeat(
      withTiming(1.15, { duration: 7000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const styleBlob1 = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${blob1Rotation.value}deg` },
      { scale: blob1Scale.value },
      { translateX: 20 },
    ],
  }));

  const styleBlob2 = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${blob2Rotation.value}deg` },
      { scale: blob2Scale.value },
      { translateX: -15 },
    ],
  }));

  const styleBlob3 = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${blob3Rotation.value}deg` },
      { scale: blob3Scale.value },
      { translateY: 20 },
    ],
  }));

  return (
    <View style={StyleSheet.absoluteFillObject}>
      <Animated.View style={[styles.blob1, styleBlob1]} />
      <Animated.View style={[styles.blob2, styleBlob2]} />
      <Animated.View style={[styles.blob3, styleBlob3]} />
    </View>
  );
};

export const SummaryCard = ({ balance, income, expense }: SummaryCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.mainCard}>
        <LiquidBackground />

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
    ...SHADOWS.primary,
    overflow: "hidden",
  },
  blob1: {
    position: "absolute",
    top: -50,
    right: -30,
    width: 180,
    height: 180,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 90,
    borderTopLeftRadius: 110,
    borderBottomRightRadius: 130,
  },
  blob2: {
    position: "absolute",
    bottom: -60,
    left: -40,
    width: 160,
    height: 160,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 80,
    borderTopRightRadius: 100,
    borderBottomLeftRadius: 110,
  },
  blob3: {
    position: "absolute",
    top: 20,
    left: 40,
    width: 120,
    height: 120,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 60,
    borderTopLeftRadius: 70,
    borderBottomRightRadius: 80,
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
