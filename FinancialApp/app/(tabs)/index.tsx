import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Summary from './summary';
import TransactionList from './transactions';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Transaction Detail Screen
const TransactionDetail = ({ route }) => {
  const { transaction } = route.params; // Get transaction data from params

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#f5f5f5' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{transaction.name}</Text>
      <Text>Amount: ${transaction.amount}</Text>
      <Text>Date: {transaction.date}</Text>
      <Text>Category: {transaction.category}</Text>
    </View>
  );
};

// Stack Navigator for Transactions
const TransactionsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TransactionList" component={TransactionList} options={{ title: 'Transactions' }} />
      <Stack.Screen 
        name="TransactionDetail" 
        component={TransactionDetail} 
        options={{ title: 'Transaction Detail' }} 
      />
    </Stack.Navigator>
  );
};

export default function Index() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Transactions" component={TransactionsStack} />
        <Tab.Screen name="Summary" component={Summary} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
