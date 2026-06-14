import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';
import { COLORS, RADIUS, SHADOWS, SPACING } from '../constants/theme';
import { Icon } from './Icon';

interface ImageSourceModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (source: "camera" | "gallery") => void;
}

export const ImageSourceModal = ({ visible, onClose, onSelect }: ImageSourceModalProps) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="none" // We use reanimated for animations
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View entering={FadeIn.duration(200)} style={styles.overlay}>
          <TouchableWithoutFeedback>
            <Animated.View
              entering={SlideInDown.duration(300).springify()}
              style={styles.container}
            >
              <View style={styles.header}>
                <Text style={styles.title}>Chọn nguồn ảnh</Text>
                <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                  <Icon name="x" size={24} color={COLORS.textLight} />
                </TouchableOpacity>
              </View>

              <Text style={styles.subtitle}>
                Hãy chụp ảnh mới hoặc chọn một ảnh hóa đơn từ thư viện của bạn.
              </Text>

              <View style={styles.optionsContainer}>
                <TouchableOpacity
                  style={[styles.optionCard, styles.cameraCard]}
                  onPress={() => {
                    onClose();
                    // Slight delay to allow modal to close smoothly before opening camera
                    setTimeout(() => onSelect("camera"), 100);
                  }}
                  activeOpacity={0.7}
                >
                  <View style={[styles.iconContainer, { backgroundColor: COLORS.primary + "20" }]}>
                    <Icon name="camera" size={32} color={COLORS.primary} />
                  </View>
                  <Text style={styles.optionTitle}>Chụp ảnh</Text>
                  <Text style={styles.optionDescription}>Sử dụng máy ảnh</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.optionCard, styles.galleryCard]}
                  onPress={() => {
                    onClose();
                    setTimeout(() => onSelect("gallery"), 100);
                  }}
                  activeOpacity={0.7}
                >
                  <View style={[styles.iconContainer, { backgroundColor: COLORS.info + "20" }]}>
                    <Icon name="image" size={32} color={COLORS.info} />
                  </View>
                  <Text style={styles.optionTitle}>Thư viện</Text>
                  <Text style={styles.optionDescription}>Chọn ảnh có sẵn</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  container: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
    padding: SPACING.xl,
    paddingBottom: SPACING.xxl + 20, // Extra padding for safe area
    ...SHADOWS.lg,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.sm,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.text,
  },
  closeBtn: {
    padding: SPACING.xs,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: SPACING.xl,
    lineHeight: 20,
  },
  optionsContainer: {
    flexDirection: "row",
    gap: SPACING.md,
  },
  optionCard: {
    flex: 1,
    backgroundColor: COLORS.gray[50],
    borderRadius: RADIUS.lg,
    paddingVertical: SPACING.xl,
    paddingHorizontal: SPACING.lg,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.gray[200],
    ...SHADOWS.sm,
  },
  cameraCard: {
    borderColor: COLORS.primary + "30",
    backgroundColor: COLORS.primary + "05",
  },
  galleryCard: {
    borderColor: COLORS.info + "30",
    backgroundColor: COLORS.info + "05",
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.md,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 12,
    color: COLORS.textLight,
    textAlign: "center",
  },
});
