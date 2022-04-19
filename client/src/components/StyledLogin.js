import styled from "styled-components";

export const LoginPage = styled.div`
  width: 100vw;
  height: 100vh;
  background: gray;
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const BackgroundPng = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  z-index: 3;
`;
export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
  padding: 1rem;
  margin-top: -4vh;
  width: 68vw;
  max-height: 600px;
  //   height: 70vh;
  background: white;
  border-radius: 10px;
  z-index: 3;
  @media (min-width: 1200px) {
    width: 40vw;
    padding: 1.5vw;
  }
`;

export const FormHeading = styled.h1`
  font-size: 1.8rem;
  font-weight: 600;
  letter-spacing: 4px;
  margin-bottom: 10px;
`;
export const InputFields = styled.input`
    border:1px solid hsl(249, 10%, 26%) ;
    height:48px;
    width:100%;
    padding:0 20px;
    font-size:1.2rem;
    font-weight:800;
    color:hsl(249, 10%, 26%) ;
    border-radius:7px;
    @media (min-width: 1200px) {
    height: 60px; 
    }
`;
export const ButtonInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 5px;
  margin-bottom: 3%;
`;
export const FormButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 48px;
  color: #fff;
  background: hsl(154, 59%, 51%);
  background: #ff8100;
  background: #002884;
  font-size: 1.3rem;
  font-weight: 600;
  letter-spacing: 2px;

  &:hover {
    cursor: pointer;
  }
  @media (min-width: 1200px) {
    height: 60px;
  }
`;
export const FormInfo = styled.p`
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 1px;
  @media (min-width: 1200px) {
    font-size: 1.3rem;
  }
`;
export const RedirectText = styled.span`
  font-weight: 600;
  text-decoration: underline;
  &:hover {
    cursor: pointer;
  }
`;
export const MessageSection = styled.div`
  margin-top: -3%;
  margin-left: 2%;
  font-size: 1.2rem;
  font-weight: 600;
  letter-spacing: 1px;
  display: flex;
  justify-content: left;
  width: 100%;
`;
export const Message = styled.p`
  color: ${({ error }) => (error ? "red" : "hsl(154, 59%, 51%)")};
`;
export const InputWrapper = styled.div`
  width: 100%;
  position: relative;
`;
export const IconWrapper = styled.div`
  position: absolute;
  font-size: 2rem;
  top: 10px;
  right: 12px;
  &:hover {
    cursor: pointer;
  }
  @media (min-width: 1200px) {
    top: 14px;
    right: 12px;
  }
`;

