import React from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import Animated, {
  FadeIn,
  FadeInDown,
  Layout,
  ZoomIn,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { AddTransactionModal } from "../../src/components/AddTransactionModal";
import { HomeHeader } from "../../src/components/home/HomeHeader";
import { Icon } from "../../src/components/Icon";
import { SpendingChart } from "../../src/components/SpendingChart";
import { SummaryCard } from "../../src/components/SummaryCard";
import { TransactionDetailModal } from "../../src/components/TransactionDetailModal";
import { TransactionItem } from "../../src/components/TransactionItem";
import { COLORS, RADIUS, SHADOWS, SPACING } from "../../src/constants/theme";
import { useDashboard } from "../../src/hooks/useDashboard";
import { Transaction } from "../../src/types";
import { formatCurrency } from "../../src/utils";

export default function DashboardScreen() {
  const {
    summary,
    recentTransactions,
    categoryStats,
    modalVisible,
    setModalVisible,
    detailVisible,
    setDetailVisible,
    selectedTransaction,
    setSelectedTransaction,
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



  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <HomeHeader />

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
  scrollContent: {
    paddingBottom: 100,
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
    zIndex: 100,
  },
  fab: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    ...SHADOWS.primary,
  },
});
