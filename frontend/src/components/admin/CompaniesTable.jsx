import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const CompaniesTable = () => {
    const {companies,searchCompany} = useSelector(store=>store.company);
    const [filterCompany , setFilterCompany] = useState(companies);
    const navigate = useNavigate();

    useEffect(()=>{
        const filteredCompany = companies.length > 0 ? companies.filter((company)=>{
            if(!searchCompany){
                return true;
            };
            return company?.name?.toLowerCase().includes(searchCompany.toLowerCase());
        })
        : [];
        setFilterCompany(filteredCompany);
    },[companies, searchCompany])
  return (
    <div className="bg-gradient-to-br from-[#d7b6de] via-[#580c69] to-[#9b63cd] p-6 rounded-lg shadow-lg">
        <Table>
            <TableCaption className="italic text-[#f0eff0]">A list of your recent registered companies</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="text-[#f0eff0]">Logo</TableHead>
                    <TableHead className="text-[#f0eff0]">Name</TableHead>
                    <TableHead className="text-[#f0eff0]">Date</TableHead>
                    <TableHead className="text-right text-[#f0eff0]">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
            {
                filterCompany?.map((company) =>  (
                    <tr>
                
               
                    <TableCell>
                        <Avatar>
                            <AvatarImage src={company.logo} />
                        </Avatar>
                    </TableCell>
                    <TableCell className="font-medium text-[#f0eff0]  text-lg">{company.name}</TableCell>
                    <TableCell className="font-medium text-[#f0eff0]  text-lg">{company.createdAt.split("T")[0]}</TableCell>
                    <TableCell className="text-right cursor-pointer">
                        <Popover>
                            <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                            <PopoverContent className="w-32">
                                <div onClick={()=> navigate(`/admin/companies/${company._id}`)} className="flex items-center gap-2 w-fit cursor-pointer">
                                    <Edit2 className="w-4" />
                                    <span className=" italic font-bold text-[#9e2b9e]">Edit</span>
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

export default CompaniesTable