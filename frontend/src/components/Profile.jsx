import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar } from './ui/avatar'
import { AvatarImage } from '@radix-ui/react-avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog '
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'




// const skills = ["Java","React","JavaScript"];
const isResume = true;

const Profile = () => {
    useGetAppliedJobs();

    const [open , setOpen]= useState(false);
    const {user} = useSelector( store => store.auth);

    
  return (
    <div >
        <Navbar />
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#d7b6de] via-[#652a72] to-[#9b63cd] p-6 rounded-lg shadow-lg">
        
       
            <div className="flex justify-between">
            <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
                <AvatarImage src="https://st2.depositphotos.com/1065578/7533/i/450/depositphotos_75333451-stock-photo-abstract-geometric-company-logo.jpg"
                alt="profile" />
               
            </Avatar>
            <div>
            <h1 className="text-[#f0eff0] font-medium text-xl">{user?.fullname}</h1>
            <p className="italic text-[#f0eff0]">{user?.profile?.bio}</p>
            </div>
           

            </div>
            <Button onClick={()=> setOpen(true)}className="text-right" variant="outline"><Pen/></Button>
            </div>
            <div className="my-5">
                <div className="flex items-center gap-3 my-2">
                <Mail className="text-[#f0eff0]"/>
                <span  className="italic text-[#f0eff0]">{user?.email}</span>
                </div>
                <div className="flex items-center gap-3 my-2">
                <Contact  className="text-[#f0eff0]"/>
                <span className="italic text-[#f0eff0]">{user?.phoneNumber}</span>
                </div>
            </div>
            <div className="my-5">
                <h1 className="text-[#f0eff0] text-md font-bold">Skills</h1>
                <div className="flex items-center gap-1">
                {
                  user?.profile?.skills.length !== 0  ? user?.profile?.skills.map((item,index)=> <Badge key={index}
                  className="bg-transparent text-[#f7f3f8] p-2 rounded-md shadow-md hover:bg-white hover:text-[#dd5197] cursor-pointer transition-all duration-200">{item}</Badge>) : <span>NA</span>
                }

                </div>
              
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label className=" text-[#f0eff0] text-md font-bold">Resume</Label>
                {
                    isResume ? <a target="blank" href={user?.profile?.resume} className="text-blue-500 w-full hover:underline
                    cursor-pointer">{user?.profile?.resumeOriginalName}</a> : <span>NA</span>
                }

            </div>
        </div>
        
        <div className="max-w-4xl mx-auto bg-white rounded-2xl">
                <h1 className="font-bold text-lg my-5 text-[#3b0764]">Applied Jobs</h1>
                <AppliedJobTable />

            </div>
            <UpdateProfileDialog  open={open} setOpen={setOpen}/>
    </div>

  )
}

export default Profile