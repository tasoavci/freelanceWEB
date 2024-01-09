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
      const handleGoBack = () => {
        router.back(); 
      };
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
<div className='flex flex-col gap-16 items-center justify-center h-screen w-full text-[#E3E2DF] global-background'>

<motion.div
        initial={{ y: '-50vw' }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 120 }}
        className='w-[50%] h-[70%] border-2 border-[#9A1750] bg-[#222629] rounded-2xl shadow-[#5D001E] relative shadow-lg flex flex-col justify-between p-5 items-center'>
        <div className='p-3 flex justify-center items-center w-full'>
            <h1 className='text-3xl font-bold'>Active Bids:</h1>
        </div>
        <div>
  {jobs.map((job, index) => (
    <div key={job._id} className="flex items-center my-2">
      <li className="flex-grow bg-gray-600 rounded-md p-4 relative">
        <p className="text-xl font-semibold">Name: {job.name}</p>
        <p className="text-lg">Description: {job.description}</p>
        <p className="text-lg">Price: {job.price}</p>
        <p className="text-lg">Bid Amount: {job.bidAmount}</p>
        <p className="text-lg">Bid Description: {job.bidDescription}</p>
      </li>
      
      <div className='flex flex-col ml-4'>
        <button onClick={() => deleteJob(job._id)} className='green-button mb-2 px-4 py-2 rounded-lg shadow-md transition-all duration-300 ease-in-out hover:bg-green-600'>Accept</button>
        {/* <button onClick={() => deleteJob(job._id)} className='red-button px-4 py-2 rounded-lg shadow-md transition-all duration-300 ease-in-out hover:bg-red-600'>Decline</button> */}
      </div>
    </div>
  ))}
</div>


                
                
        
            
        <div className='flex gap-4 justify-center'>
        <button
    onClick={() => signOut()}
    className='rounded-md text-xl px-10 py-1'
    style={{ backgroundColor: 'rgba(164, 6, 6, 0.7)' }}
  >
    Log out
  </button>
  <button
    onClick={handleGoBack}
    className='bg-gray-700 text-white px-8 py-2 rounded-md'
  >
    Go back
  </button>       </div>
        <div className='absolute top-0 right-0 px-2 py-1 rounded-tr-2xl text-2xl rounded-bl-md'style={{ backgroundColor: 'rgba(75, 163, 63, 0.7)' }}>Balance: {session?.user?.balance}$</div>
</motion.div>
</div>
  )
}



export default ViewBidsClient