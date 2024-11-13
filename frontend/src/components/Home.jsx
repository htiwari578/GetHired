import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Hero from './Hero'
import Catagory from './Catagory'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'




const Home = () => {
  useGetAllJobs();

  const {user} = useSelector(store => store.auth);

  const navigate = useNavigate();
  // for admin home
  useEffect (()=> {
    if(user?.role === 'recruiter'){
    navigate("/admin/companies");
    }
  
  },[])
  return (
    <div>
    <Navbar/>
    <Hero/>
    <Catagory />
    <LatestJobs />
    <Footer />
    </div>


  )
}

export default Home