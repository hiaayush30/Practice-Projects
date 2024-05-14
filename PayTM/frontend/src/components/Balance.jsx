import axios from 'axios';
import React, { useState } from 'react'

const Balance = () => {
  const [balance,setBalance]=useState(0);
  const token=localStorage.getItem("token");
  axios.get("http://localhost:3000/api/v1/account/balance",
  {headers:{Authorization:token}}).then((response)=>{
     setBalance(response.data.balance);
  })
  return (
    <div className="flex">
        <div className="font-bold text-lg">
            Your balance
        </div>
        <div className="font-semibold ml-4 text-lg">
            Rs {balance.toFixed(2)}
        </div>
    </div>
  )
}

export default Balance
