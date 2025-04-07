import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { getBooks } from '../services/firebaseConfig';

const BookListScreen = ({ navigation }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks(setBooks);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.bookItem} onPress={() => navigation.navigate('BookDetails', { book: item })}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.author}>by {item.author}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('BorrowedBooks')}>
        <Text style={styles.buttonText}> View Borrowed Books</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f4f4f4' },
  bookItem: { backgroundColor: '#fff', padding: 15, marginVertical: 8, borderRadius: 10, elevation: 3 },
  title: { fontSize: 18, fontWeight: 'bold' },
  author: { fontSize: 14, color: 'gray' },
  button: { backgroundColor: '#6200EE', padding: 15, borderRadius: 10, marginTop: 20, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default BookListScreen;
