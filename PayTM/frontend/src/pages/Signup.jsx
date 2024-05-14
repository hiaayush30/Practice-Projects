import React, { useState } from 'react'
import Heading from '../components/Heading'
import SubHeading from '../components/SubHeading'
import InputBox from '../components/InputBox'
import Button from '../components/Button'
import Warning from '../components/Warning'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const navigate=useNavigate();
  const [username, setUsername] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [password, setpassword] = useState("");
  return (
    <div className="rounded bg-slate-300 flex flex-col justify-center items-center">
      <div className='w-80 text-center bg-white  border rounded p-2'>
        <Heading label={"Sign Up"} />
        <SubHeading label={"Enter your information to create an account"} />
        <InputBox label={"Name"} placeholder={"John"} onChange={(e) => {
          setfirstName(e.target.value)
        }} />
        <InputBox label={"Last Name"} placeholder={"Doe"} onChange={(e) => {
          setlastName(e.target.value);
        }} />
        <InputBox label={"Email"} placeholder={"john@gmail.com"} onChange={(e) => {
          setUsername(e.target.value);
        }} />
        <InputBox label={"Password"} placeholder={"123456"} onChange={(e) => {
          setpassword(e.target.value);
        }} />
        <Button onClick={async () => {
            const res=await axios.post("http://localhost:3000/api/v1/user/signup", {
            username: username,
            lastName: lastName,
            firstName: firstName,
            password: password
          })
          localStorage.setItem("token",res.data.token);
            alert(res.data.msg);
            navigate("/dashboard");
        }} label={"Sign Up"} />
        <Warning label={"Already have an account?"} linkText={"Sign in"} to={"/signin"} />
      </div>
    </div>
  )
}

export default Signup
