"use client";
import { motion } from 'framer-motion'
import React from 'react'
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useState } from 'react';
import { useUserBalance } from '../../lib/useUserBalance';




const ClientJobs = () => {
    const {data:session, update} = useSession()
    const router = useRouter()
    // const [balance,setBalance] = useState(null)
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [isTakeJobActive,setIsTakeJobActive] = useState(false)
    const balance = useUserBalance(session, jobs);
    const [search, setSearch] = useState("") 
    const [giveBidMenu,setGiveBidMenu] = useState(false)
    const [bidAmount, setBidAmount] = useState(0);
    const [bidDescription,setBidDescription] = useState("")
    // useEffect(() => {
    //     if (!session || !session.user) return;

    //     setBalance(session.user.balance);
    // }, [session])

    // const takeTheJob = (index) => {
    //     console.log("index: ", index)
    //     console.log(jobs)
    //     setIsTakeJobActive(!isTakeJobActive)
    // }

    // useEffect(() => {
    //     if (!session || !session.user) return;
    //     fetch('/api/getUserBalance', {
    //         method: 'POST',
    //         body: JSON.stringify({ id: session.user._id })
    //     })
    //     .then(res => res.json())
    //     .then(data => setBalance(data.balance))
    //     .catch(console.error);
    // }, [session, jobs]);
   const GiveBidMenu = () => {
    setGiveBidMenu(!giveBidMenu)
   }
   
   const handleInputChangeAmount = (e) => {
    setBidAmount(e.target.value);
    };
   const handleInputChangeDescription = (e) => {
    setBidDescription(e.target.value);
    };
    
    const handleSubmitBid = async (id,bidAmount,bidDescription) => {

        console.log(bidDescription)
        try {
            const response = await fetch(`/api/addJob?id=${id}`, {
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    bid: true, 
                    bidAmount: bidAmount, 
                    bidDescription :bidDescription,
                }),
            });
    
            const data = await response.json();
            console.log("asdasdasd: ",data);
            
            GiveBidMenu(); 
        } catch (error) {
            console.error('Veritabanı Güncelleme Hatası:', error);
        }
        
    };
        
        ; 
    
        const handleGoBack = () => {
            router.back(); // Geri gitmek için router'ın back() yöntemini kullanıyoruz
          };
    const JobComplete = async (id,price) => {
        // alert("Success!")
        try {
            const jobPrice = parseInt(price); 
          
            const currentBalance = parseInt(balance); 
    
            if (!isNaN(jobPrice) && !isNaN(currentBalance)) {
                const updatedBalance = currentBalance + jobPrice; 
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

                // const data = await res.json();
                // const { user } = data;
                // console.log('updatedUser', user);
                // update({ user });
                // setBalance(user.balance);
                    
                    
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
                body: JSON.stringify({ id }) 
            });            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // const data = await response.json();
            // const { updatedBalance } = data;
            // setBalance(updatedBalance);
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
                console.log("jobs: ",jobs)
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };

        fetchJobs();
    }, []);
    const handleSearch = (e) =>{
        e.preventDefault()
        setSearch(e.target.value)
        console.log(search)
    }

    useEffect(() => {
        if (!search) {
            setFilteredJobs(jobs);
        } else {

            const filteredJobs = jobs.filter(job =>
                job.name.toLowerCase().includes(search.toLowerCase())
              )
              setFilteredJobs(filteredJobs)
              console.log(jobs)
        }
      }, [search, jobs]);
      const [isTakeJobActiveArray, setIsTakeJobActiveArray] = useState(Array(jobs.length).fill(false));
      const seeBidsFreelancer = () => {
        router.push("/viewBidsFreelancer")
      }
    const takeTheJob = (index) => {
    
        console.log(index)
        const updatedTakeJobActiveArray = [...isTakeJobActiveArray]; 
        updatedTakeJobActiveArray[index] = !updatedTakeJobActiveArray[index]; 
        setIsTakeJobActiveArray(updatedTakeJobActiveArray); 
    };
    
    return (
<div className='flex flex-col gap-16 items-center justify-center h-screen w-full text-[#E3E2DF] global-background'>
        
<motion.div
        initial={{ y: '-50vw' }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 120 }}
        className='w-[50%] min-h-[70%] border-2 border-[#9A1750] bg-[#222629] rounded-2xl shadow-[#5D001E] relative shadow-lg flex flex-col justify-between p-5 items-center'>
                
                    
                <form onSubmit={handleSearch} className='w-full flex items-center justify-center gap-2'>
                    <input onChange={(e) => setSearch(e.target.value)}
                            value ={search}
                            type='search' 
                            placeholder='Search Jobs...'
                            className='text-white font-bold rounded-lg bg-gray-700 text-2xl'
                            style={{ border: '2px solid #9A1750' }} >
                                

                    </input>
                    <button type='submit' className='bg-blue-600 hover:bg-blue-700 rounded-md px-2 py-1'>Search</button>

                </form>
               
                {jobs.length === 0 && (
                    <div className='flex justify-center items-center'>
                        <h1 className='text-4xl font-bold'>There is no available job</h1>
                    </div>
                )}
                {jobs.length !== 0 && (

                
                <div className='min-w-[60%]'>
                    <h2 className="text-white text-2xl font-bold mb-4 flex justify-center items-center">Jobs:</h2>
                    <ul className="text-white">

        {!filteredJobs && jobs.map((job,index) => (
            <li key={job._id} className="bg-gray-800 rounded-md p-4 my-2 relative">
                <p className="text-xl font-semibold">Name: {job.name}</p>
                <p className="text-lg">Description: {job.description}</p>
                <p className="text-lg">Price: {job.price}</p>
                {/* {!isTakeJobActive && (
                <button id={`takeJobBtn-${index}`} onClick={() => takeTheJob(index)} className='bg-green-500 text-white rounded-md text-xl px-4 py-1 absolute top-0 right-0 '>Take the Job</button>
                )} */}
                 {!isTakeJobActiveArray[index] && (
                    <button onClick={() => takeTheJob(index)} className='bg-green-500 text-white rounded-md text-xl px-4 py-1 absolute top-0 right-0 '>Take the Job</button>
                )}
                {/* {isTakeJobActive && (
                    <div className='flex justify-center absolute top-0 right-0'>
                    <button onClick={() => JobComplate(job._id,job.price)} id={`jobCompleteBtn-${index}`} className='bg-green-700 text-white rounded-md text-xl px-4 py-1  '>I did!</button>
                    <button onClick={() => takeTheJob(index)} className='bg-red-500 text-white rounded-md text-xl px-4 py-1'>Back</button>
                    </div>
                )} */}
                {isTakeJobActiveArray[index] && (
                <div className='flex justify-center absolute top-0 right-0'>
                <button onClick={() => GiveBidMenu()} className='bg-green-700 text-white rounded-md text-xl px-4 py-1  '>Give Bid!</button>
                <button onClick={() => takeTheJob(index)} className='bg-red-500 text-white rounded-md text-xl px-4 py-1'>Back</button>
                </div>
                )}
                
            </li>)
        )}
 {(
    filteredJobs.map((job,index) => (
       <li key={job._id} className="bg-gray-700 rounded-md p-4 my-2 relative">
           <p className="text-xl font-semibold">Name: {job.name}</p>
           <p className="text-lg">Description: {job.description}</p>
           <p className="text-lg">Price: {job.price}</p>
           <p className="text-lg">Bid Status: {job.bid ? "True" : "False"}</p>
           <p className="text-lg">Bid Amount: {job.bidAmount}</p>
           {!isTakeJobActiveArray[index] && !job.bid && (
           <button id={`takeJobBtn-${index}`} onClick={() => takeTheJob(index)} className='bg-green-500 text-white rounded-md text-xl px-4 py-1 absolute top-0 right-0 '>Take the Job</button>
           )}
           {job.bid && (
               <button id={`takeJobBtn-${index}`} onClick={() => JobComplete(job._id,job.price)} className='bg-green-500 text-white rounded-md text-xl px-4 py-1 absolute top-0 right-0 '>Complete!</button>

           )}
           {isTakeJobActiveArray[index] && (
       <div className='flex flex-col justify-center absolute top-0 right-0'>
       <button onClick={() => GiveBidMenu()} id={`jobCompleteBtn-${index}`} className='bg-green-700 text-white rounded-md text-xl px-4 py-1  '>Give Bid!</button>
       <button onClick={() => takeTheJob(index)} className='bg-red-500 text-white rounded-md text-xl px-4 py-1'>Back</button>
       </div>
       )}
          {giveBidMenu && (
       <>
           <div onClick={() => GiveBidMenu()} className="fixed inset-0 bg-black/90 rounded-xl"></div>
           <div className="fixed z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
               <div className="bg-gray-700 p-4 rounded-lg">
                   <input
                       type="number"
                       value={bidAmount}
                       onChange={handleInputChangeAmount}
                       className="w-full px-3 py-2 rounded-md bg-gray-300 text-gray-800"
                       placeholder="Bid Amount"
                       name="bidAmount"
                   />
                   <input
                   type="text"
                   value={bidDescription}
                   onChange={handleInputChangeDescription}
                   className="w-full px-3 py-2 rounded-md bg-gray-300 text-gray-800"
                   placeholder="Bid Description"
                   name="bidDescription"
                   
                   />
                   <button
                       onClick={()=>handleSubmitBid(job._id,bidAmount,bidDescription)}
                       className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md w-full mx-auto"
                   >
                       Give Bid
                   </button>
               </div>
           </div>
       </>
   )}
       </li>))
                )}

                    </ul>
                </div>
            )}

                    
<div className='w-2/3 mx-auto flex justify-center mt-2 gap-2 items-center'>
  <button
    onClick={() => signOut()}
    className='rounded-md text-xl px-10 py-2'
    style={{ backgroundColor: 'rgba(164, 6, 6, 0.7)' }}
  >
    Log out
  </button>
  <button
    onClick={handleGoBack}
    className='bg-gray-700 text-white px-10 text-xl py-2 rounded-md'
  >
    Go back
    
  </button>    
  </div>
        <div className='absolute top-0 right-0 px-2 py-1 rounded-tr-2xl text-2xl rounded-bl-md'style={{ backgroundColor: 'rgba(75, 163, 63, 0.7)' }}>Balance: {session?.user?.balance}$</div>

        </motion.div>
        </div>
          )
                   }

export default ClientJobs