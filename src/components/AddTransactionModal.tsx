import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
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
import { COLORS, RADIUS, SPACING } from "../constants/theme";
import { useExpense } from "../context/ExpenseContext";
import { Icon } from "./Icon";
import { CategoryItem } from "./home/CategoryItem";

import { useGetDefaultCategory } from "@/hooks/category/useGetDefaultCategory";
import { useCreateTransaction } from "@/hooks/transaction/useCreateTransaction";
import { ETransactionType, Transaction } from "@/types";
import { ITransactionFormData } from "../interfaces/transaction/interface";
import { transactionSchema } from "../schemas/transaction/schema";

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
  const { updateTransaction } = useExpense();
  const createTransactionMutation = useCreateTransaction();

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ITransactionFormData>({
    resolver: zodResolver(transactionSchema) as any,
    defaultValues: {
      type: ETransactionType.EXPENSE,
      amount: "",
      categoryId: 0,
      note: "",
    },
  });

  const { data: categoryResponse } = useGetDefaultCategory();
  const categoryIncome = categoryResponse?.data?.filter(
    (c) => c.type === ETransactionType.INCOME,
  );
  const categoryExpense = categoryResponse?.data?.filter(
    (c) => c.type === ETransactionType.EXPENSE,
  );

  const type = watch("type");
  const categoryId = watch("categoryId");

  React.useEffect(() => {
    if (visible) {
      if (initialData) {
        reset({
          type: initialData.type,
          amount: initialData.amount.toString(),
          categoryId: initialData.categoryId,
          note: initialData.note,
        });
      } else {
        reset({
          type: ETransactionType.EXPENSE,
          amount: "",
          categoryId: 0,
          note: "",
        });
      }
    }
  }, [initialData, visible, reset]);

  const onSubmit: SubmitHandler<ITransactionFormData> = async (data) => {
    const amountNum = Number(data.amount);
    if (isNaN(amountNum)) {
      return;
    }
    if (initialData) {
      await updateTransaction({
        ...initialData,
        amount: amountNum,
        categoryId: data.categoryId,
        note: data.note,
        type: data.type,
      });
    } else {
      await createTransactionMutation.mutateAsync({
        amount: amountNum,
        categoryId: data.categoryId,
        note: data.note,
        date: new Date().toISOString(),
        type: data.type,
      });
    }

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
                  type === ETransactionType.EXPENSE &&
                    styles.typeButtonActiveExpense,
                ]}
                onPress={() => {
                  setValue("type", ETransactionType.EXPENSE);
                  setValue("categoryId", 0);
                }}
              >
                <Text
                  style={[
                    styles.typeText,
                    type === ETransactionType.EXPENSE && styles.typeTextActive,
                  ]}
                >
                  Khoản chi
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  type === ETransactionType.INCOME &&
                    styles.typeButtonActiveIncome,
                ]}
                onPress={() => {
                  setValue("type", ETransactionType.INCOME);
                  setValue("categoryId", 0);
                }}
              >
                <Text
                  style={[
                    styles.typeText,
                    type === ETransactionType.INCOME && styles.typeTextActive,
                  ]}
                >
                  Khoản thu
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Số tiền</Text>
              <Controller
                control={control}
                name="amount"
                render={({ field: { onChange, value } }) => (
                  <View style={styles.amountInputContainer}>
                    <Text style={styles.currencySymbol}>đ</Text>
                    <TextInput
                      style={styles.amountInput}
                      placeholder="0"
                      keyboardType="numeric"
                      value={value}
                      onChangeText={onChange}
                      autoFocus
                    />
                  </View>
                )}
              />
              {errors.amount && (
                <Text style={styles.errorText}>{errors.amount.message}</Text>
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Danh mục</Text>
              <View style={styles.categoryGrid}>
                {type === ETransactionType.INCOME
                  ? categoryIncome?.map((category) => (
                      <CategoryItem
                        key={category.id}
                        category={category}
                        isActive={categoryId === category.id}
                        onPress={(id) => setValue("categoryId", id)}
                      />
                    ))
                  : categoryExpense?.map((category) => (
                      <CategoryItem
                        key={category.id}
                        category={category}
                        isActive={categoryId === category.id}
                        onPress={(id) => setValue("categoryId", id)}
                      />
                    ))}
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Ghi chú</Text>
              <Controller
                control={control}
                name="note"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={styles.noteInput}
                    placeholder="Nhập ghi chú..."
                    value={value}
                    onChangeText={onChange}
                    multiline
                  />
                )}
              />
            </View>

            <TouchableOpacity
              style={[
                styles.submitButton,
                {
                  backgroundColor:
                    type === ETransactionType.EXPENSE
                      ? COLORS.danger
                      : COLORS.success,
                },
              ]}
              onPress={handleSubmit(onSubmit)}
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
  errorText: {
    color: COLORS.danger,
    fontSize: 12,
    marginTop: 4,
  },
});
