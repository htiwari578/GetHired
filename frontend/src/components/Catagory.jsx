import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '@/redux/jobSlice'



const category = [
    "Frontend Developer",
    "Software Developer",
    "Backend Developer",
    "Data Analyst",
    "Graphic Designer",
    "Buisness Analyst",
    "Sales Manager"

]

const Catagory = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchHandler = (query) => {
        dispatch(setSearchQuery(query));
        navigate("/browse");
        
      }
  return (
    <div>
        <Carousel className="w-full max-w-xl mx-auto my-20" >
            <CarouselContent >
                {
                   category.map((cat,index)=>(
                    <CarouselItem className ="md:basis-1/2 lg-basis-1/3" >
                        <Button onClick={()=>searchHandler(cat)} variant="outline" className="rounded-full">{cat}</Button>

                    </CarouselItem>
                   ))
                }
              
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    </div>
  )
}

export default Catagory;