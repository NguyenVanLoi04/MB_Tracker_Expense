import React from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CATEGORIES } from "../constants/categories";
import { COLORS, RADIUS, SPACING } from "../constants/theme";
import { useExpense } from "../context/ExpenseContext";
import { Transaction } from "../types";
import { formatCurrency, formatFullDateTime } from "../utils";
import { Icon } from "./Icon";

interface TransactionDetailModalProps {
  transaction: Transaction | null;
  visible: boolean;
  onClose: () => void;
  onEdit?: (transaction: Transaction) => void;
}

export const TransactionDetailModal = ({
  transaction,
  visible,
  onClose,
  onEdit,
}: TransactionDetailModalProps) => {
  const { deleteTransaction } = useExpense();

  if (!transaction) return null;

  const category =
    CATEGORIES.find((c) => c.id === transaction.categoryId) || CATEGORIES[7];
  const isExpense = transaction.type === "expense";

  const handleDelete = () => {
    Alert.alert(
      "Xác nhận xóa",
      "Bạn có thực sự muốn xóa giao dịch này không?",
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa",
          style: "destructive",
          onPress: async () => {
            await deleteTransaction(transaction.id);
            onClose();
          },
        },
      ],
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Chi tiết giao dịch</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Icon name="x" size={24} color={COLORS.text} />
            </TouchableOpacity>
          </View>

          <View style={styles.body}>
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: category.color + "15" },
              ]}
            >
              <Icon name={category.icon} size={42} color={category.color} />
            </View>

            <Text style={styles.categoryName}>{category.name}</Text>
            <Text
              style={[
                styles.amount,
                { color: isExpense ? COLORS.danger : COLORS.success },
              ]}
            >
              {isExpense ? "-" : "+"}
              {formatCurrency(transaction.amount)}
            </Text>

            <View style={styles.infoBox}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Thời gian</Text>
                <Text style={styles.infoValue}>
                  {formatFullDateTime(transaction.date)}
                </Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Loại giao dịch</Text>
                <Text
                  style={[
                    styles.infoValue,
                    { color: isExpense ? COLORS.danger : COLORS.success },
                  ]}
                >
                  {isExpense ? "Khoản chi" : "Khoản thu"}
                </Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Ghi chú</Text>
                <Text style={styles.infoValue}>
                  {transaction.note || "Không có ghi chú"}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => {
                if (transaction && onEdit) {
                  onEdit(transaction);
                }
              }}
            >
              <Icon name="pencil" size={18} color={COLORS.primary} />
              <Text style={styles.editButtonText}>Chỉnh sửa</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleDelete}
            >
              <Icon name="trash-2" size={18} color={COLORS.danger} />
              <Text style={styles.deleteButtonText}>Xóa</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING.lg,
  },
  content: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    width: "100%",
    padding: SPACING.lg,
    elevation: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.xl,
  },
  closeBtn: {
    padding: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.text,
  },
  body: {
    alignItems: "center",
  },
  iconContainer: {
    width: 84,
    height: 84,
    borderRadius: 42,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.md,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.textLight,
  },
  amount: {
    fontSize: 32,
    fontWeight: "900",
    marginVertical: SPACING.sm,
  },
  infoBox: {
    backgroundColor: COLORS.gray[50],
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    width: "100%",
    marginTop: SPACING.lg,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: SPACING.sm,
  },
  infoLabel: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
    textAlign: "right",
    flex: 1,
    marginLeft: SPACING.lg,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.gray[200],
  },
  footer: {
    flexDirection: "row",
    gap: SPACING.md,
    marginTop: SPACING.xxl,
  },
  editButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.primary,
    gap: 8,
  },
  editButtonText: {
    color: COLORS.primary,
    fontWeight: "bold",
  },
  deleteButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.danger,
    gap: 8,
  },
  deleteButtonText: {
    color: COLORS.danger,
    fontWeight: "bold",
  },
});
