"use client";
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
    const { data: session } = useSession()
    const formattedDate = new Date(session?.user?.createdAt).toLocaleDateString('tr-TR');
    const router = useRouter()
    

    const goCheckJobs = () =>{
        router.push("/checkJobs")
    }

  return (
<div className='flex flex-col gap-16 items-center justify-center h-screen w-full text-[#E3E2DF] global-background'>

<motion.div
        initial={{ y: '-50vw' }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 120 }}
        className='w-[50%] h-[70%] border-2 border-[#9A1750] bg-[#222629] rounded-2xl shadow-[#5D001E] relative shadow-lg flex flex-col justify-between p-5 items-center'>
        <div className='p-3 flex justify-center items-center w-full'>
            <h1 className='text-3xl font-bold'>Welcome Freelancer!</h1>
        </div>
        <div className='flex flex-col items-center justify-center gap-3 mb-16'>
            <h1 className='text-3xl font-semibold '>User Info</h1>
            <h1 className='text-xl'>Name: {session?.user?.fullName}</h1>
            <h1 className='text-xl'>Email: {session?.user?.email}</h1>
            <h1 className='text-xl'>Account created at: {formattedDate}</h1>
            
        </div>
        <div className='flex justify-center items-center '>
            <button onClick={goCheckJobs} className='rounded-md blue-button px-4 py-2 text-2xl'>
                Check jobs 
            </button>
        </div>
        <div className='w-2/3 mx-auto flex justify-center items-center'>
        <button onClick={() => signOut()} className='rounded-md text-xl px-10 py-1 mb-4' style={{ backgroundColor: 'rgba(164, 6, 6, 0.7)' }}>
        Log out
        </button>        </div>
        <div className='absolute top-0 right-0 px-2 py-1 rounded-tr-2xl text-2xl rounded-bl-md'style={{ backgroundColor: 'rgba(75, 163, 63, 0.7)' }}>Balance: {session?.user?.balance}$</div>

</motion.div>
</div>
  )
}



export default Dashboard