"use client";
import { motion } from 'framer-motion'
import React from 'react'
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';

const Dashboard = () => {
    const { data: session } = useSession()
    const formattedDate = new Date(session.user.createdAt).toLocaleDateString('tr-TR');


  return (
<div className='flex items-center justify-center h-screen w-full'>

<motion.div
    initial={{ y: '100vw' }}
    animate={{ y: 0 }}
    transition={{ type: 'spring', stiffness: 120 }}
    className='w-[60%] h-[60%] border border-slate-400 rounded-2xl shadow-slate-500 relative shadow flex flex-col justify-between p-5 items-center'>
        <div className='p-3 flex justify-center items-center w-full'>
            <h1 className='text-3xl font-bold'>Welcome {session?.user?.type === "freelance" ? "Freelancer" : "Client"}!</h1>
        </div>
        <div className='flex flex-col items-center justify-center gap-3 mb-16'>
            <h1 className='text-3xl font-semibold '>User Info</h1>
            <h1 className='text-xl'>Name: {session?.user?.fullName}</h1>
            <h1 className='text-xl'>Email: {session?.user?.email}</h1>
            <h1 className='text-xl'>Account created at: {formattedDate}</h1>
            
        </div>
        <div className='w-2/3 mx-auto flex justify-center items-center'>
            <button onClick={() => signOut()} className='bg-red-500 rounded-md text-2xl px-10 py-1 mb-4'>Log out</button>
        </div>
</motion.div>
</div>
  )
}



export default Dashboard