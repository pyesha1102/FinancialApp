import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TransactionList from './transactions';
import Summary from './summary';

const Tab = createBottomTabNavigator();

export default function Layout() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Transactions" component={TransactionList} />
      <Tab.Screen name="Summary" component={Summary} />
    </Tab.Navigator>
  );
}
