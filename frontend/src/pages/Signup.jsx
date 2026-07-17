import Heading from "../components/Heading"
import SubHeading from "../components/SubHeading"
import InputBox from "../components/InputBox"
import SButton from "../components/SButton"
import BottomWarning from "../components/BottomWarning"
import { useState } from "react"
import axios from "axios";

export default function Signup() {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className = "bg-slate-300 h-screen flex flex-col items-center justify-center ">
      <div className="bg-white max-w-lg rounded-lg overflow-hidden shadow-lg flex flex-col items-center gap-4 w-full">
        <Heading label={"Sign Up"} ></Heading>
        <SubHeading label ="Enter your information to create an account" ></SubHeading>
        <InputBox label="First Name" placeHolder="John" onchange={e => {setFirstName(e.target.value)}} ></InputBox>
        <InputBox label="Last Name" placeHolder="Doe" onchange={e => {setLastName(e.target.value)}} ></InputBox>
        <InputBox label="Email" placeHolder="johndoe123@gmail.com" onchange={e => {setEmail(e.target.value)}} ></InputBox>
        <InputBox label="Password" placeHolder="Your Password..." onchange={e => {setPassword(e.target.value)}} ></InputBox>
        <SButton action={"Create Account"} onchange={async () =>{
          const response = await axios.post("http://localhost:3000/api/v1/user/signup",{firstName,lastName,email,password});
          localStorage.setItem("token",response.data.token);
        }} ></SButton>
        <BottomWarning warning={"Already have an account ? "} text={"Sign In"} to={"/signin"}></BottomWarning>
      </div>
    </div>
    )
}