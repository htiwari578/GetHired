import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'




const AdminJobsTable = () => {
  const { allAdminJobs, searchJob } = useSelector(store => store.job);
  const [filterJobs, setFilterJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredJobs = allAdminJobs.filter(job => {
      if (!searchJob) return true;
      return job?.title?.toLowerCase().includes(searchJob.toLowerCase()) || 
             job?.company?.name?.toLowerCase().includes(searchJob.toLowerCase());
    });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJob]);
    return (
      <div className="bg-gradient-to-br from-[#d7b6de] via-[#580c69] to-[#9b63cd] p-6 rounded-lg shadow-lg">
          <Table>
              <TableCaption className="italic text-[#f0eff0]">A list of your recent  posted jobs</TableCaption>
              <TableHeader>
                  <TableRow>
                      <TableHead className="text-[#f0eff0]">Company Name</TableHead>
                      <TableHead className="text-[#f0eff0]">Role</TableHead>
                      <TableHead className="text-[#f0eff0]">Date</TableHead>
                      <TableHead className="text-[#f0eff0] text-right">Action</TableHead>
                  </TableRow>
              </TableHeader>
              <TableBody>
                  {
                      filterJobs?.map((job) => (
                          <tr>
                              <TableCell  className="font-medium text-[#f0eff0]  text-lg">{job?.company?.name}</TableCell>
                              <TableCell  className="font-medium text-[#f0eff0]  text-lg">{job?.title}</TableCell>
                              <TableCell  className="font-medium text-[#f0eff0]  text-lg">{job?.createdAt.split("T")[0]}</TableCell>
                              <TableCell className="text-right cursor-pointer">
                                  <Popover>
                                      <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                      <PopoverContent className="w-32">
                                          <div onClick={()=> navigate(`/admin/companies/${job._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                              <Edit2 className='w-4' />
                                              <span className= "italic font-bold text-[#9e2b9e]">Edit</span>
                                          </div>
                                          <div onClick={()=> navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center w-fit gap-2 cursor-pointer mt-2'>
                                              <Eye className='w-4'/>
                                              <span className= "italic font-bold text-[#9e2b9e]">Applicants</span>
                                          </div>
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

export default  AdminJobsTable