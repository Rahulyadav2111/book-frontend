import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

export default function Login(){
    const [form, setForm] = useState({
        email:'',
        password:''
    });
    const[error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e)=>{
        e.preventDefault()
        try{
            const res = await axios.post('http://localhost:5000/api/login', form);
            const {user} = res.data;
            localStorage.setItem('user', JSON.stringify(user));
            router.push(`/dashboard/${user.role}`);
        }catch(err){
            setError('Login failed');
        }
        
    }
    return(
        <div className="max-w-md mx-auto p-6">
                        <h1 className="text-2xl font-bold mb-4">Login</h1>
            {error && <p className="text-red-500 font-bold mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="email" placeholder="Email"  value={form.email} onChange={(e)=>setForm({...form, email:e.target.value})}  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                <input type="password" placeholder="Password"  value={form.password} onChange={(e)=>setForm({...form, password:e.target.value})}  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                <button type="submit" className="w-full cursor-pointer bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Login</button>
                <Link href="/register" className="text-blue-500 underline font-bold text-sm">Don't have an account</Link>
            </form>
        </div>
    )
}
