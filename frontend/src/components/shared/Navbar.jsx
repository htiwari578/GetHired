import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import {Avatar,AvatarFallback,AvatarImage,} from "@/components/ui/avatar"
import { LogOut, User2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import { USER_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { setUser } from '@/redux/authSlice'

const Navbar = () => {
    

    const {user} = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutHandler = async ()=> {
        try   {

          const res = await axios.get(`${USER_API_END_POINT}/logout`,{withCredentials:true});
          if(res.data.success){
            dispatch(setUser(null));
            navigate("/login");
            toast.success(res.data.message);

          }

        }catch(error){
          console.log(error);
          toast.error(error.response.data.message);
        }
    }

  return (
    <div className='bg-white'>
        <div className='flex items-center justify-between mx-auto max-w-7xl  h-16'>
        <div>
        <h1  className="text-2xl font-bold">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-800">Get</span>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3b0764] via-[#9b63cd] to-[#6b21a8] text-shadow-glow">Hired</span>
        </h1>
        </div>

        <div className='flex items-center gap-12'>
            <ul className='flex font-medium items-center gap-5'>
              {
                user && user.role === 'recruiter' ? (
                  <>
                    <li><Link to='/admin/companies' className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#3b0764] via-[#9b63cd] to-[#6b21a8] text-shadow-glow hover:text-purple-500 transition duration-200 ease-in-out">Companies</Link> </li>
                    <li><Link to='/admin/jobs' className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#3b0764] via-[#9b63cd] to-[#6b21a8] text-shadow-glow hover:text-purple-500 transition duration-200 ease-in-out">Jobs</Link> </li>
                  </>
                ) : (
                  <>
                  <li><Link to="/"
                      className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#3b0764] via-[#9b63cd] to-[#6b21a8] text-shadow-glow hover:text-purple-500 transition duration-200 ease-in-out">
                      Home
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/jobs"
                      className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#3b0764] via-[#9b63cd] to-[#6b21a8] text-shadow-glow hover:text-purple-500 transition duration-200 ease-in-out"
                    >
                      Jobs
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/browse"
                      className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#3b0764] via-[#9b63cd] to-[#6b21a8] text-shadow-glow hover:text-purple-500 transition duration-200 ease-in-out"
                    >
                      Browse
                    </Link>
                  </li>



                   
                  </>

                )
              }
               
               
            </ul>
            {!user ? (
                    <div className='flex items-center gap-2'>
                        <Link to ='/login'><Button variant="outline">Login</Button></Link>
                        <Link to='/signup'><Button className="bg-[#3b0764] hover:bg-[#6b21a8]">Signup</Button></Link>
                        
                        
                        </div>
               ) : (
                <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                </Avatar>
              </PopoverTrigger> 
              <PopoverContent className="w-80">
              <div className=''>
                <div className="flex gap-4 space-y-2">
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.fullname}</h4>
                    <p className="text-sm text-muted-foreground">{user?.profile?.bio}</p>
                  </div>
                </div>
                
                <div className="flex flex-col my-2 text-gray-600">
                  {
                    user && user.role === 'student' && (
                      <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <User2 />
                      <Button variant="link"><Link to='/profile'> View Profile</Link></Button>
                    </div>
                    )
                  }
                 

                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <LogOut />
                    <Button onClick ={logoutHandler}variant="link">Logout</Button>
                  </div>
                </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};


export default Navbar;