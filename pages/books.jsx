import { useState, useEffect } from 'react'; 
import axios from 'axios'; 
import BookCard from '../components/BookCard'; 

export default function Books() {
  const [books, setBooks] = useState([]); 
  const [locationFilter, setLocationFilter] = useState(''); 

  useEffect(() => {
    fetchBooks();
  }, []); 

  const fetchBooks = async () => {
    const res = await axios.get('https://book-backend-xco5.onrender.com/api/books'); 
    setBooks(res.data); 
  };

  const filteredBooks = books.filter(
    (book) => !locationFilter || book.location.toLowerCase().includes(locationFilter.toLowerCase()) 
  );

  return (
    <div className="max-w-2xl mx-auto p-6"> 
      <h1 className="text-2xl font-bold mb-4">All Books</h1>
      <input
        type="text" 
        placeholder="Filter by location" 
        value={locationFilter}
        onChange={(e) => setLocationFilter(e.target.value)} 
        className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {filteredBooks.map((book) => ( 
        <BookCard key={book._id} book={book} />
      ))}
    </div>
  );
}