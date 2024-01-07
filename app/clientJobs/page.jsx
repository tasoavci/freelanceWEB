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
    
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch('/api/addJob'); // Endpoint'iniz buraya gelmeli
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
     
    // jobs[0].ownerId içindeki işlemleri gerçekleştirin
    } else {
    console.log('Jobs dizisi boş veya ownerId içermiyor.');
    }
    // console.log("owner: ",owner)
    // console.log("session: ",session?.user?._id)
    const filteredJobs = jobs.filter(job => job.ownerId === session?.user?._id);
    console.log(filteredJobs)
    const condition = owner === session?.user?._id ? true : false;

    return (
        <div className='flex items-center justify-center h-screen w-full'>
        
        <motion.div
            initial={{ y: '100vw' }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 120 }}
            className='w-[60%] h-[60%] border border-slate-400 rounded-2xl shadow-slate-500 relative shadow flex flex-col justify-between p-5 items-center'>
                <div className='p-3 flex justify-center items-center w-full'>
                    <h1 className='text-3xl font-bold'>Welcome Client!</h1>
                </div>
                
                <button onClick={goAddJobs} className='bg-green-500 px-4 py-2 rounded-xl'> <span className='text-2xl bg-green-500 rounded-xl p-3 py-1 text-center'>+</span> Add Job</button>
                
                {filteredJobs.length !== 0 && (
        <div>
          <h2 className="text-white text-2xl font-bold mb-4 flex justify-center items-center">Jobs:</h2>
          <ul className="text-white">
            {filteredJobs.map((job) => (
              <li key={job._id} className="bg-gray-800 rounded-md p-4 my-2 relative">
                <p className="text-xl font-semibold">Name: {job.name}</p>
                <p className="text-lg">Description: {job.description}</p>
                <p className="text-lg">Price: {job.price}</p>
                <button onClick={() => deleteJob(job._id)} className='bg-red-500 text-white rounded-md text-2xl px-4 py-1 absolute top-0 right-0 '>X</button>
              </li>
            ))}
          </ul>
        </div>
      )}

                    
                <div className='w-2/3 mx-auto flex justify-center items-center'>
                    <button onClick={() => signOut()} className='bg-red-500 rounded-md text-2xl px-10 py-1 mb-4'>Log out</button>
                </div>
                <div className='absolute top-0 right-0 bg-green-500 px-2 py-1 rounded-tr-2xl text-2xl rounded-bl-md'>{balance}$</div>
                
        </motion.div>
        </div>
          )
}

export default ClientJobs