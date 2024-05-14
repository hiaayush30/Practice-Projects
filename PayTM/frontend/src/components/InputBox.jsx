import React from 'react'

const InputBox = ({label,placeholder,onChange}) => {
  return (
    <div className='p-2'>
      <div className='text-left'>
      <label className='text-sm font-medium'>{label}</label>
      </div>
      <div className='text-left'>
        <input className='p-1 border rounded' type='text' placeholder={placeholder} onChange={onChange}/>
      </div>
    </div>
  )
}

export default InputBox
