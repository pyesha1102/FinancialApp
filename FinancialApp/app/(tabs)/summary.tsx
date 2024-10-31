import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

// Mock Data
const transactions = [
  { id: '1', name: 'Groceries', amount: 50, date: '2024-10-01', category: 'Food' },
  { id: '2', name: 'Rent', amount: 500, date: '2024-10-02', category: 'Housing' },
  { id: '3', name: 'Electricity Bill', amount: 100, date: '2024-10-03', category: 'Utilities' },
  { id: '4', name: 'Internet', amount: 60, date: '2024-10-04', category: 'Utilities' },
  { id: '5', name: 'Dining Out', amount: 70, date: '2024-10-05', category: 'Food' },
];

// Helper function to calculate totals by category
const calculateTotalsByCategory = (data) => {
  return data.reduce((acc, { category, amount }) => {
    acc[category] = (acc[category] || 0) + amount;
    return acc;
  }, {});
};

export default function Summary() {
  const totalExpenses = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
  const expensesByCategory = calculateTotalsByCategory(transactions);

  // Data for Pie Chart
  const pieData = Object.keys(expensesByCategory).map((category) => ({
    name: category,
    amount: expensesByCategory[category],
    color: '#' + Math.floor(Math.random() * 16777215).toString(16),
    legendFontColor: '#333',
    legendFontSize: 15,
  }));

  // Data for Bar Chart
  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        data: [300, 200, 500, 150, 600, 700, 550, 650, 400, 450, 600, 500],
        color: () => 'rgba(255, 0, 0, 1)', 
      },
      {
        data: [400, 400, 400, 400, 400, 400, 400, 400, 400, 400, 400, 400], 
        color: () => 'rgba(255, 0, 0, 0.5)',
        strokeWidth: 2, 
      },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Financial Summary</Text>

      {/* Total Expenses */}
      <View style={styles.summaryCard}>
        <Text style={styles.totalText}>Total Expenses</Text>
        <Text style={styles.totalAmount}>${totalExpenses}</Text>
      </View>

      {/* Monthly Spending Trend */}
      <Text style={styles.sectionTitle}>Monthly Spending Trend</Text>
      <BarChart
        data={barData}
        width={screenWidth - 40} 
        height={220}
        yAxisLabel="$"
        chartConfig={chartConfig}
        style={styles.chart}
        withInnerLines={false}
        withVerticalLines={false}
        withHorizontalLines={true} 
      />

      {/* Spending by Category (Pie Chart) */}
      <Text style={styles.sectionTitle}>Spending by Category</Text>
      <PieChart
        data={pieData}
        width={screenWidth - 40}
        height={220}
        chartConfig={chartConfig}
        accessor="amount"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute 
      />

      {/* Recent Transactions */}
      <Text style={styles.sectionTitle}>Recent Transactions</Text>
      <FlatList
        data={transactions.slice(-5)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.transactionCard}>
            <Text style={styles.transactionText}>{item.name}</Text>
            <Text style={styles.amountText}>${item.amount}</Text>
            <Text style={styles.dateText}>{item.date}</Text>
          </View>
        )}
      />
    </ScrollView>
  );
}

// Chart Configurations
const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  color: () => 'rgba(255, 0, 0, 1)', // Red color
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  barPercentage: 0.5,
  decimalPlaces: 0,
};

// Styles for the Summary screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  summaryCard: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#4caf50',
    alignItems: 'center',
    marginBottom: 20,
  },
  totalText: {
    fontSize: 18,
    color: '#fff',
  },
  totalAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginVertical: 10,
  },
  chart: {
    marginBottom: 20,
    borderRadius: 10,
  },
  transactionCard: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
  },
  transactionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
  },
  dateText: {
    fontSize: 14,
    color: '#999',
  },
  amountText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});
