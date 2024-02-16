import React from "react";
import headerlogo from '../../../assets/images/eatingpho.png';

export default function Header({title,description}) {
  return (
    <>
      <div className="container-fluid header-cont">
        <div className="row justify-content-between">
          <div className="col-md-5 d-flex align-items-center ms-5 text-white">
            <div className="header-content">
              <h2>{title}</h2>
              <p>{description}</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="header-image text-center">
              <img src={headerlogo} alt="" />
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
