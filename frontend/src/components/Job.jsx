import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'


const Job = ({job}) => {
    const navigate = useNavigate();

    const daysAgoFunc = (mongodbTime)=>{
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDiff = currentTime - createdAt;
        return Math.floor(timeDiff / (1000*24*60*60));
    }
 
   
  return (
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
        <div className="flex items-center justify-between">
        <p className='text-sm text-gray-600'>{daysAgoFunc(job?.createdAt) === 0 ? "Today" : `${daysAgoFunc(job?.createdAt)}` }</p>
        <Button variant="outline" className="rounded-full" size='icon'><Bookmark/></Button>
        </div>
      

        <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
            <Avatar>
                <AvatarImage  src={job?.company?.logo}/>
            </Avatar>
        </Button>
        <div>
            <h1 className="font-medium text-lg bg-gradient-to-r from-[#3b8ad5] via-[#1c71c6] to-[#0fabd3] bg-clip-text text-transparent">
                {job?.company?.name}</h1>
            <p className="text-sm text-gray-500">India</p>
        </div>

        </div>
        <div>
            <h1 className="font-bold text-lg my-2 bg-gradient-to-r from-[#662d92] via-[#8f306e] to-[#ec1a83] bg-clip-text text-transparent">{job?.title}</h1>
            <p className='italic text-sm text-gray-600'>{job?.description}</p>

        </div>

        <div className=" flex items-center gap-2 mt-4">
        <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.position}</Badge>
        <Badge className={'text-[#500724] font-bold'} variant="ghost">{job?.jobType}</Badge>
        <Badge className={'text-[#3b0764] font-bold'} variant="ghost">{job?.salary}</Badge>
    </div>
    <div className="flex items-center gap-4 mt-4">
    <Button onClick={()=> navigate(`/description/${job?._id}`)} variant="outline">Details</Button>
    <Button className="bg-[#3b0764] hover:bg-[#6b21a8]">Save for later</Button>
    </div>
       
    </div>
   
  )
 
}

export default Job