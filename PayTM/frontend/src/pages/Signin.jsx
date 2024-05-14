import Warning from "../components/Warning"
import Button from "../components/Button"
import Heading from "../components/Heading"
import InputBox from "../components/InputBox"
import SubHeading from "../components/SubHeading"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Signin(){
  const navigate=useNavigate();
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    return <div className="bg-slate-300 flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox placeholder="harkirat@gmail.com" onChange={(e)=>{
          setUsername(e.target.value)
        }} label={"Email"} />
        <InputBox placeholder="123456" label={"Password"} onChange={(e)=>{
          setPassword(e.target.value)
        }} />
        <div className="pt-4">
          <Button onClick={async ()=>{
            const response=await axios.post("http://localhost:3000/api/v1/user/signin",{
              username,password
            });
            localStorage.setItem("token",response.data.token)
            alert(response.data.msg);
            navigate("/dashboard")
          }} label={"Sign in"} />
        </div>
        <Warning label={"Don't have an account?"} linkText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
}
