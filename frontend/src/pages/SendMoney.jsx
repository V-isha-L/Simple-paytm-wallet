import Heading from "../components/Heading"
import InputBox from "../components/InputBox"
import SButton from "../components/SButton"
import { useSearchParams } from 'react-router-dom';
import axios from "axios";
import { useState } from "react";


export default function SendMoney() {

    const [searchParams] = useSearchParams();
    const userId = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount,setAmount] = useState(0);

    return <div className = "bg-slate-300 h-screen flex flex-col items-center justify-center ">
                <div className="bg-white max-w-lg rounded-lg overflow-hidden shadow-lg flex flex-col items-center gap-4 w-full">
                        <Heading label={"Sending Money"} ></Heading>
                        <div className="flex items-center w-full pl-5 shadow-lg">
                            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mr-4 my-10">
                                <div className="flex flex-col justify-center h-full text-xl">{name[0]}</div>
                            </div>    
                            <div>{name}</div> 
                        </div>
                        <InputBox label="Amount" placeHolder="in rupees" onchange={(e) => {
                            setAmount(parseInt(e.target.value))
                        }}></InputBox>
                        <SButton action={"Initiate Transfer"} onchange={() => {
                            axios.post("http://localhost:3000/api/v1/account/transfer",{
                                amount:amount,
                                to:userId
                            },{
                                headers: {
                                    Authorization: "Bearer "+ localStorage.getItem("token")
                                }
                            })
                        }}>
                        </SButton>
                        <div className="py-2"></div>
                </div>
        </div>
}