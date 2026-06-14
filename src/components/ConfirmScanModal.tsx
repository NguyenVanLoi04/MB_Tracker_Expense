import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, Image, ScrollView } from 'react-native';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';
import { COLORS, RADIUS, SHADOWS, SPACING } from '../constants/theme';
import { Icon } from './Icon';
import { ETransactionType } from '@/types';
import { ScanResult } from '../services/visionService';

interface ConfirmScanModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  data: ScanResult | null;
  imageUri: string;
  categories: any[];
}

export const ConfirmScanModal = ({ visible, onClose, onConfirm, data, imageUri, categories }: ConfirmScanModalProps) => {
  if (!data) return null;

  const categoryName = categories.find((c: any) => c.id === data.categoryId)?.name || "Không xác định";
  const typeName = data.type === ETransactionType.EXPENSE ? "Khoản chi" : "Khoản thu";

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
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
                <Text style={styles.title}>Xác nhận dữ liệu</Text>
                <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                  <Icon name="x" size={24} color={COLORS.textLight} />
                </TouchableOpacity>
              </View>

              <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {imageUri ? (
                  <View style={styles.imageContainer}>
                    <Image source={{ uri: imageUri }} style={styles.receiptImage} resizeMode="cover" />
                    <View style={styles.imageBadge}>
                      <Icon name="check-circle" size={16} color={COLORS.white} />
                      <Text style={styles.imageBadgeText}>Đã phân tích</Text>
                    </View>
                  </View>
                ) : null}

                <Text style={styles.sectionTitle}>Thông tin trích xuất</Text>

                <View style={styles.dataCard}>
                  <View style={styles.dataRow}>
                    <View style={styles.dataLabelContainer}>
                      <Icon name="dollar-sign" size={18} color={COLORS.primary} />
                      <Text style={styles.dataLabel}>Số tiền</Text>
                    </View>
                    <Text style={styles.dataValueAmount}>{Number(data.amount).toLocaleString("vi-VN")} đ</Text>
                  </View>
                  <View style={styles.divider} />

                  <View style={styles.dataRow}>
                    <View style={styles.dataLabelContainer}>
                      <Icon name="tag" size={18} color={COLORS.info} />
                      <Text style={styles.dataLabel}>Danh mục</Text>
                    </View>
                    <Text style={styles.dataValue}>{categoryName}</Text>
                  </View>
                  <View style={styles.divider} />

                  <View style={styles.dataRow}>
                    <View style={styles.dataLabelContainer}>
                      <Icon name="layers" size={18} color={COLORS.warning} />
                      <Text style={styles.dataLabel}>Phân loại</Text>
                    </View>
                    <Text style={[
                      styles.dataValue, 
                      { color: data.type === ETransactionType.EXPENSE ? COLORS.danger : COLORS.success }
                    ]}>
                      {typeName}
                    </Text>
                  </View>
                  <View style={styles.divider} />

                  <View style={styles.dataRowColumn}>
                    <View style={styles.dataLabelContainer}>
                      <Icon name="file-text" size={18} color={COLORS.textLight} />
                      <Text style={styles.dataLabel}>Ghi chú</Text>
                    </View>
                    <View style={styles.noteBox}>
                      <Text style={styles.dataNote}>{data.note || "Không có ghi chú"}</Text>
                    </View>
                  </View>
                </View>
              </ScrollView>

              <View style={styles.footer}>
                <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                  <Text style={styles.cancelButtonText}>Hủy bỏ</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
                  <Text style={styles.confirmButtonText}>Điền vào Form</Text>
                  <Icon name="arrow-right" size={18} color={COLORS.white} />
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
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "flex-end",
  },
  container: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
    maxHeight: "85%",
    ...SHADOWS.lg,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: SPACING.lg,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[100],
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.text,
  },
  closeBtn: {
    padding: SPACING.xs,
  },
  scrollContent: {
    padding: SPACING.lg,
  },
  imageContainer: {
    width: "100%",
    height: 160,
    borderRadius: RADIUS.lg,
    overflow: "hidden",
    marginBottom: SPACING.lg,
    ...SHADOWS.sm,
    backgroundColor: COLORS.gray[200],
  },
  receiptImage: {
    width: "100%",
    height: "100%",
  },
  imageBadge: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: COLORS.success,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
    gap: 4,
    ...SHADOWS.sm,
  },
  imageBadgeText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  dataCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    ...SHADOWS.sm,
  },
  dataRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: SPACING.sm,
  },
  dataRowColumn: {
    paddingVertical: SPACING.sm,
  },
  dataLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  dataLabel: {
    fontSize: 14,
    color: COLORS.textLight,
    fontWeight: "500",
  },
  dataValueAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.text,
  },
  dataValue: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.text,
  },
  noteBox: {
    marginTop: 8,
    backgroundColor: COLORS.gray[50],
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.gray[100],
  },
  dataNote: {
    fontSize: 14,
    color: COLORS.text,
    lineHeight: 20,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.gray[100],
    marginVertical: 4,
  },
  footer: {
    flexDirection: "row",
    padding: SPACING.lg,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray[100],
    gap: SPACING.md,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: SPACING.md,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.gray[100],
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
  },
  confirmButton: {
    flex: 2,
    flexDirection: "row",
    paddingVertical: SPACING.md,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.primary,
    gap: 8,
    ...SHADOWS.primary,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.white,
  },
});
