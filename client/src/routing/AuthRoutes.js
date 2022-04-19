import React from 'react'
import {Navigate} from "react-router-dom";

const AuthRoutes = ({children}) => {
    const authToken = localStorage.getItem("authToken");
  return (
    !authToken?children:<Navigate to={"/"} />
  )
}

export default AuthRoutes