"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation';


const CreateClient = () => {
    const router = useRouter()
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


    const handleSubmit = async(e) => {
        e.preventDefault();
        
        if(password.length < 8 ){
            setError("Password must be 8 or more characters");
            return;
        }
        try {
            const resUserExists = await fetch('api/userExist', {
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({email})
            })
            const user = await resUserExists.json()

            if (user.user !== null) {
                setError("User Already Exists")
                return;
            }


            const res = await fetch('/api/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fullName,
                    email,
                    password,
                    type: "client",
                    balance:1000
                })
            })
            if (res.ok) {
                console.log(res)
                e.target.reset()
                router.push("/login")
            } else {
                console.log("user registiration failed")
                
            }
        } catch (error) {
            console.log("error during registiration: ", error);

        }
    };
    return (
        <div className='flex items-center justify-center h-screen w-full'>

            <motion.div
                initial={{ y: '-100vw' }}
                animate={{ y: 0 }}
                transition={{ type: 'spring', stiffness: 120 }}
                className='w-[60%] h-[60%] border border-slate-400 rounded-2xl shadow-slate-500 relative shadow flex flex-col justify-between p-5 items-center'>

                <form onSubmit={handleSubmit} className="w-2/3">
                    <h2 className="text-3xl mb-4 font-bold text-center">Sign Up to Hire Talent</h2>
                    <div className="mb-4">
                        <label htmlFor="fullName" className="block mb-1">Full Name</label>
                        <input
                            type="text"
                            id="fullName"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md bg-gray-700"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-1">Work email address</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md bg-gray-700"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block mb-1">Password (8 or more characters)</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md bg-gray-700"
                            required
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 mb-4 text-white flex justify-center items-center w-full px-4 py-2 rounded-md">
                        Sign Up
                    </button>
                    <div>
                        {/* already */}
                        <h1 className='text-sm text-center'>Already have an account? <button onClick={() => { router.push('/Login') }} className=' underline'>Log in</button></h1>
                    </div>
                    {error && (
                        <div className='bg-red-500 mt-2 px-4 py-2 text-xl rounded-md flex justify-center items-center w-2/3 mx-auto animate-pulse'>
                            {error}
                        </div>
                        )}
                </form>


            </motion.div>
        </div>
    )
}

export default CreateClient