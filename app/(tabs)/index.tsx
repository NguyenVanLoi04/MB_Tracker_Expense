import React from "react";
import {
  Alert,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  FadeIn,
  FadeInDown,
  Layout,
  ZoomIn,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { AddTransactionModal } from "../../src/components/AddTransactionModal";
import { Icon } from "../../src/components/Icon";
import { SpendingChart } from "../../src/components/SpendingChart";
import { SummaryCard } from "../../src/components/SummaryCard";
import { TransactionDetailModal } from "../../src/components/TransactionDetailModal";
import { TransactionItem } from "../../src/components/TransactionItem";
import { COLORS, RADIUS, SPACING } from "../../src/constants/theme";
import { useDashboard } from "../../src/hooks/useDashboard";
import { Transaction } from "../../src/types";
import { formatCurrency } from "../../src/utils";

export default function DashboardScreen() {
  const {
    summary,
    budget,
    budgetInput,
    setBudgetInput,
    isEditingBudget,
    setIsEditingBudget,
    budgetProgress,
    recentTransactions,
    categoryStats,
    modalVisible,
    setModalVisible,
    detailVisible,
    setDetailVisible,
    selectedTransaction,
    setSelectedTransaction,
    setMonthlyBudget,
    weeklySpending,
  } = useDashboard();

  const handleTransactionPress = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setDetailVisible(true);
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setDetailVisible(false);
    setSelectedTransaction(transaction);
    setModalVisible(true);
  };

  const handleAddNewPress = () => {
    setSelectedTransaction(null);
    setModalVisible(true);
  };

  const handleSaveBudget = async () => {
    const amount = Number(budgetInput);
    if (isNaN(amount)) {
      Alert.alert("Lỗi", "Vui lòng nhập số tiền hợp lệ");
      return;
    }
    await setMonthlyBudget(amount);
    setIsEditingBudget(false);
  };

  const isBudgetWarning = budgetProgress > 90;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Animated.View
        entering={FadeInDown.duration(800).springify()}
        style={styles.header}
      >
        <View>
          <Text style={styles.greeting}>Xin chào,</Text>
          <Text style={styles.userName}>Người dùng</Text>
        </View>
        <TouchableOpacity style={styles.notificationBtn}>
          <Icon name="bell" size={24} color={COLORS.text} />
        </TouchableOpacity>
      </Animated.View>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        entering={FadeIn.delay(200)}
      >
        <Animated.View
          entering={ZoomIn.delay(300).springify()}
          layout={Layout.springify()}
        >
          <SummaryCard
            balance={summary.balance}
            income={summary.income}
            expense={summary.expense}
          />
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(400)}
          layout={Layout.springify()}
        >
          <SpendingChart data={weeklySpending} title="Chi tiêu tuần này" />
        </Animated.View>

        {/* Budget Section */}
        <Animated.View
          entering={FadeInDown.delay(500)}
          layout={Layout.springify()}
          style={styles.budgetCard}
        >
          <View style={styles.budgetHeader}>
            <View style={styles.budgetTitleContainer}>
              <Icon name="target" size={20} color={COLORS.primary} />
              <Text style={styles.budgetTitle}>Ngân sách tháng này</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setIsEditingBudget(!isEditingBudget);
                setBudgetInput(budget.toString());
              }}
            >
              <Text style={styles.editBudgetBtn}>
                {isEditingBudget ? "Hủy" : "Sửa"}
              </Text>
            </TouchableOpacity>
          </View>

          {isEditingBudget ? (
            <Animated.View
              entering={ZoomIn.duration(300)}
              style={styles.budgetEditRow}
            >
              <TextInput
                style={styles.budgetInput}
                value={budgetInput}
                onChangeText={setBudgetInput}
                keyboardType="numeric"
                autoFocus
              />
              <TouchableOpacity
                style={styles.saveBudgetBtn}
                onPress={handleSaveBudget}
              >
                <Text style={styles.saveBudgetBtnText}>Lưu</Text>
              </TouchableOpacity>
            </Animated.View>
          ) : (
            <View>
              <View style={styles.budgetInfo}>
                <Text style={styles.budgetValue}>
                  {formatCurrency(summary.expense)} / {formatCurrency(budget)}
                </Text>
                <Animated.Text
                  entering={FadeIn}
                  style={[
                    styles.budgetPercent,
                    isBudgetWarning && { color: COLORS.danger },
                  ]}
                >
                  {budgetProgress.toFixed(0)}%
                </Animated.Text>
              </View>
              <View style={styles.progressBarBg}>
                <Animated.View
                  entering={FadeIn.duration(1000)}
                  layout={Layout.duration(500)}
                  style={[
                    styles.progressBarFill,
                    {
                      width: `${budgetProgress}%`,
                      backgroundColor: isBudgetWarning
                        ? COLORS.danger
                        : COLORS.primary,
                    },
                  ]}
                />
              </View>
              <Text style={styles.budgetLeft}>
                {budget - summary.expense > 0
                  ? `Còn lại ${formatCurrency(budget - summary.expense)}`
                  : `Vượt mức ${formatCurrency(summary.expense - budget)}`}
              </Text>
            </View>
          )}
        </Animated.View>

        <Animated.View entering={FadeIn.delay(600)} layout={Layout.springify()}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Giao dịch gần đây</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Tất cả</Text>
            </TouchableOpacity>
          </View>

          {recentTransactions.length === 0 ? (
            <View style={styles.emptyContainer}>
              <View style={styles.emptyIconContainer}>
                <Icon name="receipt" size={48} color={COLORS.gray[300]} />
              </View>
              <Text style={styles.emptyText}>Chưa có giao dịch nào</Text>
              <Text style={styles.emptySubtext}>
                Nhấn để bắt đầu theo dõi chi tiêu của bạn
              </Text>
            </View>
          ) : (
            <View style={styles.transactionList}>
              {recentTransactions.map((item, index) => (
                <Animated.View
                  key={item.id}
                  entering={FadeInDown.delay(700 + index * 100)}
                  layout={Layout.springify()}
                >
                  <TransactionItem
                    transaction={item}
                    onPress={() => handleTransactionPress(item)}
                  />
                </Animated.View>
              ))}
            </View>
          )}
        </Animated.View>

        {categoryStats.length > 0 && (
          <Animated.View
            entering={FadeInDown.delay(900)}
            layout={Layout.springify()}
          >
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Phân bổ chi tiêu</Text>
            </View>
            <View style={styles.categoryStats}>
              {categoryStats.map((item, index) => (
                <Animated.View
                  key={item.id}
                  entering={FadeInDown.delay(1000 + index * 50)}
                  layout={Layout.springify()}
                  style={styles.statItem}
                >
                  <View
                    style={[
                      styles.statIcon,
                      { backgroundColor: item.color + "15" },
                    ]}
                  >
                    <Icon name={item.icon} size={16} color={item.color} />
                  </View>
                  <View style={styles.statInfo}>
                    <View style={styles.statHeader}>
                      <Text style={styles.statName}>{item.name}</Text>
                      <Text style={styles.statValue}>
                        {formatCurrency(item.total)}
                      </Text>
                    </View>
                    <View style={styles.progressBarBgSmall}>
                      <Animated.View
                        entering={FadeIn.duration(1000).delay(
                          1100 + index * 50,
                        )}
                        style={[
                          styles.progressBarFill,
                          {
                            width: `${item.percentage}%`,
                            backgroundColor: item.color,
                          },
                        ]}
                      />
                    </View>
                  </View>
                </Animated.View>
              ))}
            </View>
          </Animated.View>
        )}
      </Animated.ScrollView>

      {/* Floating Action Button */}
      <Animated.View
        entering={ZoomIn.delay(800).springify()}
        style={styles.fabContainer}
      >
        <TouchableOpacity style={styles.fab} onPress={handleAddNewPress}>
          <Icon name="plus" size={30} color={COLORS.white} />
        </TouchableOpacity>
      </Animated.View>

      <AddTransactionModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setSelectedTransaction(null);
        }}
        initialData={selectedTransaction}
      />

      <TransactionDetailModal
        transaction={selectedTransaction}
        visible={detailVisible}
        onClose={() => {
          setDetailVisible(false);
          setSelectedTransaction(null);
        }}
        onEdit={handleEditTransaction}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
    paddingTop: Platform.OS === "android" ? 40 : 10,
    paddingBottom: SPACING.md,
  },
  greeting: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.text,
  },
  notificationBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  budgetCard: {
    backgroundColor: COLORS.white,
    marginHorizontal: SPACING.lg,
    padding: SPACING.lg,
    borderRadius: RADIUS.xl,
    marginTop: SPACING.md,
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  budgetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.md,
  },
  budgetTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  budgetTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.text,
  },
  editBudgetBtn: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: "600",
  },
  budgetInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 8,
  },
  budgetValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.text,
  },
  budgetPercent: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textLight,
  },
  budgetLeft: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 8,
  },
  budgetEditRow: {
    flexDirection: "row",
    gap: 8,
  },
  budgetInput: {
    flex: 1,
    backgroundColor: COLORS.gray[50],
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    fontSize: 16,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.gray[200],
  },
  saveBudgetBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.lg,
    justifyContent: "center",
  },
  saveBudgetBtnText: {
    color: COLORS.white,
    fontWeight: "bold",
  },
  progressBarBg: {
    height: 10,
    backgroundColor: COLORS.gray[100],
    borderRadius: 5,
    overflow: "hidden",
  },
  progressBarBgSmall: {
    height: 6,
    backgroundColor: COLORS.gray[100],
    borderRadius: 3,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 5,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
    marginTop: SPACING.xl,
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.text,
  },
  seeAll: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: "600",
  },
  transactionList: {
    paddingHorizontal: SPACING.lg,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: SPACING.xxl,
    paddingHorizontal: SPACING.xl,
  },
  emptyIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.gray[100],
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.md,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  emptySubtext: {
    fontSize: 14,
    color: COLORS.textLight,
    textAlign: "center",
  },
  categoryStats: {
    paddingHorizontal: SPACING.lg,
    backgroundColor: COLORS.white,
    marginHorizontal: SPACING.lg,
    borderRadius: RADIUS.lg,
    paddingVertical: SPACING.md,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.md,
  },
  statIcon: {
    width: 32,
    height: 32,
    borderRadius: RADIUS.sm,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.md,
  },
  statInfo: {
    flex: 1,
  },
  statHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  statName: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.text,
  },
  statValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.text,
  },
  fabContainer: {
    position: "absolute",
    bottom: 24,
    right: 24,
  },
  fab: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});
