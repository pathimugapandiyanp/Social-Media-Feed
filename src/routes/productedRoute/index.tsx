import React from 'react'
import { Navigate, Outlet } from "react-router-dom";
import './index.css'

const ProtectedLayout = () => {
  return (
    <div className='protected__layout__container'>
      <div>auth</div>
    </div>
  )
}

export default ProtectedLayout
