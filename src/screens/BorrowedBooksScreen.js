import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { getBorrowedBooks, returnBook } from '../services/firebaseConfig';


const BorrowedBooksScreen = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    getBorrowedBooks(setBorrowedBooks);
  }, []);

  const handleReturn = async (id) => {
    await returnBook(id);
    setBorrowedBooks(borrowedBooks.filter(book => book.id !== id));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={borrowedBooks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.bookItem}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.author}>by {item.author}</Text>
            <Button title="Return Book" onPress={() => handleReturn(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  bookItem: { backgroundColor: '#fff', padding: 15, marginVertical: 8, borderRadius: 10 },
  title: { fontSize: 18, fontWeight: 'bold' },
  author: { fontSize: 14, color: 'gray' },
});

export default BorrowedBooksScreen;
