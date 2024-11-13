import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import axios from 'axios';


const  shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    const {applicants} = useSelector(store => store.application);

    const statusHandler = async (status, id) => {
        console.log('called');
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
            console.log(res);
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className="bg-gradient-to-br from-[#d7b6de] via-[#580c69] to-[#9b63cd] p-6 rounded-lg shadow-lg">
            <Table>
                <TableCaption className="italic text-[#f0eff0]">A list of your recent applied user</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-[#f0eff0]">FullName</TableHead>
                        <TableHead className="text-[#f0eff0]">Email</TableHead>
                        <TableHead className="text-[#f0eff0]">Contact</TableHead>
                        <TableHead className="text-[#f0eff0]">Resume</TableHead>
                        <TableHead className="text-[#f0eff0]">Date</TableHead>
                        <TableHead className="text-right text-[#f0eff0]">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                       applicants && applicants?.applications?.map((item) => (
                            <tr key={item._id}>
                                <TableCell className="font-medium text-[#f0eff0]">{item?.applicant?.fullname}</TableCell>
                                <TableCell className="font-medium text-[#f0eff0]">{item?.applicant?.email}</TableCell>
                                <TableCell className=" font-medium text-[#f0eff0]">{item?.applicant?.phoneNumber}</TableCell>
                                <TableCell  >
                                    {
                                        item.applicant?.profile?.resume ? <a className="text-blue-600 cursor-pointer" href={item?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer">{item?.applicant?.profile?.resumeOriginalName}</a> : <span>NA</span>
                                    }
                                </TableCell>
                                <TableCell className=" font-medium text-[#f0eff0]">{item?.applicant.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="float-right cursor-pointer" >
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            {
                                                shortlistingStatus.map((status, index) => {
                                                    return (
                                                        <div onClick={() => statusHandler(status, item?._id)} key={index} className='flex w-fit items-center my-2 cursor-pointer'>
                                                            <span className="text-[#a126a1]">{status}</span>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </PopoverContent>
                                    </Popover>

                                </TableCell>

                            </tr>
                        ))
                    }

                </TableBody>

            </Table>
        </div>
    )
}




export default ApplicantsTable