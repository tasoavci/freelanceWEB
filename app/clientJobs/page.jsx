"use client";
import { motion } from 'framer-motion'
import React from 'react'
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useState } from 'react';
import { useUserBalance } from '@/lib/useUserBalance';




const ClientJobs = () => {
    
    const router = useRouter()
    const [jobs, setJobs] = useState([]);
    const {data:session} = useSession()
    const balance = useUserBalance(session, jobs);
    
    // if (balance < 0){
    //     alert("yetersiz bakiye")
    //     router.push("dashboardClient")
    //     return;
    // }
        
    const goAddJobs = () => {
        router.push("/clientAddJobs")
    }
    
    const deleteJob = async (id) => {
        console.log(id)
        try {
            const response = await fetch(`/api/addJob`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id }) 
            });            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const updatedJobs = jobs.filter((job) => job._id !== id);
            setJobs(updatedJobs);
        } catch (error) {
            console.error('Error deleting job:', error);
        }
    };
    
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch('/api/addJob'); 
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                

                setJobs(data);
                
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };

        fetchJobs();
    }, []);
    
    let owner = null;

    if (jobs && jobs.length > 0 && jobs[0] && jobs[0].ownerId) {
        owner = jobs[0].ownerId;
     
    
    } else {
    console.log('Jobs dizisi boş veya ownerId içermiyor.');
    }
    // console.log("owner: ",owner)
    // console.log("session: ",session?.user?._id)
    const filteredJobs = jobs.filter(job => job.ownerId === session?.user?._id);
    console.log(filteredJobs)
    const condition = owner === session?.user?._id ? true : false;
    const handleGoBack = () => {
        router.push ("/dashboardClient")
    }
    return (
<div className='flex flex-col gap-16 items-center justify-center min-h-screen w-full text-[#E3E2DF] global-background'>
        
<motion.div
        initial={{ y: '-50vw' }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 120 }}
        className='w-[50%] min-h-screen border-2 border-[#9A1750] bg-[#222629] rounded-2xl shadow-[#5D001E] relative shadow-lg flex flex-col justify-between p-5 items-center'>
                <div className='p-3 flex justify-center items-center w-full'>
                    <h1 className='text-3xl font-bold'>Welcome Client!</h1>
                </div>
                
                <button onClick={goAddJobs} className='green-button px-4 py-2 rounded-xl text-2xl flex items-center justify-center'>
  <span className='p-3 py-1'>+</span> Add Job
</button>

                
                {filteredJobs.length !== 0 && (
        <div>
          <h2 className="text-white text-2xl font-bold mb-4 flex justify-center items-center">Jobs:</h2>
          <ul className="text-white">
            {filteredJobs.map((job) => (
              <li key={job._id} className="bg-gray-600 rounded-md p-4 my-2 relative">
                <p className="text-xl font-semibold">Name: {job.name}</p>
                <p className="text-lg">Description: {job.description}</p>
                <p className="text-lg">Price: {job.price}</p>
                <button onClick={() => deleteJob(job._id)} className=' text-white rounded-md text-l px-4 py-1 absolute top-0 right-0 'style={{ backgroundColor: 'rgba(164, 6, 6, 0.7)' }}>X</button>
              </li>
            ))}
          </ul>
        </div>
      )}

                    
                <div className='w-2/3 mx-auto flex justify-center items-center gap-2'>
                <button onClick={() => signOut()} className='rounded-md text-2xl px-10 py-1 ' style={{ backgroundColor: 'rgba(164, 6, 6, 0.7)' }}>
                Log out
                </button> 
                <button
                    onClick={handleGoBack}
                    className='bg-gray-700 text-white text-2xl px-10 py-1 rounded-md'
                    >
                    Go back
                 </button>
                </div>
                <div className='absolute top-0 right-0 px-2 py-1 rounded-tr-2xl text-2xl rounded-bl-md'style={{ backgroundColor: 'rgba(75, 163, 63, 0.7)' }}>Balance: {balance}$</div>
                
        </motion.div>
        </div>
          )
}

export default ClientJobs