import React, { useMemo, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInLeft,
  Layout,
  ZoomIn,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "../../src/components/Icon";
import { TransactionDetailModal } from "../../src/components/TransactionDetailModal";
import { TransactionItem } from "../../src/components/TransactionItem";
import { COLORS, RADIUS, SPACING } from "../../src/constants/theme";
import { useExpense } from "../../src/context/ExpenseContext";
import { Transaction } from "../../src/types";

export default function HistoryScreen() {
  const { transactions } = useExpense();
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<"all" | "expense" | "income">(
    "all",
  );
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [detailVisible, setDetailVisible] = useState(false);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      const matchesSearch = t.note.toLowerCase().includes(search.toLowerCase());
      const matchesType = filterType === "all" || t.type === filterType;
      return matchesSearch && matchesType;
    });
  }, [transactions, search, filterType]);

  const handleTransactionPress = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setDetailVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View entering={FadeInDown.duration(600)} style={styles.header}>
        <Text style={styles.title}>Lịch sử giao dịch</Text>
      </Animated.View>

      <Animated.View
        entering={FadeIn.delay(200)}
        style={styles.filterContainer}
      >
        <View style={styles.searchBar}>
          <Icon name="search" size={20} color={COLORS.gray[400]} />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm theo ghi chú..."
            value={search}
            onChangeText={setSearch}
            placeholderTextColor={COLORS.gray[400]}
          />
        </View>

        <View style={styles.tabs}>
          {[
            { id: "all", label: "Tất cả" },
            { id: "expense", label: "Khoản chi" },
            { id: "income", label: "Khoản thu" },
          ].map((tab, index) => (
            <Animated.View
              key={tab.id}
              entering={ZoomIn.delay(300 + index * 50).springify()}
            >
              <TouchableOpacity
                style={[styles.tab, filterType === tab.id && styles.tabActive]}
                onPress={() => setFilterType(tab.id as any)}
              >
                <Text
                  style={[
                    styles.tabText,
                    filterType === tab.id && styles.tabTextActive,
                  ]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      </Animated.View>

      {filteredTransactions.length === 0 ? (
        <Animated.View
          entering={FadeIn.delay(400)}
          style={styles.emptyContainer}
        >
          <Icon name="search-x" size={64} color={COLORS.gray[200]} />
          <Text style={styles.emptyText}>Không tìm thấy giao dịch nào</Text>
        </Animated.View>
      ) : (
        <FlatList
          data={filteredTransactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <Animated.View
              entering={FadeInLeft.delay(100 + (index % 10) * 50).duration(400)}
              layout={Layout.springify()}
            >
              <TransactionItem
                transaction={item}
                onPress={() => handleTransactionPress(item)}
              />
            </Animated.View>
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      <TransactionDetailModal
        transaction={selectedTransaction}
        visible={detailVisible}
        onClose={() => {
          setDetailVisible(false);
          setSelectedTransaction(null);
        }}
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
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
    backgroundColor: COLORS.white,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.text,
  },
  filterContainer: {
    padding: SPACING.lg,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[100],
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.gray[50],
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    height: 48,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.gray[100],
  },
  searchInput: {
    flex: 1,
    marginLeft: SPACING.sm,
    fontSize: 16,
    color: COLORS.text,
  },
  tabs: {
    flexDirection: "row",
    gap: SPACING.sm,
  },
  tab: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.gray[100],
  },
  tabActive: {
    backgroundColor: COLORS.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.gray[600],
  },
  tabTextActive: {
    color: COLORS.white,
  },
  listContent: {
    padding: SPACING.lg,
    paddingBottom: 40,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    marginTop: SPACING.md,
    fontSize: 16,
    color: COLORS.gray[400],
  },
});
