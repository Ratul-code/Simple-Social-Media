import React, { useState } from "react";
import { useForm } from "../utils/hooks";
import { Link, useNavigate } from "react-router-dom";
import {
  LoginPage,
  BackgroundPng,
  LoginForm,
  InputFields,
  InputWrapper,
  IconWrapper,
  FormHeading,
  FormButton,
  FormInfo,
  ButtonInfo,
  RedirectText,
  Message,
  MessageSection,
} from "../components/StyledLogin";
import {MdOutlineVisibility} from "react-icons/md";
import {MdOutlineVisibilityOff} from "react-icons/md";
import { useAuth } from "../context/AuthContext";
import Axios from "../axios";

const Register = () => {
  const user = useAuth()
  const navigate = useNavigate();
  const initialState = {
    username: "",
    email:"",
    password: "",
    confirmPassword:""
  };
  const [message, setMessage] = useState({
    body: "",
    error: false,
  });
  const [visibility, setVisibility] = useState(false);
  const { formData,setFormData ,handleChange, handleSubmit } = useForm(
    initialState,
    submitCallback
  );
async  function submitCallback (){
    try {
      const {data} = await Axios.post("/auth/register",{
        ...formData
      })
      localStorage.setItem("authToken",data.token);
      user.setUser(data.user);
      navigate("/");
    } catch (err) {
      console.log(err.response.data)
      setTimeout(()=>{
        setMessage({body:"",error:false})
      },4000)
      setMessage({body:err.response.data.error,error:true});
    }
    setFormData(initialState);
  }
  return (
    <LoginPage>
    <BackgroundPng src={require("../assets/images/bg-intro-desktop.png")} />

    <LoginForm onSubmit={handleSubmit}>
      <FormHeading>Register</FormHeading>

      <InputWrapper>
      <InputFields type={"text"} name="username" placeholder={"Username"} autoComplete="off" value={formData.username} onChange={handleChange} />
      </InputWrapper>
      <InputWrapper>
      <InputFields type={"email"} name="email" placeholder={"Email"} autoComplete="off" value={formData.email} onChange={handleChange} />
      </InputWrapper>

      <InputWrapper>
        <InputFields
          type={visibility?"text":"password"}
          name="password"
          placeholder={"Password"}
          autoComplete="off"
          required
          value={formData.password} onChange={handleChange} 
        />
        <IconWrapper onClick={()=>{setVisibility(prevState=>!prevState)}} >
        {visibility?<MdOutlineVisibility/>:<MdOutlineVisibilityOff/>}
        </IconWrapper>
      </InputWrapper>
      <InputWrapper>
        <InputFields
          type={visibility?"text":"password"}
          name="confirmPassword"
          placeholder={"Confirm Password"}
          autoComplete="off"
          required
          value={formData.confirmPassword} onChange={handleChange} 
        />
        <IconWrapper onClick={()=>{setVisibility(prevState=>!prevState)}} >
        {visibility?<MdOutlineVisibility/>:<MdOutlineVisibilityOff/>}
        </IconWrapper>
      </InputWrapper>

      <ButtonInfo>
      <MessageSection>
        <Message error={message.error}>{message.body}</Message>
      </MessageSection>
        <FormButton type="submit">SIGN UP</FormButton>

        <FormInfo>
          Already have an account?
          <Link to={"/login"}>
            <RedirectText>Sign in</RedirectText>
          </Link>
        </FormInfo>
      </ButtonInfo>
    </LoginForm>
  </LoginPage>
  );


};

export default Register;
