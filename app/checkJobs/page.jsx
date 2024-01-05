"use client";
import { motion } from 'framer-motion'
import React from 'react'
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useState } from 'react';




const ClientJobs = () => {
    const {data:session} = useSession()
    const router = useRouter()
    const [balance,setBalance] = useState(session?.user?.balance)
    const [jobs, setJobs] = useState([]);
    const [isTakeJobActive,setIsTakeJobActive] = useState(false)
    const takeTheJob = () => {
        
        setIsTakeJobActive(!isTakeJobActive)
    }
   
     
    const JobComplate = async (id,price) => {
        console.log(id)
        try {
            const jobPrice = parseInt(price); // Girilen fiyatı sayıya dönüştürün
            const currentBalance = parseInt(session?.user?.balance); // Mevcut bakiyeyi sayıya dönüştürün
    
            if (!isNaN(jobPrice) && !isNaN(currentBalance)) {
                const updatedBalance = currentBalance + jobPrice; // Fiyatı mevcut bakiyeden çıkarın
                const res = await fetch('/api/updateBalance', {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        id: session?.user?._id,
                        balance: updatedBalance
                    })
                });
    
                if (res.ok) {
                    console.log("Balance updated successfully");
                    
                    
                } else {
                    console.log("Updating balance failed");
                }
            } else {
                console.log("Invalid price or balance");
            }
        } catch (error) {
            console.error("Error during updating balance:", error);
        
        };
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
                console.log("jobs: ",jobs)
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };

        fetchJobs();
    }, []);
    
    return (
        <div className='flex items-center justify-center h-screen w-full'>
        
        <motion.div
            initial={{ y: '100vw' }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 120 }}
            className='w-[60%] h-[60%] border border-slate-400 rounded-2xl shadow-slate-500 relative shadow flex flex-col justify-between p-5 items-center'>
                <div className='p-3 flex justify-center items-center w-full'>
                    <h1 className='text-3xl font-bold'>Welcome Freelancer!</h1>
                </div>
                {jobs.length === 0 && (
                    <div className='flex justify-center items-center'>
                        <h1 className='text-4xl font-bold'>There is no available job</h1>
                    </div>
                )}
                {jobs.length !== 0 && (

                
                <div>
    <h2 className="text-white text-2xl font-bold mb-4 flex justify-center items-center">Jobs:</h2>
    <ul className="text-white">
        {jobs.map((job) => (
            <li key={job._id} className="bg-gray-800 rounded-md p-4 my-2 relative">
                <p className="text-xl font-semibold">Name: {job.name}</p>
                <p className="text-lg">Description: {job.description}</p>
                <p className="text-lg">Price: {job.price}</p>
                {!isTakeJobActive && (
                <button onClick={() =>takeTheJob()} className='bg-green-500 text-white rounded-md text-xl px-4 py-1 absolute top-0 right-0 '>Take the Job</button>
                )}
                {isTakeJobActive && (
                    <div className='flex justify-center absolute top-0 right-0'>
                    <button onClick={() => JobComplate(job._id,job.price)} className='bg-green-700 text-white rounded-md text-xl px-4 py-1  '>I did!</button>
                    <button onClick={() => takeTheJob()} className='bg-red-500 text-white rounded-md text-xl px-4 py-1'>Back</button>
                    </div>
                )}
            </li>
        ))}
    </ul>
</div>
)}

                    
                <div className='w-2/3 mx-auto flex justify-center items-center'>
                    <button onClick={() => signOut()} className='bg-red-500 rounded-md text-2xl px-10 py-1 mb-4'>Log out</button>
                </div>
                <div className='absolute top-0 right-0 bg-green-500 px-2 py-1 rounded-tr-2xl text-2xl rounded-bl-md'>Balance: {balance}$</div>

        </motion.div>
        </div>
          )
}

export default ClientJobs