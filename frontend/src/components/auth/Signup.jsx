import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'

import { RadioGroup} from "@/components/ui/radio-group"
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'



const Signup = () => {

    const [input , setInput] = useState({
        fullname:"", email:"", phoneNumber:"",password:"",role:"",file:"",
    });

    const {loading,user} = useSelector(store => store.auth);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleInput = (e)=>{
        setInput({...input, [e.target.name]:e.target.value});
    }

    const fileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }

    const submitHandler = async (e)=>{
        e.preventDefault();
        const formData = new FormData();  
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }
            try{
            dispatch(setLoading(true));

            const res = await axios.post(`${USER_API_END_POINT}/register`, formData,{
                headers:{
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true,
            })   
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        }catch(error){
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }

    }
    
    useEffect(()=>{
        if(user){
            navigate("/");
        }
    },[])



  return (
    <div>
        <Navbar />
        <div className='flex items-center justify-center max-w-7xl mx-auto'>
            <form onSubmit={submitHandler} className="w-1/2 border-gray-200 rounded-md p-4 my-10">
                <h1 className= 'font-bold text-xl mb-5 text-center text-[#3b0764]'>Sign Up</h1>
                <div className="my-2">
                    <Label className="font-bold text-[#3b0764]">Full Name</Label>
                    <Input 
                    type="text"
                    value={input.fullname}
                    name="fullname"
                    onChange={handleInput}
                    placeholder="Full Name"
                    />
                </div>
                <div className="my-2">
                    <Label className="font-bold text-[#3b0764]">Email</Label>
                    <Input 
                    
                    type="text"
                    value={input.email}
                    name="email"
                    onChange={handleInput}
                    placeholder="Email"
                    />
                </div>
                <div className="my-2">
                    <Label className="font-bold text-[#3b0764]">Phone Number</Label>
                    <Input 
                    type="text"
                    value={input.phoneNumber}
                    name="phoneNumber"
                    onChange={handleInput}
                    placeholder="+99288337777"
                    />
                </div>
                <div className="my-2">
                    <Label className="font-bold text-[#3b0764]">Password</Label>
                    <Input 
                    type="password"
                    value={input.password}
                    name="password"
                    onChange={handleInput}
                    placeholder="password"
                    />
                </div>
                <div className='flex items-center justify-between'>
                    <RadioGroup className='flex items-center gap-4 my-5 font-bold text-[#3b0764]'>
                    <div className="flex items-center space-x-2">
                        <Input 
                        type="radio"
                        name="role"
                        value="student"
                        checked={input.role === 'student'}
                        onChange={handleInput}
                        className="cursor-pointer"
                        />
                        <Label htmlFor="option-one">Student</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                    <Input 
                        type="radio"
                        name="role"
                        value="recruiter"
                        checked={input.role === 'recruiter'}
                        onChange={handleInput}
                        className="cursor-pointer"
                        />
                        <Label htmlFor="option-two">Recruiter</Label>
                    </div>
                    </RadioGroup>

                    <div className="flex items-center gap-2">
                        <Label className="font-bold text-[#3b0764]">Profile</Label>
                        <Input 
                        accept="image/*"
                        type="file"
                        onChange={fileHandler}
                        className="cursor-pointer"
                        />


                    </div>
                </div>

                {

                loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin'/>Please wait</Button> : <Button type="submit" className="w-full my-4 bg-[#3b0764] hover:bg-[#6b21a8]">Signup</Button>
                }       
                <span className="italic">Already have an account? <Link to="/login" className='text-[#3b0764]'>Login</Link> </span>
            </form>
        </div>

        </div>
  )
}

export default Signup