import React, { useEffect } from 'react'
import AppBar from "../components/AppBar"
import Balance from "../components/Balance"
import Users from "../components/Users"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate=useNavigate();
  useEffect(()=>{
    const token=localStorage.getItem("token");
    if(!token){
      alert("You need to Signup/Signin first!");
      navigate("/signup")
    }
    else{
      
        axios.get("http://localhost:3000/api/v1/verify",{
        headers:{Authorization:token}
      }).then((response)=>{
        alert("welcome back!")
      }).catch((e)=>{
       if(e.response){
        alert("Something went wrong!,please sign in again");
        navigate("/signin");
       }
      })
    }
  },[])
  return (
    <div>
      <AppBar/>
      <Balance/>
      <Users/>
    </div>
  )
}

export default Dashboard
