import { Icon } from "@/components/Icon";
import ModalConfirmLogout from "@/components/ModalConfirmLogout";
import { COLORS, RADIUS, SPACING } from "@/constants/theme";
import { StorageService } from "@/services/storage.service";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  FadeIn,
  FadeInDown,
  SlideInDown,
  ZoomIn,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsScreen() {
  const router = useRouter();
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currency, setCurrency] = useState("VND");
  const [isLanguageModalVisible, setIsLanguageModalVisible] = useState(false);
  const [language, setLanguage] = useState("Tiếng Việt");

  const handleLogoutConfirm = async () => {
    setIsLogoutModalVisible(false);
    await StorageService.clearAllData();
    router.replace("/login");
  };

  const sections = [
    {
      title: "Tài khoản",
      items: [
        {
          icon: "user",
          title: "Thông tin cá nhân",
          color: COLORS.primary,
          // @ts-ignore
          onPress: () => router.push("/profile"),
        },
        {
          icon: "bell",
          title: "Thông báo",
          color: COLORS.warning,
          toggle: true,
          value: isNotificationEnabled,
          onValueChange: setIsNotificationEnabled,
        },
        {
          icon: "shield-check",
          title: "Bảo mật",
          color: COLORS.success,
          // @ts-ignore
          onPress: () => router.push("/security"),
        },
        {
          icon: "globe",
          title: "Ngôn ngữ",
          color: COLORS.info,
          value: language,
          onPress: () => setIsLanguageModalVisible(true),
        },
      ],
    },
    {
      title: "Giao diện & Tùy chọn",
      items: [
        {
          icon: "moon",
          title: "Chế độ tối",
          color: "#7c3aed",
          toggle: true,
          value: isDarkMode,
          onValueChange: setIsDarkMode,
        },
        {
          icon: "dollar-sign",
          title: "Tiền tệ",
          color: COLORS.success,
          value: currency,
          onPress: () => setCurrency(currency === "VND" ? "USD" : "VND"),
        },
      ],
    },
    {
      title: "Dữ liệu",
      items: [
        {
          icon: "download",
          title: "Xuất dữ liệu (CSV/PDF)",
          color: COLORS.info,
          onPress: () => alert("Dữ liệu đang được chuẩn bị để xuất..."),
        },
        {
          icon: "trash-2",
          title: "Xóa bộ nhớ đệm",
          color: COLORS.danger,
          onPress: () => alert("Đã xóa bộ nhớ đệm thành công"),
        },
      ],
    },
    {
      title: "Ứng dụng",
      items: [
        {
          icon: "help-circle",
          title: "Trợ giúp & Hỗ trợ",
          color: COLORS.gray[500],
          onPress: () => alert("Chức năng Trợ giúp & Hỗ trợ đang phát triển"),
        },
        {
          icon: "star",
          title: "Đánh giá ứng dụng",
          color: COLORS.gray[500],
          onPress: () => alert("Cảm ơn bạn đã đánh giá!"),
        },
        {
          icon: "share-2",
          title: "Chia sẻ ứng dụng",
          color: COLORS.gray[500],
          onPress: () => alert("Mở trình chia sẻ của hệ thống..."),
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View entering={FadeInDown.duration(600)} style={styles.header}>
        <Text style={styles.title}>Cài đặt</Text>
      </Animated.View>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        entering={FadeIn.delay(200)}
      >
        <Animated.View
          entering={ZoomIn.delay(300).springify()}
          style={styles.profileCard}
        >
          <View style={styles.avatar}>
            <Icon name="user" size={32} color={COLORS.white} />
          </View>
          <View>
            <Text style={styles.profileName}>Người dùng</Text>
            <Text style={styles.profileEmail}>user@expensetracker.com</Text>
          </View>
        </Animated.View>

        {sections.map((section, sectionIndex) => (
          <Animated.View
            key={section.title}
            entering={FadeInDown.delay(400 + sectionIndex * 100)}
            style={styles.section}
          >
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.card}>
              {section.items.map((item, index) => (
                <View key={item.title}>
                  <TouchableOpacity
                    style={styles.menuItem}
                    onPress={item.onPress}
                    disabled={item.toggle}
                  >
                    <View
                      style={[
                        styles.menuIcon,
                        { backgroundColor: item.color + "15" },
                      ]}
                    >
                      <Icon name={item.icon} size={20} color={item.color} />
                    </View>
                    <Text style={styles.menuTitle}>{item.title}</Text>
                    {item.toggle ? (
                      <Switch
                        value={item.value}
                        onValueChange={item.onValueChange}
                        trackColor={{ true: COLORS.primary }}
                      />
                    ) : (
                      <View style={styles.menuRight}>
                        {item.value && (
                          <Text style={styles.menuValue}>{item.value}</Text>
                        )}
                        <Icon
                          name="chevron-right"
                          size={18}
                          color={COLORS.gray[300]}
                        />
                      </View>
                    )}
                  </TouchableOpacity>
                  {index < section.items.length - 1 && (
                    <View style={styles.divider} />
                  )}
                </View>
              ))}
            </View>
          </Animated.View>
        ))}

        <Animated.View entering={FadeInDown.delay(800)}>
          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={() => setIsLogoutModalVisible(true)}
          >
            <Icon name="log-out" size={20} color={COLORS.danger} />
            <Text style={styles.logoutBtnText}>Đăng xuất</Text>
          </TouchableOpacity>

          <Text style={styles.versionText}>Phiên bản 1.0.0 (Premium)</Text>
        </Animated.View>
      </Animated.ScrollView>

      <ModalConfirmLogout
        visible={isLogoutModalVisible}
        onCancel={() => setIsLogoutModalVisible(false)}
        onConfirm={handleLogoutConfirm}
      />

      <Modal
        visible={isLanguageModalVisible}
        transparent={true}
        animationType="none"
        onRequestClose={() => setIsLanguageModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          {isLanguageModalVisible && (
            <Animated.View entering={SlideInDown} style={styles.languageModal}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Chọn Ngôn ngữ</Text>
                <TouchableOpacity
                  onPress={() => setIsLanguageModalVisible(false)}
                >
                  <Icon name="x" size={24} color={COLORS.text} />
                </TouchableOpacity>
              </View>

              {["Tiếng Việt", "English", "日本語", "Français"].map((lang) => (
                <TouchableOpacity
                  key={lang}
                  style={styles.langItem}
                  onPress={() => {
                    setLanguage(lang);
                    setIsLanguageModalVisible(false);
                  }}
                >
                  <Text
                    style={[
                      styles.langText,
                      language === lang && styles.langTextActive,
                    ]}
                  >
                    {lang}
                  </Text>
                  {language === lang && (
                    <Icon name="check" size={20} color={COLORS.primary} />
                  )}
                </TouchableOpacity>
              ))}
            </Animated.View>
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: SPACING.lg,
    backgroundColor: COLORS.white,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.text,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: SPACING.lg,
    backgroundColor: COLORS.white,
    margin: SPACING.lg,
    borderRadius: RADIUS.xl,
    gap: SPACING.md,
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.text,
  },
  profileEmail: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  section: {
    paddingHorizontal: SPACING.lg,
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
    borderRadius: RADIUS.xl,
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: SPACING.md,
  },
  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.md,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.md,
  },
  menuTitle: {
    fontSize: 15,
    color: COLORS.text,
    flex: 1,
  },
  menuRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  menuValue: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.gray[50],
    marginLeft: 36 + SPACING.md + SPACING.md,
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: SPACING.xl,
    padding: SPACING.md,
    backgroundColor: COLORS.danger + "10",
    marginHorizontal: SPACING.lg,
    borderRadius: RADIUS.lg,
    gap: 8,
  },
  logoutBtnText: {
    color: COLORS.danger,
    fontWeight: "bold",
  },
  versionText: {
    textAlign: "center",
    marginTop: SPACING.xxl,
    color: COLORS.gray[400],
    fontSize: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  languageModal: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
    padding: SPACING.lg,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.lg,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.text,
  },
  langItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[50],
  },
  langText: {
    fontSize: 16,
    color: COLORS.text,
  },
  langTextActive: {
    color: COLORS.primary,
    fontWeight: "bold",
  },
});
