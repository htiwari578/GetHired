import { createSlice } from "@reduxjs/toolkit";


const jobSlice = createSlice ({
    name:"job",
    initialState: {
        allJobs : [],
        allAdminJobs:[],
        singleJob:null,
        searchJob:"",
        allAppliedJobs:[],
        searchedQuery:"",
    },

    reducers:{
        setAllJobs :(state, action) => {
            state.allJobs = action.payload;
        },
        setSingleJob:(state, action)=>{
            state.singleJob = action.payload;
        },
        setAllAdminJobs:(state, action)=>{
            state.allAdminJobs = action.payload;
        },
        setSearchJobs:(state,action)=>{
            state.searchJob = action.payload;
        },
        setAllAppliedJobs:(state,action)=>{
            state.allAppliedJobs = action.payload;
        },
        setSearchQuery:(state,action)=>{
            state.searchedQuery = action.payload;
        }
    }
});

export const {setAllJobs, 
    setSingleJob,
     setAllAdminJobs, 
     setSearchJobs, setAllAppliedJobs,setSearchQuery} = jobSlice.actions;
export default jobSlice.reducer;