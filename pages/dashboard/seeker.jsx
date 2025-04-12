import { useState, useEffect } from 'react'; 
import { useRouter } from 'next/router'; 
import axios from 'axios'; 
import BookCard from '../../components/BookCard'; 
import Link from 'next/link';
export default function SeekerDashboard() {
  const [books, setBooks] = useState([]);
  const [locationFilter, setLocationFilter] = useState('');
  const router = useRouter();
  const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || '{}') : {}; 

  useEffect(() => {
    if (!user?._id) {
      router.push('/login');
    } else {
      fetchBooks();
    }
  }, []); 

  const fetchBooks = async () => {
    const res = await axios.get('http://localhost:5000/api/books'); 
    setBooks(res.data); 
  };

  const filteredBooks = books.filter(
    (book) => !locationFilter || book.location.toLowerCase().includes(locationFilter.toLowerCase()) 
  );

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold mb-4">Seeker Dashboard</h1>
            <Link href="/" className="text-blue-500 underline">Home</Link>
            </div>
      <input
        type="text" 
        placeholder="Filter by location"
        value={locationFilter}
        onChange={(e) => setLocationFilter(e.target.value)}
        className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <h2 className="text-xl font-semibold mb-2">Available Books</h2>
      {filteredBooks.map((book) => (
        <BookCard key={book._id} book={book} />
      ))}
    </div>
  );
}