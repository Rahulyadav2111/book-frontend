import { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/router";
import BookCard from '../../components/BookCard';
import Link from "next/link";
export default function Owner(){
    const [form, setForm] = useState({
        title:'',
        author:'',
        genre:'',
        location:'',
        email:'',
    });
    const [books, setBooks] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const router = useRouter();
    const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || '{}') : {};

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            const parsedUser = JSON.parse(userData);
            if (!parsedUser?._id) {
                router.push('/login');
            } else {
                fetchBooks(parsedUser);
            }
        } else {
            router.push('/login');
        }
    }, []);

    const fetchBooks = async()=>{
        const res = await axios.get('http://localhost:5000/api/books');
        setBooks(res.data.filter((book) => book.ownerId === user._id));
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            await axios.post('http://localhost:5000/api/books', {
                ...form,
                ownerId:user._id,
            });
            setSuccess(true);
            setForm({title:'', author:'', genre:'', location:'', email:''});
        }catch(err){
            setError("Failed to add book");
        }
    };

    const toggleStatus = async (id, newStatus)=>{
        try{
            await axios.patch(`http://localhost:5000/api/books/${id}`, {status:newStatus});
            fetchBooks();
        }catch(err){
            setError('Failed to update status')
        }
    }
    return(
        <div className="max-w-2xl mx-auto p-6">
            <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold mb-4">Owner Dashboard</h1>
            <Link href="/" className="text-blue-500 underline">Home</Link>
            </div>
            <h2 className="text-xl font-semibold mb-2">Add Book</h2>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">Book Added Successfully</p>}
            <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <input
          type="text"
          required
          placeholder="Title"
          value={form.title} 
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          required
          placeholder="Author"
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Genre (optional)"
          value={form.genre}
          onChange={(e) => setForm({ ...form, genre: e.target.value })}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          required
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          required
          placeholder="Contact Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit" 
          className="w-full bg-blue-600 text-white cursor-pointer p-2 rounded hover:bg-blue-700" 
        >
          Add Book
        </button> 
            </form>
            <h2 className="text-xl font-semibold mb-2">Your Listings</h2>
            {books.map((book)=> (<BookCard key={book._id} book={book} onToggleStatus={toggleStatus}/>))}
        </div>
    )
}