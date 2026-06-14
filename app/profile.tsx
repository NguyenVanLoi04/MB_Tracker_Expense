import { Icon } from "@/components/Icon";
import { COLORS, RADIUS, SPACING } from "@/constants/theme";
import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  FadeIn,
  FadeInDown,
  Layout,
  ZoomIn,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { showToast } from "../src/services/toast";

export default function ProfileScreen() {
  const router = useRouter();
  const [name, setName] = useState("Người dùng");
  const [email, setEmail] = useState("user@expensetracker.com");
  const [phone, setPhone] = useState("0123456789");

  const handleSave = () => {
    showToast.success("Thành công!", "Đã lưu thông tin cá nhân!");
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <Animated.View entering={FadeInDown.duration(600)} style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Icon name="chevron-left" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Thông tin cá nhân</Text>
        <View style={{ width: 40 }} />
      </Animated.View>

      <Animated.ScrollView
        entering={FadeIn.delay(200)}
        contentContainerStyle={styles.content}
      >
        <Animated.View
          entering={ZoomIn.delay(300).springify()}
          style={styles.avatarSection}
        >
          <View style={styles.avatar}>
            <Icon name="user" size={48} color={COLORS.white} />
            <TouchableOpacity style={styles.editAvatarBtn}>
              <Icon name="camera" size={16} color={COLORS.white} />
            </TouchableOpacity>
          </View>
          <Text style={styles.changeAvatarText}>Thay đổi ảnh đại diện</Text>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(400)}
          layout={Layout.springify()}
          style={styles.form}
        >
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Họ và tên</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Nhập họ và tên"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Nhập email"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Số điện thoại</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="Nhập số điện thoại"
              keyboardType="phone-pad"
            />
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(600)}>
          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.saveBtnText}>Lưu thay đổi</Text>
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
  avatarSection: {
    alignItems: "center",
    marginBottom: SPACING.xl,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  editAvatarBtn: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.secondary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: COLORS.white,
  },
  changeAvatarText: {
    marginTop: SPACING.sm,
    color: COLORS.primary,
    fontWeight: "600",
  },
  form: {
    gap: SPACING.lg,
  },
  inputGroup: {
    gap: SPACING.xs,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
    marginLeft: 4,
  },
  input: {
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    fontSize: 16,
    borderWidth: 1,
    borderColor: COLORS.gray[100],
  },
  saveBtn: {
    backgroundColor: COLORS.primary,
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
    alignItems: "center",
    marginTop: SPACING.xxl,
  },
  saveBtnText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});
