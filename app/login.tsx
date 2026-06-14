import { useLogin } from "@/hooks/auth/useLogin";
import { zodResolver } from "@hookform/resolvers/zod";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "../src/components/Icon";
import { RHFCheckbox, RHFInput } from "../src/components/RHF";
import { STORAGE_KEYS } from "../src/constants/storage";
import { COLORS, RADIUS, SHADOWS, SPACING } from "../src/constants/theme";
import {
  ILoginFormValues,
  loginDefaultValues,
  loginSchema,
} from "../src/schemas/login.schema";
import { RootState } from "../src/store";
import { setToken } from "../src/store/slices/authSlice";

export default function LoginScreen() {
  const router = useRouter();

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  React.useEffect(() => {
    if (isAuthenticated) {
      router.replace("/(tabs)");
    }
  }, [isAuthenticated, router]);

  const methods = useForm<ILoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: loginDefaultValues,
  });

  const { handleSubmit } = methods;

  const dispatch = useDispatch();
  const { mutate: login, isPending } = useLogin({
    onSuccess: (response: any, variables: ILoginFormValues) => {
      const token = response.data?.accessToken;
      if (token) {
        dispatch(setToken(token));
        if (variables.rememberMe) {
          AsyncStorage.setItem(STORAGE_KEYS.USER_TOKEN, token);
        } else {
          AsyncStorage.removeItem(STORAGE_KEYS.USER_TOKEN);
        }
      }

      Toast.show({
        type: "success",
        text1: "Đăng nhập thành công",
        text2: "Chào mừng bạn quay trở lại! 👋",
      });
      router.replace("/(tabs)");
    },
    onError: (error: any) => {
      console.log("error::::::::::", error);
      Toast.show({
        type: "error",
        text1: "Đăng nhập thất bại",
        text2:
          error?.response?.data?.message || "Vui lòng kiểm tra lại tài khoản!",
      });
    },
  });

  const onLogin = (data: ILoginFormValues) => {
    console.log("Login data:", data);
    login(data);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          {/* Header Section */}
          <Animated.View
            entering={FadeInDown.duration(800).springify()}
            style={styles.header}
          >
            <View style={styles.logoContainer}>
              <Icon name="wallet" size={48} color={COLORS.primary} />
            </View>
            <Text style={styles.title}>Chào mừng trở lại</Text>
            <Text style={styles.subtitle}>Đăng nhập để quản lý chi tiêu</Text>
          </Animated.View>

          {/* Form Section */}
          <Animated.View
            entering={FadeInDown.delay(200).duration(800).springify()}
            style={styles.form}
          >
            <FormProvider {...methods}>
              {/* Email Input */}
              <RHFInput
                name="userName"
                label="Tài khoản"
                placeholder="Nhập tài khoản của bạn"
                icon="mail"
                keyboardType="email-address"
                autoCapitalize="none"
              />

              {/* Password Input */}
              <RHFInput
                name="passWord"
                label="Mật khẩu"
                placeholder="Nhập mật khẩu"
                icon="lock"
                isPassword
              />

              <RHFCheckbox name="rememberMe" label="Ghi nhớ đăng nhập" />
            </FormProvider>

            <TouchableOpacity style={styles.forgotPasswordButton}>
              <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <Animated.View entering={FadeInDown.delay(400).springify()}>
              <TouchableOpacity
                style={[
                  styles.loginButton,
                  isPending && styles.loginButtonDisabled,
                ]}
                activeOpacity={0.8}
                onPress={handleSubmit(onLogin)}
                disabled={isPending}
              >
                {isPending ? (
                  <ActivityIndicator color={COLORS.white} />
                ) : (
                  <Text style={styles.loginButtonText}>Đăng nhập</Text>
                )}
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
    ...SHADOWS.primary,
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
    ...SHADOWS.primary,
  },
  loginButtonDisabled: {
    backgroundColor: COLORS.gray[400],
    shadowOpacity: 0,
    elevation: 0,
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
