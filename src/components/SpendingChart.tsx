import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeOut,
  Layout,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { COLORS, RADIUS, SHADOWS, SPACING } from "../constants/theme";
import { formatCurrency } from "../utils";

interface ChartData {
  day: string;
  amount: number;
}

interface SpendingChartProps {
  data: ChartData[];
  title: string;
}

const AnimatedBar = ({
  height,
  amount,
  index,
  isSelected,
  isMax,
  onPress,
}: {
  height: number;
  amount: number;
  index: number;
  isSelected: boolean;
  isMax: boolean;
  onPress: () => void;
}) => {
  const animatedHeight = useSharedValue(0);

  useEffect(() => {
    animatedHeight.value = withDelay(
      300 + index * 100,
      withSpring(Math.max(height, 8), { damping: 12, stiffness: 100 }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [height, index]);

  const animatedStyle = useAnimatedStyle(() => ({
    height: animatedHeight.value,
    opacity: withTiming(isSelected ? 1 : isMax ? 0.8 : 0.3, { duration: 300 }),
    transform: [
      {
        scaleY: withSpring(isSelected ? 1.05 : 1),
      },
    ],
  }));

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress();
      }}
      style={styles.barTouchArea}
    >
      <View
        style={[styles.barWrapper, isSelected && styles.barWrapperSelected]}
      >
        <Animated.View
          style={[
            styles.bar,
            animatedStyle,
            {
              backgroundColor: isSelected
                ? COLORS.primary
                : isMax
                  ? COLORS.warning
                  : COLORS.primary,
            },
          ]}
        />
      </View>
    </TouchableOpacity>
  );
};

export const SpendingChart = ({ data, title }: SpendingChartProps) => {
  const maxAmount = Math.max(...data.map((d) => d.amount), 1);
  const [selectedIndex, setSelectedIndex] = useState<number>(data.length - 1);

  const selectedData = data[selectedIndex];

  return (
    <Animated.View
      entering={FadeInDown.delay(400).springify()}
      layout={Layout.springify()}
      style={styles.container}
    >
      <View style={styles.topAccent} />

      {/* Premium Header Area */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Tuần này</Text>
          </View>
          <Text style={styles.title}>{title}</Text>
        </View>

        <View style={styles.valueContainer}>
          <Animated.Text
            key={`amount-${selectedIndex}`}
            entering={FadeInUp.duration(400).springify()}
            exiting={FadeOut.duration(200)}
            style={styles.selectedValue}
          >
            {selectedData ? formatCurrency(selectedData.amount) : "0 đ"}
          </Animated.Text>
          <Text style={styles.selectedDayText}>
            {selectedData?.day
              ? `Chi tiêu ngày ${selectedData.day}`
              : "Chưa có giao dịch"}
          </Text>
        </View>
      </View>

      {/* Modern High-End Chart Area */}
      <View style={styles.chartArea}>

        {data.map((item, index) => {
          const barHeight = (item.amount / maxAmount) * 105; // Slightly taller max height
          return (
            <View key={item.day} style={styles.barContainer}>
              <AnimatedBar
                height={barHeight}
                amount={item.amount}
                index={index}
                isSelected={selectedIndex === index}
                isMax={item.amount === maxAmount && item.amount > 0}
                onPress={() => setSelectedIndex(index)}
              />
              <Text
                style={[
                  styles.dayText,
                  selectedIndex === index && styles.dayTextSelected,
                ]}
              >
                {item.day}
              </Text>
            </View>
          );
        })}
      </View>

      {/* Footer Details */}
      <View style={styles.footer}>
        <View style={styles.footerInfo}>
          <Text style={styles.totalText}>Tổng cộng (7 ngày)</Text>
          <Text style={styles.totalValue}>
            {formatCurrency(data.reduce((sum, d) => sum + d.amount, 0))}
          </Text>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.lg,
    ...SHADOWS.lg,
    overflow: "hidden",
    position: "relative",
  },
  topAccent: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: COLORS.primary,
    zIndex: 1,
  },
  header: {
    padding: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: SPACING.md,
  },
  badge: {
    backgroundColor: COLORS.primary + "1A", // 10% opacity
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
  },
  badgeText: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  title: {
    fontSize: 14,
    color: COLORS.textLight,
    fontWeight: "500",
  },
  valueContainer: {
    alignItems: "flex-start",
  },
  selectedValue: {
    fontSize: 32,
    fontWeight: "900",
    color: COLORS.text,
    letterSpacing: -1,
  },
  selectedDayText: {
    fontSize: 13,
    color: COLORS.gray[500],
    fontWeight: "500",
    marginTop: 2,
  },
  chartArea: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: 160, // Increased slightly from 140
    paddingHorizontal: SPACING.md,
    position: "relative",
  },
  gridLines: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "space-between",
    paddingBottom: 28,
    paddingTop: 30,
    paddingHorizontal: SPACING.md,
    zIndex: -1,
  },
  gridLine: {
    height: 1,
    backgroundColor: COLORS.gray[800], // Faded by opacity
    width: "100%",
    borderStyle: "dashed",
  },
  barContainer: {
    alignItems: "center",
    flex: 1,
  },
  barTouchArea: {
    height: 130, // Increased from 110
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  barWrapper: {
    height: 120, // Increased from 100
    width: 22, 
    backgroundColor: "rgba(0,0,0,0.02)",
    borderRadius: RADIUS.full,
    justifyContent: "flex-end",
  },
  barWrapperSelected: {
    backgroundColor: "transparent",
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 12,
    elevation: 8,
  },
  bar: {
    width: "100%",
    borderRadius: RADIUS.full,
  },
  dayText: {
    fontSize: 12,
    color: COLORS.gray[400],
    marginTop: 10,
    fontWeight: "600",
  },
  dayTextSelected: {
    color: COLORS.text,
    fontWeight: "900",
  },
  footer: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.gray[50], // subtle bottom bar
    borderTopWidth: 1,
    borderTopColor: COLORS.gray[100],
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerInfo: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalText: {
    fontSize: 13,
    color: COLORS.textLight,
    fontWeight: "500",
  },
  totalValue: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.text,
  },
});
