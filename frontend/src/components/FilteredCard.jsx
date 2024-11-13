import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '@/redux/jobSlice'


const filterData = [
    {
        filterType:"Location",
        array:["Delhi NCR","Pune","Bangalore","Mumbai","Hyderabad"]
    },

    {
        filterType:"Industry",
        array:["Frontend Developer","Backend Developer","Data Analyst","Java Devloper"]
    },
    {
        filterType:"Salary",
        array:["1-3Lakh","4-8lakh","9-12lakh","13-18lakh","30lakh+"]
    },

]

const FilteredCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();
    const changeHandler =(value) => {
        setSelectedValue(value);
    }
    useEffect(()=>{
       dispatch(setSearchQuery(selectedValue));
    },[selectedValue]);
  return (
    <div className="w-full bg-white p-3 rounded-md">
        <h1 className="font-bold text-lg text-[#a658e2]">Filter Jobs</h1>
        <hr  className="mt-3"/>
        <RadioGroup value={selectedValue} onValueChange ={changeHandler} >
            {
                filterData.map((data, index)=>(
                    <div>
                        <h1 className="font-bold text-lg text-[#3aa8e3]">{data.filterType}</h1>
                        {
                            data.array.map((item, index2)=> {
                                const itemId = `r${index}-${index2}`
                                return(
                                    <div className="flex items-center space-x-2 my-2">
                                        <RadioGroupItem  value={item} id ={itemId}/>
                                        <Label htmfor={itemId}>{item}</Label>
                                    </div>
                                )
                            })
                        }
                    </div>
                ))
            }
        </RadioGroup>
    </div>
  )
}

export default FilteredCard