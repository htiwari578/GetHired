import React from 'react'
import JobCards from './JobCards'
import { useSelector } from 'react-redux'


// const jobList = [1,2,3,4,5,6,7,8,9]

const LatestJobs = () => {
  const {allJobs} = useSelector(store => store.job);
  return (
    <div className="max-w-7xl mx-auto my-20">



<h1 className="text-4xl font-bold">
  <span className="bg-gradient-to-r from-[#3b0764] via-[#9b63cd] to-[#6b21a8] text-transparent bg-clip-text">
    Ready for a Change?
  </span>
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-blue-900">
    See the Newest Jobs Available
  </span>
</h1>


        
        <div className='grid grid-cols-3 gap-4 my-5'>
        {
          allJobs.length <= 0 ? <span>No Job Available</span>  : allJobs?.slice(0,6).map((job) => <JobCards  key={job._id} job={job}/>)

            
        }
        </div>

       
    </div>
  )
}

export default LatestJobs