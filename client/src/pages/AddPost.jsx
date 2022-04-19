import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Axios from '../axios';
import Appbar from '../components/Appbar'
import { useForm } from '../utils/hooks'

function AddPost() {
    const navigate = useNavigate();
    const {formData,setFormData,handleChange,handleSubmit} = useForm({title:"",body:""},submitCallback);
    const [errormsg,setErrormsg] = useState("");
    const [scsmsg,setScsmsg] = useState("");
    const authToken = localStorage.getItem("authToken");
    async function submitCallback(){
        try {
            await Axios.post("/api/post/create",{
                ...formData
            },{
                withCredentials:true,
                headers:{
                    Authorization:`Bearer ${authToken}`
                }
            });
            setTimeout(()=>{
                setScsmsg("");
            },4000)
            setScsmsg("Succesfully created a post !!");
            navigate("/")
        } catch (error) {
            setTimeout(()=>{
                setErrormsg("");
            },4000)
            setErrormsg(error.response.data.error)
        }
        setFormData({title:"",body:""});


    }
  return (
    <>
    <Appbar/>
    <form onSubmit={handleSubmit} className='py-4 md:px-7 px-3 flex flex-col items-center w-[100%] gap-2'>
        <h2 className='mb-9 text-2xl font-bold' >Create Your Own Post Here</h2>
    <TextField sx={{mb:"20px"}} className='w-[100%] md:w-[80%]' value={formData.title} 
    onChange={handleChange}  name="title" id="outlined-basic" label="Add a title" variant="outlined" />
    <TextField sx={{mb:"10px"}} className='w-[100%] md:w-[80%]' value={formData.body} 
    onChange={handleChange} name="body" id="outlined-basic" label="Add a body" variant="outlined" multiline rows={5} />
    <div className='w-[100%] md:w-[80%] flex flex-col items-start'>
        <p className='texxt-lg text-red-500'>{errormsg}</p>
        <p className='texxt-lg text-[#002884]'>{scsmsg}</p>
    </div>
    <Button type="submit" sx={{width:"100%",'@media screen and (min-width: 768px)': {width:"80%"} }} variant="contained" size="large" color="primary">Add Post</Button>
    </form>
    </>
  )
}

export default AddPost