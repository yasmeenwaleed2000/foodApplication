import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import toggler from "../../../assets/images/3.png";
import ChangePassword from "../../../AuthModule/components/ChangePassword/ChangePassword";
import Modal from "react-bootstrap/Modal";

export default function SideBar({ adminData }) {
  console.log(adminData);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleCollapes = () => {
    setIsCollapsed(!isCollapsed);
  };
  let navigate = useNavigate();
  let logOut = () => {
    localStorage.removeItem("adminToken");
    navigate("/login");
  };
  return (
    <>
      <div className="sidebar-container ">
        <Sidebar collapsed={isCollapsed}>
          <Menu>
            <MenuItem
              className="m-5"
              onClick={toggleCollapes}
              icon={<img src={toggler} />}
            ></MenuItem>

            <MenuItem
              icon={<i className="fa fa-home"></i>}
              component={<Link to="/dashboard" />}
            >
              Home
            </MenuItem>
            {adminData?.userGroup == "SuperAdmin" ? (
              <MenuItem
                icon={<i className="fa fa-users"></i>}
                component={<Link to="/dashboard/userlist" />}
              >
                User
              </MenuItem>
            ) : (
              ""
            )}

            <MenuItem
              icon={<i className="fa-solid fa-table-cells-large"></i>}
              component={<Link to="/dashboard/recipes" />}
            >
              Recipes
            </MenuItem>

            {adminData?.userGroup == "SuperAdmin" ? (
              <MenuItem
                icon={<i className="fa-regular fa-calendar-days"></i>}
                component={<Link to="/dashboard/categorieslist" />}
              >
                Categorieslist
              </MenuItem>
            ) : (
              ""
            )}

            {adminData?.userGroup == "SystemUser" ? (
              <MenuItem
                icon={<i className="fa fa-heart text-danger"></i>}
                component={<Link to="/dashboard/favouritesList" />}
              >
                Favourites
              </MenuItem>
            ) : (
              ""
            )}

            <MenuItem
              onClick={handleShow}
              icon={<i className="fa-solid fa-unlock-keyhole"></i>}
              component={<Link to="" />}
            >
              ChangePassword
            </MenuItem>

            <MenuItem
              className="mt-5"
              icon={<i className="fa-solid fa-right-from-bracket"></i>}
              onClick={logOut}
            >
              LogOut
            </MenuItem>
          </Menu>
        </Sidebar>

        <Modal show={show} onHide={handleClose}>
          <Modal.Body>
            <ChangePassword handleClose={handleClose} />
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}
