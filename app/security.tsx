import { Icon } from "@/components/Icon";
import { COLORS, RADIUS, SPACING } from "@/constants/theme";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeIn, FadeInDown, Layout } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SecurityScreen() {
  const router = useRouter();
  const [faceId, setFaceId] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View entering={FadeInDown.duration(600)} style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Icon name="chevron-left" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Bảo mật</Text>
        <View style={{ width: 40 }} />
      </Animated.View>

      <Animated.ScrollView
        entering={FadeIn.delay(200)}
        contentContainerStyle={styles.content}
      >
        <Animated.View
          entering={FadeInDown.delay(300)}
          layout={Layout.springify()}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>Phương thức bảo mật</Text>
          <View style={styles.card}>
            <View style={styles.item}>
              <View style={styles.itemLeft}>
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: COLORS.primary + "15" },
                  ]}
                >
                  <Icon name="user-check" size={20} color={COLORS.primary} />
                </View>
                <View>
                  <Text style={styles.itemTitle}>
                    Xác thực khuôn mặt (FaceID)
                  </Text>
                  <Text style={styles.itemDesc}>
                    Sử dụng FaceID để đăng nhập nhanh
                  </Text>
                </View>
              </View>
              <Switch
                value={faceId}
                onValueChange={setFaceId}
                trackColor={{ true: COLORS.primary }}
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.item}>
              <View style={styles.itemLeft}>
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: COLORS.warning + "15" },
                  ]}
                >
                  <Icon name="shield" size={20} color={COLORS.warning} />
                </View>
                <View>
                  <Text style={styles.itemTitle}>Bảo mật 2 lớp (2FA)</Text>
                  <Text style={styles.itemDesc}>
                    Thêm một lớp bảo mật khi đăng nhập
                  </Text>
                </View>
              </View>
              <Switch
                value={twoFactor}
                onValueChange={setTwoFactor}
                trackColor={{ true: COLORS.primary }}
              />
            </View>
          </View>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(400)}
          layout={Layout.springify()}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>Mật khẩu</Text>
          <TouchableOpacity style={styles.card}>
            <View style={styles.item}>
              <View style={styles.itemLeft}>
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: COLORS.info + "15" },
                  ]}
                >
                  <Icon name="key" size={20} color={COLORS.info} />
                </View>
                <Text style={styles.itemTitle}>Thay đổi mật khẩu</Text>
              </View>
              <Icon name="chevron-right" size={20} color={COLORS.gray[300]} />
            </View>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(500)}
          layout={Layout.springify()}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>Thiết bị</Text>
          <TouchableOpacity style={styles.card}>
            <View style={styles.item}>
              <View style={styles.itemLeft}>
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: COLORS.gray[100] },
                  ]}
                >
                  <Icon name="smartphone" size={20} color={COLORS.gray[500]} />
                </View>
                <Text style={styles.itemTitle}>
                  Quản lý thiết bị đang đăng nhập
                </Text>
              </View>
              <Icon name="chevron-right" size={20} color={COLORS.gray[300]} />
            </View>
          </TouchableOpacity>
        </Animated.View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: SPACING.lg,
    backgroundColor: COLORS.white,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.text,
  },
  content: {
    padding: SPACING.lg,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.textLight,
    textTransform: "uppercase",
    marginBottom: SPACING.sm,
    marginLeft: 4,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    overflow: "hidden",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: SPACING.md,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.md,
    justifyContent: "center",
    alignItems: "center",
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.text,
  },
  itemDesc: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.gray[50],
    marginLeft: 56,
  },
});
