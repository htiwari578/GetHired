import React, { useState } from 'react'
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const [query, setQuery]=  useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchHandler = () => {
    dispatch(setSearchQuery(query));
    navigate("/browse");
    
  }
  return (


    <div className="text-center">
        <div className='flex flex-col gap-5 my-10'>
        <span className="mx-auto italic  px-4 py-2 rounded-full
        bg-white text-[#39134a] font-medium">Simplify Hiring,Amplify Growth</span>

      <h1 className="text-5xl font-bold">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-blue-900">
          Unlock Your Next
        </span>
        <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b176e2] to-[#3b0764]">
          Opportunity With{" "}
        </span>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-800">
          Get
        </span>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3b0764] via-[#9b63cd] to-[#6b21a8] glow-text">
          Hired
        </span>
      </h1>
      <p className="mt-6 text-sm italic text-[#6b21a8]">
          where talents meet Opportunity
        </p>       

     


        <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
            <input 
            type="text"
            placeholder="Start your job search today"
            onChange={(e) => setQuery(e.target.value)}
            className="outline-none border-none w-full"
            
            />
          <Button onClick={searchHandler} className="relative rounded-r-full bg-gradient-to-r from-[#3b0764] via-[#9b63cd] to-[#6b21a8] text-white glow-text p-3">
            <Search className="h-5 w-5 text-black" />
          </Button>


           
        </div>
           
        </div>

        </div>
  )
}

export default Hero;