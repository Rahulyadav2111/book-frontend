import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
export default function Register(){
    const[form, setForm] = useState({
        name: '',
        mobile:'',
        email:'',
        password:'',
        role:'seeker',
    });
    const[error, setError] = useState('');
    const[success, setSuccess]=useState(false);
    const router = useRouter();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            await axios.post('https://book-backend-xco5.onrender.com/api/users', form);
            setSuccess(true);
            setTimeout(()=>{
                router.push('/login')
            },5000);
            
        }catch(err){
            setError('Registration failed');
        }
    };

    return(
        <div className="max-w-md mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Register</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {success && <p className="text-green-500 mb-4">Registration successful! Redirecting to login...</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" required placeholder="Name" value={form.name} onChange={(e)=> setForm({...form, name: e.target.value})} className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                <input type="text" required placeholder="Mobile" value={form.mobile} onChange={(e)=> setForm({...form, mobile: e.target.value})} className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                <input type="text" required placeholder="Email" value={form.email} onChange={(e)=> setForm({...form, email: e.target.value})} className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                <input type="text" required placeholder="Password" value={form.password} onChange={(e)=> setForm({...form, password: e.target.value})} className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                <select value={form.role} onChange={(e)=>setForm({...form, role:e.target.value})} className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="seeker">Seeker</option>
                    <option value="owner">Owner</option>
                </select>
                <button type="submit" className="w-full bg-blue-600 cursor-pointer text-white p-2 rounded hover:bg-blue-700">Register</button>
                <Link href="/login" className="text-blue-500 underline cursor-pointer font-bold text-sm">Already have account</Link>
            </form>
        </div>
    )

}