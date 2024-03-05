import React from "react";
import logo from "../../../assets/images/food.png";
import { Link } from "react-router-dom";

export default function Notfound() {
  return (
    <>
      <div className="container">
        <div className="bg-photo vh-100">
          <div className="logo-cont ">
            <img src={logo} alt="food-logo" className="w-50" />
          </div>
          <div className="notfound-content mt-5">
            <h1>Oops.... </h1>
            <h4 className="text-success">Page not found </h4>
            <p>
              This Page doesn’t exist or was removed! We suggest you back to
              home.
            </p>
            <button className="btn btn-success"> <Link to={"/dashboard"}  className="text-white">
            Back To Home
                    </Link></button>
          </div>
        </div>
      </div>
    </>
  );
}
