import LottieView from "lottie-react-native";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  ZoomIn,
} from "react-native-reanimated";
import { COLORS } from "../constants/theme";

const { width } = Dimensions.get("window");

export const AppSplashScreen = () => {
  return (
    <View style={styles.container}>
      <Animated.View
        entering={ZoomIn.duration(1000).springify()}
        style={styles.logoWrapper}
      >
        <LottieView
          source={{
            uri: "https://lottie.host/791552a8-6f17-4927-995a-c454e9bc5a2c/pP2pWnE6z3.json",
          }}
          autoPlay
          loop
          style={styles.lottie}
        />
      </Animated.View>

      <View style={styles.textContainer}>
        <Animated.Text
          entering={FadeInDown.delay(500).duration(800)}
          style={[styles.title, { letterSpacing: 6 }]}
        >
          EXPENSE
        </Animated.Text>

        <Animated.Text
          entering={FadeInUp.delay(700).duration(800)}
          style={[styles.subtitle, { letterSpacing: 10 }]}
        >
          TRACKER
        </Animated.Text>
      </View>

      <Animated.View entering={FadeIn.delay(1200)} style={styles.footer}>
        <Animated.Text style={styles.footerText}>
          Quản lý chi tiêu thông minh
        </Animated.Text>
      </Animated.View>

      {/* Modern gradient-like background glow */}
      <View style={styles.glow} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  logoWrapper: {
    width: 250,
    height: 250,
    justifyContent: "center",
    alignItems: "center",
  },
  lottie: {
    width: "100%",
    height: "100%",
  },
  textContainer: {
    alignItems: "center",
    marginTop: -20,
  },
  title: {
    fontSize: 40,
    fontWeight: "900",
    color: COLORS.white,
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "rgba(255,255,255,0.8)",
    marginTop: 8,
  },
  footer: {
    position: "absolute",
    bottom: 60,
  },
  footerText: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 14,
    fontWeight: "500",
  },
  glow: {
    position: "absolute",
    width: width * 1.5,
    height: width * 1.5,
    borderRadius: width * 0.75,
    backgroundColor: "rgba(255,255,255,0.05)",
    top: -width * 0.5,
    zIndex: -1,
  },
});
