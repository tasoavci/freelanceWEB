// firstPage/page.jsx
"use client";
import Image from 'next/image'
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


export default function Home() {
  const router = useRouter();
  const Button = 'w-full p-2 px-10 rounded-xl'; 
  const inActiveButton = `${Button} bg-[#2a353b] cursor-not-allowed text-white`;
  const ActiveButton = `${Button} bg-[#9A1750] text-white`;
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
<div className='flex flex-col gap-16 items-center justify-center h-screen w-full text-[#E3E2DF] global-background'>
      <motion.h1 initial={{ y: '-70vw' }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 120 }}
        className='text-5xl font-bold'>HELLO!</motion.h1>
      <motion.div
        initial={{ y: '-50vw' }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 120 }}
        className='w-[50%] h-[70%] border-2 border-[#9A1750] bg-[#222629] rounded-2xl shadow-[#5D001E] relative shadow-lg flex flex-col justify-between p-5 items-center'>
        <h1 className='text-3xl font-semibold'>Join as a client or freelancer</h1>
        <div className='flex items-center justify-center gap-5'>
      <div onClick={handleDiv1Change} className='glowing-border w-[300px] h-[200px] p-10 relative cursor-pointer flex items-center justify-center'>
        <input
          className='absolute top-2 right-2 h-5 w-5 cursor-pointer'
          type='radio'
          value='option1'
          checked={selectedOption === 'option1'}
          onChange={handleChange}
        />
        <h1 
          style={{ color: '#E3E2DF', fontWeight: 'bold' }} 
          className='text-xl flex justify-center items-center'
        >
          I'm client, hiring for a project
        </h1>
      </div>
      <div onClick={handleDiv2Change} className='glowing-border w-[300px] h-[200px] p-10 relative cursor-pointer flex justify-center items-center'>
        <input
          className='absolute top-2 right-2 h-5 w-5 cursor-pointer'
          type='radio'
          value='option2'
          checked={selectedOption === 'option2'}
          onChange={handleChange}
        />
        <h1 
          style={{ color: '#E3E2DF', fontWeight: 'bold' }}
          className='text-xl flex justify-center items-center'
        >
          I'm a freelancer, looking for work
            </h1>
          </div>
        </div>
        <div>
          {/* create account */}
          {selectedOption === '' && (
          <Link href={''} className={inActiveButton}>
            Create account
          </Link>
          )}
          {selectedOption === 'option1' && (
            <Link href={'/clientRegister'} className={ActiveButton}>
            Create account
          </Link> )}
          {selectedOption === 'option2' && (
            <Link href={'/freelanceRegister'} className={ActiveButton}>
            Create account
          </Link>)}
        </div>
        <div>
          {/* already */}
          <div className='text-sm text-[#5DD001E]'>Already have an account? <Link className='underline font-semibold text-[#9A1750]' href={'/login'}>Log in</Link> </div>
        </div>

      </motion.div>

    </div>
    
  )
}