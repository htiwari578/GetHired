
import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom';
import Footer from './shared/Footer';

const JobCards = ({job}) => {
  const navigate = useNavigate();
  return (
    <div onClick={()=>navigate(`/description/${job._id}`)}  className ='p-5 rounde-md shadow-xl bg-white border-gray-100 cursor-pointer'>
    <div>
     
        <h1 className="font-medium text-lg bg-gradient-to-r from-[#3b8ad5] via-[#821273] to-[#0fabd3] bg-clip-text text-transparent">
          {job?.company?.name}
        </h1>
        <p className=" text-sm text-gray-500">India</p>
    </div>
    <div>
    <h1 className="font-bold text-lg my-2 bg-gradient-to-r from-[#662d92] via-[#8f306e] to-[#ec1a83] bg-clip-text text-transparent">
      {job?.title}
    </h1>
    <p className="italic text-sm text-gray-600">{job?.description}</p>
    </div>
    <div className=" flex items-center gap-2 mt-4">
        <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.position}</Badge>
        <Badge className={'text-[#500724] font-bold'} variant="ghost">{job?.jobType}</Badge>
        <Badge className={'text-[#3b0764] font-bold'} variant="ghost">{job?.salary}</Badge>
    </div>
    
    </div>
  )
}

export default JobCards
