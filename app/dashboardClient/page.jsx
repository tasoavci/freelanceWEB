"use client";
import { motion } from 'framer-motion'
import React from 'react'
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {useState} from 'react'
import { useUserBalance } from '../../lib/useUserBalance';
import { useEffect } from 'react';


const Dashboard = () => {
    const { data: session } = useSession()
    const formattedDate = new Date(session?.user?.createdAt).toLocaleDateString('tr-TR');
    const router = useRouter()
    const [jobs,setJobs] = useState([])
    const balance = useUserBalance(session, jobs);
    const goAddJobs = () =>{
        router.push("/clientJobs")
    }
    useEffect(() => {
        const fetchJobs = async () => {
          try {
            const response = await fetch('/api/addJob');
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            
            // Filtreleme işlemi
            const filteredJobs = data.filter(job => job.bid === true && job.ownerId === session?.user?._id);
            
            setJobs(filteredJobs);
            console.log("jobs: ", jobs);
          } catch (error) {
            console.error('Error fetching jobs:', error);
          }
        };
      
        fetchJobs();
      }, []);

  return (
<div className='flex flex-col gap-16 items-center justify-center h-screen w-full text-[#E3E2DF] global-background'>

<motion.div
        initial={{ y: '-50vw' }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 120 }}
        className='w-[50%] h-[70%] border-2 border-[#9A1750] bg-[#222629] rounded-2xl shadow-[#5D001E] relative shadow-lg flex flex-col justify-between p-5 items-center'>
        <div className='p-3 flex justify-center items-center w-full'>
            <h1 className='text-3xl font-bold'>Welcome Client!</h1>
        </div>
        <div className='flex flex-col items-center justify-center gap-3 mb-16'>
            <h1 className='text-3xl font-semibold '>User Info</h1>
            <h1 className='text-xl'>Name: {session?.user?.fullName}</h1>
            <h1 className='text-xl'>Email: {session?.user?.email}</h1>
            <h1 className='text-xl'>Account created at: {formattedDate}</h1>
        </div>
        <div className='flex justify-center items-center w-full gap-4'>
            <button
                onClick={goAddJobs}
                className='blue-button text-2xl'
            >
                Start add jobs 
            </button>
            <button
                onClick={() => router.push("/viewBidsClient")}
                className='green-button text-2xl'
            >
                View Your Bids
            </button>
            </div>
        <div className='w-2/3 mx-auto flex justify-center items-center'>
        <button onClick={() => signOut()} className='rounded-md text-xl px-10 py-1 mb-4' style={{ backgroundColor: 'rgba(164, 6, 6, 0.7)' }}>
        Log out
        </button>
        </div>
        <div className='absolute top-0 right-0 px-2 py-1 rounded-tr-2xl text-2xl rounded-bl-md'style={{ backgroundColor: 'rgba(75, 163, 63, 0.7)' }}>Balance: {balance}$</div>
</motion.div>
</div>
  )
}



export default Dashboard