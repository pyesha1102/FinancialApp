import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';

// Mock Data
const initialTransactions = [
  { id: '1', name: 'Groceries', amount: 50, date: '2024-10-01', category: 'Food' },
  { id: '2', name: 'Rent', amount: 500, date: '2024-10-02', category: 'Housing' },
  { id: '3', name: 'Electricity Bill', amount: 100, date: '2024-10-03', category: 'Utilities' },
  { id: '4', name: 'Internet', amount: 60, date: '2024-10-04', category: 'Utilities' },
  { id: '5', name: 'Dining Out', amount: 70, date: '2024-10-05', category: 'Food' },
];

// Transaction List Component
export default function TransactionList() {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('2024-10-01'); // Default initial date
  const [category, setCategory] = useState('Food');

  // Calculate total expenses
  const totalExpenses = transactions.reduce((total, transaction) => total + transaction.amount, 0);

  const handleAddTransaction = () => {
    if (!name || !amount || !category) {
      alert('Please fill in all fields.');
      return;
    }

    const newTransaction = {
      id: (transactions.length + 1).toString(),
      name,
      amount: parseFloat(amount),
      date,
      category,
    };

    setTransactions([...transactions, newTransaction]);
    setModalVisible(false);
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setAmount('');
    setDate('2024-10-01'); 
    setCategory('Food');
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter(transaction => transaction.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Transaction List</Text>
      <Text style={styles.totalText}>Total Expenses: ${totalExpenses.toFixed(2)}</Text>

      {/* Button to Open Modal */}
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>Add Transaction</Text>
      </TouchableOpacity>

      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.transactionCard}>
            <View style={styles.cardContent}>
              <MaterialIcons name="attach-money" size={24} color="#4caf50" />
              <View style={styles.textContainer}>
                <Text style={styles.transactionText}>{item.name}</Text>
                <Text style={styles.detailText}>Amount: ${item.amount}</Text>
                <Text style={styles.detailText}>Date: {item.date}</Text>
                <Text style={styles.categoryText}>Category: {item.category}</Text>
              </View>
              <TouchableOpacity onPress={() => handleDeleteTransaction(item.id)}>
                <MaterialIcons name="delete" size={24} color="#ff5252" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Modal for Adding New Transaction */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Add New Transaction</Text>
            <TextInput
              style={styles.input}
              placeholder="Transaction Name"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Amount"
              value={amount}
              keyboardType="numeric"
              onChangeText={setAmount}
            />

            {/* Calendar for Selecting Date */}
            <View style={styles.calendarContainer}>
              <Text style={styles.dateLabel}>Select Date:</Text>
              <Calendar
                onDayPress={(day) => setDate(day.dateString)}
                markedDates={{
                  [date]: { selected: true, marked: true, selectedColor: '#4caf50' },
                }}
                style={styles.calendar}
              />
            </View>

            <View style={styles.categoryContainer}>
              <Text style={styles.categoryLabel}>Category:</Text>
              <View style={styles.categoryPicker}>
                <TouchableOpacity
                  style={styles.categoryButton}
                  onPress={() => setCategory('Food')}
                >
                  <Text style={category === 'Food' ? styles.selectedCategory : styles.categoryText}>Food</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.categoryButton}
                  onPress={() => setCategory('Housing')}
                >
                  <Text style={category === 'Housing' ? styles.selectedCategory : styles.categoryText}>Housing</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.categoryButton}
                  onPress={() => setCategory('Utilities')}
                >
                  <Text style={category === 'Utilities' ? styles.selectedCategory : styles.categoryText}>Utilities</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.categoryButton}
                  onPress={() => setCategory('Transport')}
                >
                  <Text style={category === 'Transport' ? styles.selectedCategory : styles.categoryText}>Transport</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.categoryButton}
                  onPress={() => setCategory('Entertainment')}
                >
                  <Text style={category === 'Entertainment' ? styles.selectedCategory : styles.categoryText}>Entertainment</Text>
                </TouchableOpacity>
              </View>
            </View>

            <Button title="Add Transaction" onPress={handleAddTransaction} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} color="#ff5252" />
          </View>
        </View>
      </Modal>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  totalText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    color: '#4caf50',
  },
  addButton: {
    backgroundColor: '#4caf50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  transactionCard: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', 
  },
  textContainer: {
    marginLeft: 10,
    flex: 1, 
  },
  transactionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  detailText: {
    fontSize: 14,
    color: '#666',
  },
  categoryText: {
    fontSize: 14,
    color: '#999',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
  calendarContainer: {
    marginVertical: 15,
  },
  dateLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  calendar: {
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  categoryContainer: {
    marginBottom: 15,
  },
  categoryLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  categoryPicker: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
    marginRight: 5,
    marginBottom: 5,
  },
  selectedCategory: {
    fontWeight: 'bold',
    color: '#4caf50',
  },
  categoryText: {
    color: '#333',
  },
});
