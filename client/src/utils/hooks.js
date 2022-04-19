import React,{useState} from 'react';

export function useForm(initialState={},cb=()=>{}){
    const [formData,setFormData] = useState(initialState)
    const handleChange = (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        cb()
        console.log("after cb")
    }
    return {formData,setFormData,handleChange,handleSubmit}
}