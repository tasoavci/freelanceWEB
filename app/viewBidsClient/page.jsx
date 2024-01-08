"use client";
import { motion } from 'framer-motion'
import React from 'react'
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useEffect } from 'react';


const ViewBidsClient = () => {
    const { data: session } = useSession()
    const formattedDate = new Date(session?.user?.createdAt).toLocaleDateString('tr-TR');
    const router = useRouter()
    const [jobs,setJobs] = useState([])
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
      const deleteJob = async (id) => {
        console.log(id)
        try {
            const response = await fetch(`/api/addJob`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id }) // Request body içerisine parametreyi ekliyoruz
            });            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const updatedJobs = jobs.filter((job) => job._id !== id);
            setJobs(updatedJobs);
        } catch (error) {
            console.error('Error deleting job:', error);
        }
    };
      

  return (
<div className='flex items-center justify-center h-screen w-full'>

<motion.div
    initial={{ y: '100vw' }}
    animate={{ y: 0 }}
    transition={{ type: 'spring', stiffness: 120 }}
    className='w-[60%] h-[60%] border border-slate-400 rounded-2xl shadow-slate-500 relative shadow flex flex-col justify-between p-5 items-center '>
        <div className='p-3 flex justify-center items-center w-full'>
            <h1 className='text-3xl font-bold'>Active Bids:</h1>
        </div>
        <div>
        {
        jobs.map((job,index) => (
            <li key={job._id} className="bg-gray-800 rounded-md p-4 my-2 relative">
                <p className="text-xl font-semibold">Name: {job.name}</p>
                <p className="text-lg">Description: {job.description}</p>
                <p className="text-lg">Price: {job.price}</p>
                <p className="text-lg">Bid Amount: {job.bidAmount}</p>
                
                <div className='absolute top-0 right-0 flex '>
                <button onClick={() => deleteJob(job._id)} className='bg-green-500 px-2 py-1'>Accept</button>
                <button onClick={() => deleteJob(job._id)} className='bg-red-500 px-2 py-1'>Decline</button>
                </div>
            </li>))}
                
            </div>
                
                
        
            
        <div className='w-2/3 mx-auto flex justify-center items-center'>
            <button onClick={() => signOut()} className='bg-red-500 rounded-md text-2xl px-10 py-1 mb-4'>Log out</button>
        </div>
        <div className='absolute top-0 right-0 bg-green-500 px-2 py-1 rounded-tr-2xl text-2xl rounded-bl-md'>Balance: {session?.user?.balance}$</div>
</motion.div>
</div>
  )
}



export default ViewBidsClient