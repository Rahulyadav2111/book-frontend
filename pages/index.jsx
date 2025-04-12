import Link from 'next/link'; 

export default function Home() {
  return (
    <div className="h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-4">Book Sharing App</h1>
      <p className="text-gray-600 mb-6">Welcome! Connect with others to share or find books.</p>
      <div className="space-x-4"> 
        <Link href="/register"> 
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"> 
            Register
          </button>
        </Link>
        <Link href="/login">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Login
          </button>
        </Link>
        <Link href="/books">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Browse Books
          </button>
        </Link>
      </div>
    </div>
  );
}