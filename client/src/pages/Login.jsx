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
import { MdOutlineVisibility } from "react-icons/md";
import { MdOutlineVisibilityOff } from "react-icons/md";
import { useAuth } from "../context/AuthContext";
import Axios from "../axios";

const Login = () => {
  const user = useAuth()
  const navigate = useNavigate();
  const initialState = {
    username: "",
    password: "",
  };
  const [message, setMessage] = useState({
    body: "",
    error: false,
  });
  const [visibility, setVisibility] = useState(false);

  const { formData,setFormData, handleChange, handleSubmit } = useForm(
    initialState,
    loginCallback
  );

  async function loginCallback() {
    try {
      const { data } = await Axios.post("/auth/login", {
        ...formData,
      },{withCredentials: true});
      localStorage.setItem("authToken", data.token);
      user.setUser(data.user);
      navigate("/");
    } catch (err) {
      
      setTimeout(()=>{
        setMessage({body:"",error:false});
      },4000)
      setMessage({body:err.response.data.error,error:true})
    }
    setFormData(initialState);
    
  }
  return (
    <LoginPage>
      <BackgroundPng src={require("../assets/images/bg-intro-desktop.png")} />

      <LoginForm onSubmit={handleSubmit}>
        <FormHeading>Login</FormHeading>
        <InputWrapper>
          <InputFields
            type={"text"}
            name="username"
            placeholder={"Username"}
            value={formData.username}
            onChange={handleChange}
            required
            autoFocus
            autoComplete="off"
          />
        </InputWrapper>
        <InputWrapper>
          <InputFields
            type={visibility ? "text" : "password"}
            name="password"
            placeholder={"Password"}
            value={formData.password}
            onChange={handleChange}
            required
          />
          <IconWrapper
            onClick={() => {
              setVisibility((prevState) => !prevState);
            }}
          >
            {visibility ? <MdOutlineVisibility /> : <MdOutlineVisibilityOff />}
          </IconWrapper>
        </InputWrapper>

        <ButtonInfo>
        <MessageSection>
          <Message error={message.error}>{message.body}</Message>
        </MessageSection>
          <FormButton type="submit">SIGN IN</FormButton>

          <FormInfo>
            Dont have an account?
            <Link to={"/register"}>
              <RedirectText>Sign up</RedirectText>
            </Link>
          </FormInfo>
          <FormInfo>
            Forgotten Password?
            <Link to={"/register"}>
              <RedirectText>Reset now</RedirectText>
            </Link>
          </FormInfo>
        </ButtonInfo>
      </LoginForm>
    </LoginPage>
  );
};
export default Login;
