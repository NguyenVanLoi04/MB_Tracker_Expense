import { Icon } from "@/components/Icon";
import { COLORS } from "@/constants/theme";
import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

const AnimatedIcon = ({
  name,
  color,
  size,
  focused,
}: {
  name: any;
  color: string;
  size: number;
  focused: boolean;
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(focused ? 1.2 : 1) }],
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      <Icon name={name} color={color} size={size} />
    </Animated.View>
  );
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray[400],
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.white,
          borderTopWidth: 0,
          elevation: 10,
          shadowColor: COLORS.black,
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.05,
          shadowRadius: 10,
          height: Platform.OS === "ios" ? 50 : 50,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Tổng quan",
          tabBarIcon: ({ color, size, focused }) => (
            <AnimatedIcon
              name="layout-dashboard"
              color={color}
              size={size}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Lịch sử",
          tabBarIcon: ({ color, size, focused }) => (
            <AnimatedIcon
              name="history"
              color={color}
              size={size}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Cài đặt",
          tabBarIcon: ({ color, size, focused }) => (
            <AnimatedIcon
              name="settings"
              color={color}
              size={size}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}
