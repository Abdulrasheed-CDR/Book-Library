import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, updateDoc, query, where } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCZ5JR5EoSFnsQ2ZdVoEMsLO0o_HGQTa1E",
  authDomain: "booklibraryapp-6132-lab3.firebaseapp.com",
  projectId: "booklibraryapp-6132-lab3",
  storageBucket: "booklibraryapp-6132-lab3.firebasestorage.app",
  messagingSenderId: "103586404243",
  appId: "1:103586404243:web:f89678398063d4a613ba66"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const getBooks = async (setBooks) => {
  const booksCollection = collection(db, "books");
  const booksSnapshot = await getDocs(booksCollection);
  const booksList = booksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  setBooks(booksList);
};

const getBorrowedBooks = async (setBorrowedBooks) => {
  const booksCollection = collection(db, "books");
  const q = query(booksCollection, where("Borrowed", "==", true));
  const booksSnapshot = await getDocs(q);
  const booksList = booksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  setBorrowedBooks(booksList);
};

const borrowBook = async (bookId) => {
  const booksCollection = collection(db, "books");
  const borrowedBooksQuery = query(booksCollection, where("Borrowed", "==", true));
  const borrowedBooksSnapshot = await getDocs(borrowedBooksQuery);
  const borrowedCount = borrowedBooksSnapshot.docs.length;

  if (borrowedCount >= 3) {
    return false;  // limit 3 books
  }

  const bookRef = doc(db, "books", bookId);
  await updateDoc(bookRef, { Borrowed: true });
  return true;
};

const returnBook = async (bookId) => {
  const bookRef = doc(db, "books", bookId);
  await updateDoc(bookRef, { Borrowed: false });
};

export { getBooks, getBorrowedBooks, borrowBook, returnBook };
