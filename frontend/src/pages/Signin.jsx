import Heading from "../components/Heading"
import SubHeading from "../components/SubHeading"
import InputBox from "../components/InputBox"
import SButton from "../components/SButton"
import BottomWarning from "../components/BottomWarning"

export default function Signin() {
    return (
        <div className = "bg-slate-300 h-screen flex flex-col items-center justify-center ">
              <div className="bg-white max-w-lg rounded-lg overflow-hidden shadow-lg flex flex-col items-center gap-4 w-full">
                <Heading label={"Sign In"} ></Heading>
                <SubHeading label ="Enter your credentials to sign in to your account" ></SubHeading>
                <InputBox label="Email" placeHolder="johndoe123@gmail.com"></InputBox>
                <InputBox label="Password" placeHolder="Your Password..."></InputBox>
                <SButton action={"Sign In"}></SButton>
                <BottomWarning warning={"Don't have an account ? "} text={"Sign Up"} to={"/signup"}></BottomWarning>
              </div>
            </div>
    )
}