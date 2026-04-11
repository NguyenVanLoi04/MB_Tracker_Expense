import { Link, Stack } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon } from "../src/components/Icon";
import { COLORS, RADIUS, SPACING } from "../src/constants/theme";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!", headerShown: false }} />
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Icon name="search-x" size={64} color={COLORS.primary} />
        </View>
        <Text style={styles.title}>Không tìm thấy trang!</Text>
        <Text style={styles.subtitle}>
          Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
        </Text>

        <Link href="/(tabs)" style={styles.link} asChild>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Về trang chủ</Text>
          </View>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: SPACING.xl,
    backgroundColor: COLORS.background,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.xl,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: SPACING.sm,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: "center",
    marginBottom: SPACING.xxl,
    lineHeight: 24,
  },
  link: {
    marginTop: SPACING.lg,
    alignSelf: "stretch",
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.lg,
    alignItems: "center",
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "700",
  },
});
