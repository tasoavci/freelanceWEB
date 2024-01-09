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
    
    const handleGoBack = () => {
      router.back(); 
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
                    price,
                    ownerId:session?.user?._id,
                    bid:false,
                    bidAmount:0,
                    bidDescription: ' ',
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
    //     try {
    //     const jobPrice = parseInt(price); // Girilen fiyatı sayıya dönüştürün
    //     const currentBalance = parseInt(balance); // Mevcut bakiyeyi sayıya dönüştürün

    //     if (!isNaN(jobPrice) && !isNaN(currentBalance)) {
    //         const updatedBalance = currentBalance - jobPrice; // Fiyatı mevcut bakiyeden çıkarın
    //         const res = await fetch('/api/updateBalance', {
    //             method: "PUT",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify({
    //                 id: session?.user?._id,
    //                 balance: updatedBalance
    //             })
    //         });

    //         if (res.ok) {
    //             console.log("Balance updated successfully");
    //             e.target.reset();
    //             router.push("/clientJobs");
    //         } else {
    //             console.log("Updating balance failed");
    //         }
    //     } else {
    //         console.log("Invalid price or balance");
    //     }
    // } catch (error) {
    //     console.error("Error during updating balance:", error);
    
    // };
  }
      
   
    return (
<div className='flex flex-col gap-16 items-center justify-center h-screen w-full text-[#E3E2DF] global-background'>
        
<motion.div
        initial={{ y: '-50vw' }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 120 }}
        className='w-[50%] h-[70%] border-2 border-[#9A1750] bg-[#222629] rounded-2xl shadow-[#5D001E] relative shadow-lg flex flex-col justify-between p-5 items-center'>
                <div className='pt-3 flex justify-center items-center w-full'>
                    <h1 className='text-3xl font-bold'>Welcome Client!</h1>
                </div>

                <div className="max-w-md mx-auto mt-10">
                    <h1 className='text-2xl text-center font-bold'>Add job:</h1>
  <form onSubmit={handleSubmit} className="space-y-4">
    <div>
      <label htmlFor="name" className="block">
        Name:
      </label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={handleNameChange}
        className="border rounded-md w-full py-2 px-3 mt-1 text-black bg-gray-700"
        style={{ border: '2px solid #9A1750' }}
      />
    </div>
    <div>
      <label htmlFor="description" className="block">
        Description:
      </label>
      <input
        type="text"
        id="description"
        value={description}
        onChange={handleDescriptionChange}
        className="border rounded-md w-full py-2 px-3 mt-1 text-black bg-gray-700"
        style={{ border: '2px solid #9A1750' }}
      />
    </div>
    <div>
      <label htmlFor="price" className="block">
        Price:
      </label>
      <input
        type="text"
        id="price"
        value={price}
        onChange={handlePriceChange}
        className="border rounded-md w-full py-2 px-3 mt-1 text-black bg-gray-700"
        style={{ border: '2px solid #9A1750' }}
      />
    </div>
    <button
      type="submit"
      className="blue-button text-white font-bold py-2 px-4 rounded flex w-full justify-center items-center"
    >
      Submit
    </button>
  </form>
</div>

                              
                    
<div className='w-2/3 mx-auto flex flex-col items-center'>
  <button
    onClick={() => signOut()}
    className='rounded-md text-xl px-10 py-1 mb-2'
    style={{ backgroundColor: 'rgba(164, 6, 6, 0.7)' }}
  >
    Log out
  </button>
  <button
    onClick={handleGoBack}
    className='bg-gray-700 text-white px-8 py-2 rounded-md'
  >
    Go back
  </button>
</div>
                <div className='absolute top-0 right-0 px-2 py-1 rounded-tr-2xl text-2xl rounded-bl-md'style={{ backgroundColor: 'rgba(75, 163, 63, 0.7)' }}>Balance: {balance}$</div>

        </motion.div>
        </div>
    )
}

export default ClientAddJobs