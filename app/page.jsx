"use client";
import Image from 'next/image'
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';



export default function Home() {
  const router = useRouter();
  const Button = 'w-full p-2 text-black px-10 rounded-xl';
  const inActiveButton = `${Button} bg-gray-700 cursor-not-allowed`;
  const ActiveButton = `${Button} bg-slate-300`;
  const [selectedOption, setSelectedOption] = useState('');
  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };
  const handleDiv1Change = () => {
    setSelectedOption('option1')
  }
  const handleDiv2Change = () => {
    setSelectedOption('option2')
  }
  
 
  return (
    <div className='flex flex-col gap-16 items-center justify-center h-screen w-full'>
      <motion.h1 initial={{ y: '-100vw' }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 120 }}
        className='text-5xl font-bold'>HELLO!</motion.h1>
      <motion.div
        initial={{ y: '-100vw' }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 120 }}
        className='w-[60%] h-[60%] border border-slate-400 rounded-2xl shadow-slate-500 relative shadow flex flex-col justify-between p-5 items-center'>

        <h1 className='text-3xl font-semibold'>Join as a client or freelancer</h1>
        <div className='flex items-center justify-center gap-5'>
          <div onClick={handleDiv1Change} className='w-[300px] h-[200px] border border-slate-400 rounded-2xl p-10  relative cursor-pointer flex items-center justify-center'>
            <input
              className='absolute top-2 right-2 h-5 w-5 cursor-pointer'
              type='radio'
              value='option1'
              checked={selectedOption === 'option1'}
              onChange={handleChange}>
            </input>
            <h1 className='text-xl flex justify-center items-center'>
              I&apos;m client, hiring for a project
            </h1>
            {/* kutucuk */}
          </div>
          <div onClick={handleDiv2Change} className='w-[300px] h-[200px] border border-slate-400 rounded-2xl p-10  relative cursor-pointer flex justify-center items-center'>
            {/* kutucuk */}
            <input
              className='absolute top-2 right-2 h-5 w-5 cursor-pointer'
              type='radio'
              value='option2'
              checked={selectedOption === 'option2'}
              onChange={handleChange}>
            </input>
            <h1 className='text-xl flex justify-center items-center'>
              I&apos;m a freelancer, looking for work
            </h1>

          </div>
        </div>
        <div>
          {/* create account */}
          {selectedOption === ''&& (
          <Link href={''} className={inActiveButton}>
          
            Create account
          </Link>
          )
          }
          {selectedOption === 'option1'&& (
          <Link href={'clientRegister'} className={ActiveButton}>
          
            Create account
          </Link>
          )
          }
          {selectedOption === 'option2'&& (
          <Link href={'freelanceRegister'} className={ActiveButton}>
          
            Create account
          </Link>
          )
          }

        </div>
        <div>
          {/* already */}
          <h1 className='text-sm '>Already have an account? <Link className='underline font-semibold text-blue-500' href={'/login'}>Log in</Link> </h1>
        </div>

      </motion.div>
    </div>
  )
}
