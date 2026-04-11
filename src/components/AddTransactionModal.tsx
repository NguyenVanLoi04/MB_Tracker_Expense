import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { CATEGORIES } from "../constants/categories";
import { COLORS, RADIUS, SPACING } from "../constants/theme";
import { useExpense } from "../context/ExpenseContext";
import { Icon } from "./Icon";

import { Transaction } from "@/types";

interface AddTransactionModalProps {
  visible: boolean;
  onClose: () => void;
  initialData?: Transaction | null;
}

export const AddTransactionModal = ({
  visible,
  onClose,
  initialData,
}: AddTransactionModalProps) => {
  const { addTransaction, updateTransaction } = useExpense();
  const [type, setType] = useState<"expense" | "income">("expense");
  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState(CATEGORIES[0].id);
  const [note, setNote] = useState("");

  React.useEffect(() => {
    if (initialData) {
      setType(initialData.type);
      setAmount(initialData.amount.toString());
      setCategoryId(initialData.categoryId);
      setNote(initialData.note);
    } else {
      setType("expense");
      setAmount("");
      setCategoryId(CATEGORIES.find((c) => c.type === "expense")?.id || "1");
      setNote("");
    }
  }, [initialData, visible]);

  const filteredCategories = CATEGORIES.filter((c) => c.type === type);

  const handleSubmit = async () => {
    if (!amount || isNaN(Number(amount))) return;

    if (initialData) {
      await updateTransaction({
        ...initialData,
        amount: Number(amount),
        categoryId,
        note,
        type,
      });
    } else {
      await addTransaction({
        amount: Number(amount),
        categoryId,
        note,
        date: new Date().toISOString(),
        type,
      });
    }

    setAmount("");
    setNote("");
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.modalOverlay}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Icon name="x" size={24} color={COLORS.text} />
            </TouchableOpacity>
            <Text style={styles.title}>
              {initialData ? "Sửa giao dịch" : "Thêm giao dịch"}
            </Text>
            <View style={{ width: 44 }} />
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <View style={styles.typeSelector}>
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  type === "expense" && styles.typeButtonActiveExpense,
                ]}
                onPress={() => {
                  setType("expense");
                  setCategoryId(
                    CATEGORIES.find((c) => c.type === "expense")?.id || "1",
                  );
                }}
              >
                <Text
                  style={[
                    styles.typeText,
                    type === "expense" && styles.typeTextActive,
                  ]}
                >
                  Khoản chi
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  type === "income" && styles.typeButtonActiveIncome,
                ]}
                onPress={() => {
                  setType("income");
                  setCategoryId(
                    CATEGORIES.find((c) => c.type === "income")?.id || "100",
                  );
                }}
              >
                <Text
                  style={[
                    styles.typeText,
                    type === "income" && styles.typeTextActive,
                  ]}
                >
                  Khoản thu
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Số tiền</Text>
              <View style={styles.amountInputContainer}>
                <Text style={styles.currencySymbol}>đ</Text>
                <TextInput
                  style={styles.amountInput}
                  placeholder="0"
                  keyboardType="numeric"
                  value={amount}
                  onChangeText={setAmount}
                  autoFocus
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Danh mục</Text>
              <View style={styles.categoryGrid}>
                {filteredCategories.map((category) => (
                  <TouchableOpacity
                    key={category.id}
                    style={[
                      styles.categoryItem,
                      categoryId === category.id && styles.categoryItemActive,
                      categoryId === category.id && {
                        borderColor: category.color,
                      },
                    ]}
                    onPress={() => setCategoryId(category.id)}
                  >
                    <Icon
                      name={category.icon}
                      size={20}
                      color={
                        categoryId === category.id
                          ? category.color
                          : COLORS.textLight
                      }
                    />
                    <Text
                      style={[
                        styles.categoryLabel,
                        categoryId === category.id && {
                          color: category.color,
                          fontWeight: "700",
                        },
                      ]}
                    >
                      {category.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Ghi chú</Text>
              <TextInput
                style={styles.noteInput}
                placeholder="Nhập ghi chú..."
                value={note}
                onChangeText={setNote}
                multiline
              />
            </View>

            <TouchableOpacity
              style={[
                styles.submitButton,
                {
                  backgroundColor:
                    type === "expense" ? COLORS.danger : COLORS.success,
                },
              ]}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>Lưu giao dịch</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  content: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
    maxHeight: "90%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[100],
  },
  closeBtn: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.text,
  },
  scrollContent: {
    padding: SPACING.lg,
    paddingBottom: 40,
  },
  typeSelector: {
    flexDirection: "row",
    backgroundColor: COLORS.gray[100],
    borderRadius: RADIUS.md,
    padding: 4,
    marginBottom: SPACING.xl,
  },
  typeButton: {
    flex: 1,
    paddingVertical: SPACING.md,
    alignItems: "center",
    borderRadius: RADIUS.md - 4,
  },
  typeButtonActiveExpense: {
    backgroundColor: COLORS.danger,
  },
  typeButtonActiveIncome: {
    backgroundColor: COLORS.success,
  },
  typeText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textLight,
  },
  typeTextActive: {
    color: COLORS.white,
  },
  inputGroup: {
    marginBottom: SPACING.xl,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textLight,
    marginBottom: SPACING.sm,
  },
  amountInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
    paddingBottom: SPACING.xs,
  },
  currencySymbol: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.text,
    marginRight: SPACING.sm,
  },
  amountInput: {
    fontSize: 32,
    fontWeight: "bold",
    color: COLORS.text,
    flex: 1,
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.sm,
  },
  categoryItem: {
    width: "23%",
    aspectRatio: 1,
    backgroundColor: COLORS.gray[50],
    borderRadius: RADIUS.md,
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING.xs,
    borderWidth: 1,
    borderColor: "transparent",
  },
  categoryItemActive: {
    backgroundColor: "rgba(0,0,0,0.03)",
  },
  categoryLabel: {
    fontSize: 10,
    marginTop: 4,
    color: COLORS.textLight,
    textAlign: "center",
  },
  noteInput: {
    backgroundColor: COLORS.gray[50],
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    fontSize: 16,
    minHeight: 80,
    textAlignVertical: "top",
    color: COLORS.text,
  },
  submitButton: {
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
    alignItems: "center",
    marginTop: SPACING.md,
    elevation: 2,
  },
  submitButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "bold",
  },
});
