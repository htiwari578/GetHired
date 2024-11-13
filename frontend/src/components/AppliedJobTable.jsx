import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedJobTable = () => {
    const {allAppliedJobs} = useSelector(store=>store.job);
  return (
    <div className="bg-gradient-to-br from-[#d7b6de] via-[#580c69] to-[#9b63cd] p-6 rounded-lg shadow-lg">
        <Table>
            <TableCaption className="italic text-[#f0eff0]">List of Apllied Jobs</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="text-[#f0eff0]">Date</TableHead>
                    <TableHead className="text-[#f0eff0]">Job Role</TableHead>
                    <TableHead className="text-[#f0eff0]">Company</TableHead>
                    <TableHead className="text-right text-[#f0eff0]">Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    allAppliedJobs.length <= 0  ? <span>You havent applied any job</span> : allAppliedJobs.map((appliedJob)=>(
                        <TableRow key={appliedJob._id}>
                            <TableCell className="font-medium text-[#f0eff0]">{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                            <TableCell className="font-medium text-[#f0eff0]">{appliedJob?.job?.title}</TableCell>
                            <TableCell className="font-medium text-[#f0eff0]">{appliedJob.job?.company?.name}</TableCell>
                            <TableCell className="font-medium text-right text-[#f0eff0]"><Badge className={`${appliedJob?.status === "rejected" ? 'bg-red-400' : appliedJob.status === 'pending' ? 'bg-blue-400' : 'bg-green-400'}`}>{appliedJob.status.toUpperCase()}</Badge></TableCell>

                        </TableRow>
                    ))
                }
            </TableBody>

        </Table>
    </div>
  )
}

export default AppliedJobTable