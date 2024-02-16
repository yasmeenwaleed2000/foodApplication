import React from 'react'

export default function Navbar({adminData}) {
 
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light m-5 rounded-4">
      <div className=''><i class="fa-solid fa-magnifying-glass mx-3  w-100"></i></div>
      <form class="d-flex">
        <input class="form-control" type="search" placeholder="Search here" aria-label="Search"/>
      </form>
        
  <div className="container-fluid">
   
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
       
        <li className="nav-item">
          <a className="nav-link" href="#">{adminData?.userName}</a>
          
        </li>
       
      </ul>
      <div >
      <i class="fa-solid fa-chevron-down"></i>
        <i class="fa-solid fa-bell mx-4"></i>
     
      </div>
     
    </div>
  </div>
</nav>
    </>
  )
}
