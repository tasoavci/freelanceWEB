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
            router.push("/dashboard")

        } catch (error) {
            console.log(error)
        }
    };
    return (
        <div
            className='flex flex-col gap-16 items-center justify-center h-screen w-full text-[#E3E2DF] global-background'>
            <motion.div
        initial={{ y: '-50vw' }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 120 }}
        className='w-[50%] h-[70%] border-2 border-[#9A1750] bg-[#222629] rounded-2xl shadow-[#5D001E] relative shadow-lg flex flex-col justify-between p-5 items-center'>

                    <form onSubmit={handleSubmit} className="w-2/3">
                    <h2 className="text-2xl mb-4 font-semibold text-center">Login your account</h2>
                    
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-1">Email</label>
                        <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 rounded-md bg-gray-700"
                        style={{ border: '2px solid #9A1750' }} 
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
                        className="w-full px-4 py-2 rounded-md bg-gray-700"
                        style={{ border: '2px solid #9A1750' }} 
                        required
                        />
                    </div>

                    {/* <div className='flex justify-center items-center gap-8 mb-10'>
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
                    </div> */}
                    <button
                    type="submit"
                    className="custom-button"
                    >
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