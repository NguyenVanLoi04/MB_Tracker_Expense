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

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [focusedInput, setFocusedInput] = useState<"email" | "password" | null>(
    null,
  );

  const focusSharedValue = useSharedValue(0);

  useEffect(() => {
    focusSharedValue.value = withSpring(focusedInput ? 1 : 0);
  }, [focusedInput, focusSharedValue]);

  const logoAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: interpolate(focusSharedValue.value, [0, 1], [1, 0.9]) },
        {
          rotate: `${interpolate(focusSharedValue.value, [0, 1], [0, 10])}deg`,
        },
      ],
    };
  });

  const handleLogin = () => {
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
            <Animated.View style={[styles.logoContainer, logoAnimatedStyle]}>
              <Icon name="wallet" size={48} color={COLORS.primary} />
            </Animated.View>
            <Text style={styles.title}>Chào mừng trở lại</Text>
            <Text style={styles.subtitle}>Đăng nhập để quản lý chi tiêu</Text>
          </Animated.View>

          {/* Form Section */}
          <Animated.View
            entering={FadeInDown.delay(200).duration(800).springify()}
            style={styles.form}
          >
            {/* Email Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Tài khoản / Email</Text>
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

            <TouchableOpacity style={styles.forgotPasswordButton}>
              <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <Animated.View entering={FadeInDown.delay(400).springify()}>
              <TouchableOpacity
                style={styles.loginButton}
                activeOpacity={0.8}
                onPress={handleLogin}
              >
                <Text style={styles.loginButtonText}>Đăng nhập</Text>
              </TouchableOpacity>
            </Animated.View>

            {/* Register Link */}
            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>Bạn chưa có tài khoản? </Text>
              <TouchableOpacity onPress={() => router.push("/register")}>
                <Text style={styles.registerButtonText}>Đăng ký ngay</Text>
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
    marginBottom: SPACING.xxl,
  },
  logoContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.lg,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  title: {
    fontSize: 28,
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
    marginBottom: SPACING.lg,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: COLORS.gray[200],
    borderRadius: RADIUS.lg,
    paddingHorizontal: SPACING.md,
    height: 56,
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
  forgotPasswordButton: {
    alignSelf: "flex-end",
    marginBottom: SPACING.xl,
  },
  forgotPasswordText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "600",
  },
  loginButton: {
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
  },
  loginButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "700",
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: SPACING.xl,
  },
  registerText: {
    color: COLORS.textLight,
    fontSize: 15,
  },
  registerButtonText: {
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: "700",
  },
});
