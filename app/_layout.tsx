import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as NavigationBar from "expo-navigation-bar";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Platform } from "react-native";
import "react-native-reanimated";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { Provider, useDispatch, useSelector } from "react-redux";
import { AppSplashScreen } from "../src/components/AppSplashScreen";
import { STORAGE_KEYS } from "../src/constants/storage";
import { ExpenseProvider } from "../src/context/ExpenseContext";
import { useColorScheme } from "../src/hooks/use-color-scheme";
import { RootState, store } from "../src/store";
import {
  completeInitialization,
  setToken,
} from "../src/store/slices/authSlice";

// Create a client
const queryClient = new QueryClient();

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [appReady, setAppReady] = useState(false);

  const [loaded] = useFonts({});

  useEffect(() => {
    if (loaded) {
      const prepareApp = async () => {
        // Tắt 3 nút điều hướng ở dưới cùng trên màn hình Android
        if (Platform.OS === "android") {
          await NavigationBar.setVisibilityAsync("hidden");
          await NavigationBar.setBehaviorAsync("overlay-swipe");
        }

        // Wait at least 2 seconds for a premium feel
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setAppReady(true);
        await SplashScreen.hideAsync();
      };

      prepareApp();
    }
  }, [loaded]);

  if (!loaded || !appReady) {
    return <AppSplashScreen />;
  }

  return (
    <Provider store={store}>
      <InitialAuthLoader>
        <QueryClientProvider client={queryClient}>
          <SafeAreaProvider>
            <ExpenseProvider>
              <ThemeProvider
                value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
              >
                <Stack initialRouteName="login">
                  <Stack.Screen name="login" options={{ headerShown: false }} />
                  <Stack.Screen
                    name="register"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="(tabs)"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen name="+not-found" />
                </Stack>
                <StatusBar style="light" />
                <Toast autoHide={true} visibilityTime={2500} topOffset={50} />
              </ThemeProvider>
            </ExpenseProvider>
          </SafeAreaProvider>
        </QueryClientProvider>
      </InitialAuthLoader>
    </Provider>
  );
}

function InitialAuthLoader({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const { isInitialized } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await AsyncStorage.getItem(STORAGE_KEYS.USER_TOKEN);
        if (token) {
          dispatch(setToken(token));
        } else {
          dispatch(completeInitialization());
        }
      } catch (e) {
        console.error("Failed to load token", e);
        dispatch(completeInitialization());
      }
    };
    loadToken();
  }, [dispatch]);

  if (!isInitialized) {
    return <AppSplashScreen />;
  }

  return <>{children}</>;
}
