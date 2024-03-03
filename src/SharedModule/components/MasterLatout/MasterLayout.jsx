import React from 'react'
import Navbar from '../NavBar/NavBar'
import SideBar from '../SideBar/SideBar'
import { Outlet } from 'react-router-dom'


export default function MasterLayout({adminData}) {
  return (
   <>
  
    <div className='d-flex'>
      <div className=''>
<SideBar adminData={adminData}/>
      </div>
      <div className='w-100'>
      <Navbar adminData={adminData}/>
      
      <Outlet/>
      </div>
    </div>
   
   </>
  )
}
