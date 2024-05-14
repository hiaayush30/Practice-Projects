import React from 'react'
import { Link } from 'react-router-dom'

const Warning = ({label,linkText,to}) => {
  return (
    <div className='text-slate-500'>
      {label}
      <Link className="hover:text-black pointer underline pl-1 cursor-pointer" to={to}>
        {linkText}
      </Link>
    </div>
  )
}

export default Warning
