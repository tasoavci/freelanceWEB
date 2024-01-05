"use client";
import React from 'react'
import { motion } from 'framer-motion'
import { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Login = () => {
    const {data:session} = useSession()
    const router = useRouter()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error,setError] = useState('');
    const [selectedOption, setSelectedOption] = useState('');

    const handleChange = (e) => {
        setSelectedOption(e.target.value);
      };
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const res = await signIn('credentials',{
                email,
                password,
                
                redirect:false
            })
            console.log("response: ",res)
            if (res.error){
                setError("Invalid Credentials")
                return; 
            }
            if (selectedOption === ''){
                setError("Fill the radio input correctly")
            }
            if (selectedOption === 'client'){
                router.push("/dashboardClient")
            }
            if (selectedOption === 'freelancer'){
                router.push("/dashboard")
            }

        } catch (error) {
            console.log(error)
        }
    };
    return (
        <div className='flex items-center justify-center h-screen w-full'>
            <motion.div
                initial={{ y: '-100vw' }}
                animate={{ y: 0 }}
                transition={{ type: 'spring', stiffness: 120 }}
                className='w-[60%] h-[60%] border border-slate-400 rounded-2xl shadow-slate-500 relative shadow flex flex-col justify-between pt-14 p-5 items-center'>

                <form onSubmit={handleSubmit} className="w-2/3 ">
                    <h2 className="text-2xl mb-4 font-semibold text-center">Login your account</h2>
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-1">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md bg-gray-700"
                            required
                        />
                    </div>
                    <div className="mb-10">
                        <label htmlFor="password" className="block mb-1">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md bg-gray-700"
                            required
                        />
                    </div>
                    <div className='flex justify-center items-center gap-8 mb-10'>
                        <div className='flex justify-center items-center gap-1'>
                    <input
                        className=''
                        type='radio'
                        value='client'
                        checked={selectedOption === 'client'}
                        onChange={handleChange}>
                    </input>
                    <h1 className='text-xl flex justify-center items-center'>
                        Client
                    </h1>
                    </div>
                    <div  className='flex justify-center items-center gap-1'>
                    <input
                        className=''
                        type='radio'
                        value='freelancer'
                        checked={selectedOption === 'freelancer'}
                        onChange={handleChange}>
                    </input>
                    <h1 className='text-xl flex justify-center items-center'>
                        Freelancer
                    </h1>
                    </div>
                    </div>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md w-full">
                        Login
                    </button>
                    

                    {error && (
                        <div className='bg-red-500 mt-4 px-4 py-2 text-xl rounded-md flex justify-center items-center w-2/3 mx-auto animate-pulse'>
                            {error}
                        </div>
                    )}
                </form>

                   <h1>Don't you have an account?  <Link href={"/firstPage"} className=" underline">Create one!</Link></h1>
            </motion.div>
        </div>
    )
}

export default Login