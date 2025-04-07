import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BookListScreen from '../screens/BookListScreen';
import BookDetailsScreen from '../screens/BookDetailsScreen';
import BorrowedBooksScreen from '../screens/BorrowedBooksScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#6200EE' }, headerTintColor: '#fff' }}>
      <Stack.Screen name="BookList" component={BookListScreen} options={{ title: 'Book Library' }} />
      <Stack.Screen name="BookDetails" component={BookDetailsScreen} options={{ title: 'Book Details' }} />
      <Stack.Screen name="BorrowedBooks" component={BorrowedBooksScreen} options={{ title: 'Borrowed Books' }} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
