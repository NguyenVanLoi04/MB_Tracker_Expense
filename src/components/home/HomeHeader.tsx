import { useUserProfile } from "@/hooks/auth/useUserProfile";
import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { COLORS, SPACING } from "../../constants/theme";
import { Icon } from "../Icon";

export const HomeHeader = () => {
  const { data: userProfile } = useUserProfile();
  const userName = userProfile?.data?.user_name;
  return (
    <Animated.View
      entering={FadeInDown.duration(800).springify()}
      style={styles.header}
    >
      <View>
        <Text style={styles.greeting}>Xin chào,</Text>
        <Text style={styles.userName}>{userName}</Text>
      </View>
      <TouchableOpacity style={styles.notificationBtn}>
        <Icon name="bell" size={24} color={COLORS.text} />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
    paddingTop: Platform.OS === "android" ? 40 : 10,
    paddingBottom: SPACING.md,
  },
  greeting: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.text,
  },
  notificationBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});
