import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

const companyArr = [];

const PostJob = () => {
    const [input , setInput] = useState({
        title:"",
        description:"",
        requirements:"",
        salary:"",
        location:"",
        jobType:"",
        experience:"",
        position:0,
        companyId:""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {companies} = useSelector (store=>store.company);

    const changeEventHandler = (e) => {
       setInput({...input , [e.target.name]: e.target.value});

    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company)=> company.name.toLowerCase() === value);
        if (selectedCompany) {
            setInput({...input, companyId: selectedCompany._id });
          }
        };

    const submitHandler = async (e) => {
        e.preventDefault();
        
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input,{
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            });
            if(res.data.success){
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response.data.message);
            
        }finally{
            setLoading(false);
        }
    }
  return (
    <div >
        <Navbar  /> 
        <div className="flex  items-center justify-center w-screen my-8 "> 
           <form onSubmit={submitHandler} className="p-8 max-w-4xl bg-gradient-to-br from-[#d7b6de] via-[#580c69] to-[#9b63cd] rounded-lg shadow-lg border border-gray-300">
           <div className="grid grid-cols-2 gap-2  ">
            <div>
                <Label className="font-bold text-[#f0eff0]">Title</Label>
                <Input 
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                />
            </div>
            <div>
                <Label className="font-bold text-[#f0eff0]">Description</Label>
                <Input 
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                />
            </div>
            <div>
                <Label className="font-bold text-[#f0eff0]">Requirment</Label>
                <Input 
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                />
            </div>
            <div>
                <Label className="font-bold text-[#f0eff0]">Salary</Label>
                <Input 
                type="text"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                />
            </div>
            <div>
                <Label className="font-bold text-[#f0eff0]">Location</Label>
                <Input 
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                />
            </div>
            <div>
                <Label className="font-bold text-[#f0eff0]">Job Type</Label>
                <Input 
                type="text"
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                />
            </div>
            <div>
                <Label className="font-bold text-[#f0eff0]">Experience</Label>
                <Input 
                type="text"
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                />
            </div>
            <div>
                <Label className="font-bold text-[#f0eff0]">No of Position</Label>
                <Input 
                type="text"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                />
            </div>
           
          
            {
                companies.length > 0 && (
                    <Select onValueChange={selectChangeHandler}>
                    <SelectTrigger className="w-[180px] font-medium ">
                      <SelectValue placeholder="Select Company" className="font-bold" />
                    </SelectTrigger>
                    <SelectContent>
                        {
                            companies.map((company) => {
                                return (
                                    <SelectItem value={company?.name?.toLowerCase()} className="font-medium">{company.name}</SelectItem>
                                )
                            })
                        }
                    
                    </SelectContent>
                  </Select>
                  
                )
            }
           </div>
          
           {

            loading ? <Button className="w-full my-4"> <Loader2  className='mr-2 h-4 w-4 animate-spin'/>Please wait</Button> : <Button type="submit" className="w-full my-4 bg-[#3b0764] hover:bg-[#6b21a8]">Post new Job</Button>
            }
           {
            companies.length === 0 && <p className="italic text-red-900 font-serif text-center my-3">🤦‍♂️Before posting job,make sure you have registered company first.</p>
           }
           </form>
        </div>
    </div>
  )
}

export default PostJob