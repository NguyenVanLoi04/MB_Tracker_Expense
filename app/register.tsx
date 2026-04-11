import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Animated, {
  FadeInDown,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Icon } from "../src/components/Icon";
import { COLORS, RADIUS, SPACING } from "../src/constants/theme";

export default function RegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [focusedInput, setFocusedInput] = useState<
    "name" | "email" | "password" | "confirmPassword" | null
  >(null);

  const focusSharedValue = useSharedValue(0);

  useEffect(() => {
    focusSharedValue.value = withSpring(focusedInput ? 1 : 0);
  }, [focusedInput, focusSharedValue]);

  const logoAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: interpolate(focusSharedValue.value, [0, 1], [1, 0.9]) },
        {
          rotate: `${interpolate(focusSharedValue.value, [0, 1], [0, -5])}deg`,
        },
      ],
    };
  });

  const handleRegister = () => {
    router.replace("/(tabs)");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          {/* Header Section */}
          <Animated.View
            entering={FadeInDown.duration(800).springify()}
            style={styles.header}
          >
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <Icon name="arrow-left" size={24} color={COLORS.text} />
            </TouchableOpacity>
            <Animated.View style={[styles.logoContainer, logoAnimatedStyle]}>
              <Icon name="user-plus" size={48} color={COLORS.primary} />
            </Animated.View>
            <Text style={styles.title}>Tạo tài khoản</Text>
            <Text style={styles.subtitle}>
              Bắt đầu quản lý tài chính của bạn
            </Text>
          </Animated.View>

          {/* Form Section */}
          <Animated.View
            entering={FadeInDown.delay(200).duration(800).springify()}
            style={styles.form}
          >
            {/* Name Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Họ và tên</Text>
              <View
                style={[
                  styles.inputContainer,
                  focusedInput === "name" && styles.inputContainerFocused,
                ]}
              >
                <Icon
                  name="user"
                  size={20}
                  color={
                    focusedInput === "name" ? COLORS.primary : COLORS.gray[400]
                  }
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Nhập họ và tên"
                  placeholderTextColor={COLORS.gray[400]}
                  value={name}
                  onChangeText={setName}
                  onFocus={() => setFocusedInput("name")}
                  onBlur={() => setFocusedInput(null)}
                />
              </View>
            </View>

            {/* Email Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <View
                style={[
                  styles.inputContainer,
                  focusedInput === "email" && styles.inputContainerFocused,
                ]}
              >
                <Icon
                  name="mail"
                  size={20}
                  color={
                    focusedInput === "email" ? COLORS.primary : COLORS.gray[400]
                  }
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Nhập email của bạn"
                  placeholderTextColor={COLORS.gray[400]}
                  value={email}
                  onChangeText={setEmail}
                  onFocus={() => setFocusedInput("email")}
                  onBlur={() => setFocusedInput(null)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* Password Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Mật khẩu</Text>
              <View
                style={[
                  styles.inputContainer,
                  focusedInput === "password" && styles.inputContainerFocused,
                ]}
              >
                <Icon
                  name="lock"
                  size={20}
                  color={
                    focusedInput === "password"
                      ? COLORS.primary
                      : COLORS.gray[400]
                  }
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Nhập mật khẩu"
                  placeholderTextColor={COLORS.gray[400]}
                  value={password}
                  onChangeText={setPassword}
                  onFocus={() => setFocusedInput("password")}
                  onBlur={() => setFocusedInput(null)}
                  secureTextEntry={!isPasswordVisible}
                />
                <TouchableOpacity
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  style={styles.eyeIcon}
                >
                  <Icon
                    name={isPasswordVisible ? "eye-off" : "eye"}
                    size={20}
                    color={COLORS.gray[400]}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Confirm Password Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Xác nhận mật khẩu</Text>
              <View
                style={[
                  styles.inputContainer,
                  focusedInput === "confirmPassword" &&
                    styles.inputContainerFocused,
                ]}
              >
                <Icon
                  name="shield"
                  size={20}
                  color={
                    focusedInput === "confirmPassword"
                      ? COLORS.primary
                      : COLORS.gray[400]
                  }
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Nhập lại mật khẩu"
                  placeholderTextColor={COLORS.gray[400]}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  onFocus={() => setFocusedInput("confirmPassword")}
                  onBlur={() => setFocusedInput(null)}
                  secureTextEntry={!isConfirmPasswordVisible}
                />
                <TouchableOpacity
                  onPress={() =>
                    setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                  }
                  style={styles.eyeIcon}
                >
                  <Icon
                    name={isConfirmPasswordVisible ? "eye-off" : "eye"}
                    size={20}
                    color={COLORS.gray[400]}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Register Button */}
            <Animated.View entering={FadeInDown.delay(400).springify()}>
              <TouchableOpacity
                style={styles.registerButton}
                activeOpacity={0.8}
                onPress={handleRegister}
              >
                <Text style={styles.registerButtonText}>Đăng ký ngay</Text>
              </TouchableOpacity>
            </Animated.View>

            {/* Login Link */}
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Đã có tài khoản? </Text>
              <TouchableOpacity onPress={() => router.back()}>
                <Text style={styles.loginLinkText}>Đăng nhập</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  innerContainer: {
    flex: 1,
    padding: SPACING.lg,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: SPACING.xl,
    position: "relative",
  },
  backButton: {
    position: "absolute",
    left: 0,
    top: 24, // Vertically center aligned roughly with the logo height
    padding: SPACING.sm,
    zIndex: 1,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.md,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
    marginTop: SPACING.lg,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.textLight,
    fontWeight: "500",
  },
  form: {
    width: "100%",
  },
  inputGroup: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: COLORS.gray[200],
    borderRadius: RADIUS.lg,
    paddingHorizontal: SPACING.md,
    height: 54,
  },
  inputContainerFocused: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
  },
  inputIcon: {
    marginRight: SPACING.sm,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text,
    height: "100%",
  },
  eyeIcon: {
    padding: SPACING.xs,
  },
  registerButton: {
    backgroundColor: COLORS.primary,
    height: 56,
    borderRadius: RADIUS.lg,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
    marginTop: SPACING.md,
    marginBottom: SPACING.lg,
  },
  registerButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "700",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  loginText: {
    color: COLORS.textLight,
    fontSize: 15,
  },
  loginLinkText: {
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: "700",
  },
});
