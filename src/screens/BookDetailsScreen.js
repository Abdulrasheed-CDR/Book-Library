import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { borrowBook } from '../services/firebaseConfig';

const BookDetailsScreen = ({ route, navigation }) => {
  const { book } = route.params;
  const [borrowed, setBorrowed] = useState(book.Borrowed);

  const handleBorrow = async () => {
    const success = await borrowBook(book.id);
    if (success) {
      setBorrowed(true);
      alert('Book borrowed successfully!');
    } else {
      alert('You cannot borrow more than 3 books at a time.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.author}>by {book.author}</Text>
      <Text style={styles.description}>{book.description}</Text>
      <Button title={borrowed ? 'Already Borrowed' : 'Borrow Book'} onPress={handleBorrow} disabled={borrowed} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold' },
  author: { fontSize: 18, color: 'gray' },
  description: { fontSize: 16, marginVertical: 10 },
});

export default BookDetailsScreen;
