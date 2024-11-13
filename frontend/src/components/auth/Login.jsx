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
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'



const Login = () => {
    const [input , setInput] = useState({
         email:"", password:"" ,role:""
    });

    const {loading,user} = useSelector(store => store.auth);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleInput = (e)=>{
        setInput({...input, [e.target.name]:e.target.value});
    }

 

    const submitHandler = async (e)=>{
        e.preventDefault();
       
        try{
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input,{
                headers:{
                    "Content-Type": "application/json"

                },
                withCredentials: true,
            }); 
           
            if(res.data.success){
                dispatch(setUser(res.data.user));
                navigate("/");
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
            <form onSubmit={submitHandler}
             className="w-1/2  rounded-md my-10 shadow-lg">
                <h1 className= 'font-bold text-xl mb-5 text-center text-[#3b0764]'>Login</h1>
             
                <div className="my-2">
                    <Label className="font-bold text-[#3b0764]">Email</Label>
                    <Input 
                        type="email"
                        value={input.email}
                        name="email"
                        onChange={handleInput}
                        placeholder="Enter email here"
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
                       onChange={ handleInput}
                       className="cursor-pointer "
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

                  
                </div>
                {

                loading ? <Button className="w-full my-4"> <Loader2  className='mr-2 h-4 w-4 animate-spin'/>Please wait</Button> : <Button type="submit" className="w-full my-4 bg-[#3b0764] hover:bg-[#6b21a8]">Login</Button>
                }
                
                <span className="italic font-md">Don't have an account? <Link to="/signup" className='text-[#3b0764]'>Signup</Link> </span>
            </form>
        </div>

        </div>
  )
}

export default Login