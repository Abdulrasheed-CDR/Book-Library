import { db } from './firebaseConfig';
import { collection, getDocs, updateDoc, doc, addDoc } from 'firebase/firestore';

const getBooks = async () => {
  const booksCollection = collection(db, 'books');
  const snapshot = await getDocs(booksCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

const borrowBook = async (bookId) => {
  const bookRef = doc(db, 'books', bookId);
  await updateDoc(bookRef, { borrowed: true });
};

const returnBook = async (bookId) => {
  const bookRef = doc(db, 'books', bookId);
  await updateDoc(bookRef, { borrowed: false });
};

export { getBooks, borrowBook, returnBook };
