import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import toggler from '../../../assets/images/3.png'

export default function SideBar() {
  const [isCollapsed,setIsCollapsed]=useState(false);
  const toggleCollapes=()=>{
    setIsCollapsed(!isCollapsed);
  };
  let navigate = useNavigate();
  let logOut = () => {
    localStorage.removeItem("adminToken");
    navigate("/login");
  };
  return (
    <>
      <div className="sidebar-container">
        <Sidebar collapsed={isCollapsed}>
          <Menu>
          <MenuItem className="m-5" onClick={toggleCollapes}
             
              icon={<img src={toggler}/>}
            >
            </MenuItem>



            <MenuItem
              icon={<i className="fa fa-home" ></i>}
              component={<Link to="/dashboard" />}
            >
             
              Home
            </MenuItem>
            <MenuItem  icon={<i className="fa fa-users" ></i>} component={<Link to="/dashboard/userlist" />}>
              {" "}
              User
            </MenuItem>
            <MenuItem icon={<i class="fa-solid fa-table-cells-large"></i>} component={<Link to="/dashboard/recipes" />}>
              Recipes
            </MenuItem>
            <MenuItem  icon={<i class="fa-regular fa-calendar-days"></i>} component={<Link to="/dashboard/categorieslist" />}>
             
              Categorieslist
            </MenuItem>
            
            <MenuItem className="mt-5" icon={<i class="fa-solid fa-right-from-bracket"></i>} onClick={logOut}>LogOut</MenuItem>
          </Menu>
        </Sidebar>
      </div>
      
    </>
  );
}
