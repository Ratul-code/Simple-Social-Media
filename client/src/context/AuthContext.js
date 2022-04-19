import React,{ createContext, useContext, useEffect, useState } from "react";
import Axios from "../axios";
import {useNavigate} from "react-router-dom";
const AuthContext = createContext();
const AuthProvider = ({children}) => {
  const navigate = useNavigate();
    const [user,setUser] = useState()
    const [loading,setLoading] = useState(true)
    const fetchUser = async()=>{
        const {data:{user}} = await Axios.get("/auth/",{withCredentials:true});
        if(!user){
          if(localStorage.getItem("authToken")){
            localStorage.removeItem("authToken");
            window.location.reload();
          }
        }else{
          setUser(user);
        }
    }
    const logout = ()=>{
      localStorage.removeItem("authToken");
      navigate("/login")
    }
    useEffect(()=>{
        fetchUser();
        setLoading(prevState=>!prevState)
    },[])
  return (
    <AuthContext.Provider value={{user,setUser,logout,loading,setLoading}}>
        {children}
    </AuthContext.Provider>
  )
}

export const useAuth = ()=>useContext(AuthContext);

export default AuthProvider