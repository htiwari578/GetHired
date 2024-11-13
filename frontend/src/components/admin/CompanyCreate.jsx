import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { setSingleCompany } from '@/redux/CompanySlice'
import { useDispatch } from 'react-redux'

const CompanyCreate = () => {

    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState();
    const dispatch = useDispatch();

    const registeredNewCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`,{companyName}, {
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
        })
        if(res?.data?.success){
            dispatch(setSingleCompany(res.data.company));
            toast.success(res.data.message);
            const companyId = res?.data?.company?._id;
            navigate(`/admin/companies/${companyId}`)
        }
        } catch (error) {
            console.log(error);
        }


    }
  return (
    <div>
        <Navbar />
        <div className="max-w-4xl mx-auto ">
            <div className="my-10">

            <h1 className="font-bold text-2xl text-[#3b0764]">Your Company Name</h1>
            <p className="italic text-gray-500 "> what would you like to give your company name?</p>
            </div>

            <Label className="font-bold text-[#3b0764]">Company Name</Label>
            <Input
            type ="text"
            className="my-2"
            placeholder="getHired, Google"
            onChange={(e) => setCompanyName(e.target.value)}

            />
            <div className="flex items-center gap-2 my-10">
                <Button variant="outline" onClick={()=> navigate("/admin/companies")}>Cancel</Button>
                <Button className="bg-[#3b0764]" onClick={registeredNewCompany}>Continue</Button>

            </div>
        </div>
    </div>
  )
}

export default CompanyCreate