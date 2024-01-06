// clientAddJobs/page.jsx
"use client";
import { motion } from 'framer-motion'
import React from 'react'
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useEffect } from 'react';
import { useUserBalance } from '@/lib/useUserBalance';

const ClientAddJobs = () => {
    const router = useRouter()
    const { data: session } = useSession()

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const balance = useUserBalance(session);
    // const [balance,setBalance] = useState(session?.user?.balance)
    console.log(balance)
    const handleNameChange = (e) => {
      setName(e.target.value);
    };
  
    const handleDescriptionChange = (e) => {
      setDescription(e.target.value);
    };
  
    const handlePriceChange = (e) => {
      setPrice(e.target.value);
    };
    

    
    const handleSubmit = async(e) => {
        e.preventDefault()
        
        try {

           
            const res = await fetch('/api/addJob', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    description,
                    price
                })
            })
            if (res.ok) {
                console.log(res)
                e.target.reset()
                router.push("/clientJobs")
            } else {
                console.log("adding job failed")
                
            }
        } catch (error) {
            console.log("error during adding job: ", error);

        }

    
        // UPDATE
        try {
        const jobPrice = parseInt(price); // Girilen fiyatı sayıya dönüştürün
        const currentBalance = parseInt(session?.user?.balance); // Mevcut bakiyeyi sayıya dönüştürün

        if (!isNaN(jobPrice) && !isNaN(currentBalance)) {
            const updatedBalance = currentBalance - jobPrice; // Fiyatı mevcut bakiyeden çıkarın
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
                e.target.reset();
                router.push("/clientJobs");
            } else {
                console.log("Updating balance failed");
            }
        } else {
            console.log("Invalid price or balance");
        }
    } catch (error) {
        console.error("Error during updating balance:", error);
    
    };}
      
   
    return (
        <div className='flex items-center justify-center h-screen w-full'>
        
        <motion.div
            initial={{ y: '100vw' }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 120 }}
            className='w-[60%] h-[60%] border border-slate-400 rounded-2xl shadow-slate-500 relative shadow flex flex-col justify-between p-5 items-center'>
                <div className='pt-3 flex justify-center items-center w-full'>
                    <h1 className='text-3xl font-bold'>Welcome Client!</h1>
                </div>

                <div className="max-w-md mx-auto mt-10">
                    <h1 className='text-4xl text-center'>Add job:</h1>
  <form onSubmit={handleSubmit} className="space-y-4">
    <div>
      <label htmlFor="name" className="block text-gray-700">
        Name:
      </label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={handleNameChange}
        className="border border-gray-300 rounded-md w-full py-2 px-3 mt-1 text-black"
      />
    </div>
    <div>
      <label htmlFor="description" className="block text-gray-700">
        Description:
      </label>
      <input
        type="text"
        id="description"
        value={description}
        onChange={handleDescriptionChange}
        className="border border-gray-300 rounded-md w-full py-2 px-3 mt-1 text-black"
      />
    </div>
    <div>
      <label htmlFor="price" className="block text-gray-700">
        Price:
      </label>
      <input
        type="text"
        id="price"
        value={price}
        onChange={handlePriceChange}
        className="border border-gray-300 rounded-md w-full py-2 px-3 mt-1 text-black"
      />
    </div>
    <button
      type="submit"
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex w-full justify-center items-center"
    >
      Submit
    </button>
  </form>
</div>

                              
                    
                <div className='w-2/3 mx-auto flex justify-center items-center'>
                    <button onClick={() => signOut()} className='bg-red-500 rounded-md text-2xl px-10 py-1 mb-4'>Log out</button>
                </div>

                <div className='absolute top-0 right-0 bg-green-500 px-2 py-1 rounded-tr-2xl text-2xl rounded-bl-md'>Balance: {balance}$</div>

        </motion.div>
        </div>
    )
}

export default ClientAddJobs