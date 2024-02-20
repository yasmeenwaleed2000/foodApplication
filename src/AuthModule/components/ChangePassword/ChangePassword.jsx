import React from "react";
import logo from "../../../assets/images/logo.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function ChangePassword({handleClose}) {
    
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
      const onSubmit =async (data) => {
        let token=localStorage.getItem("adminToken");
        try{
            let response=await axios.put("https://upskilling-egypt.com:443/api/v1/Users/ChangePassword",data,
            {
              headers: { Authorization: token },
            }
            );
           toast.success(response.data.message);
           handleClose();
            }
            catch (error){
              toast.error(error.response.data.message);
            }
              };

      

      

      

  return (
    <>
    <div className="row justify-content-center align-items-center">
    <ToastContainer />
              <div className="col-md-12 ">
                <div className="login bg-white rounded-3 px-5 py-4">
                  <div className="logo-cont text-center mb-3">
                    <img src={logo} alt="noData" className="w-50" />
                  </div>
                  <h5> Change Your Password</h5>
                  <p className="text-muted">
                  Enter your details below
                  </p>

                  <form onSubmit={handleSubmit(onSubmit)}>
                   

                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                      <i className="fa fa-key"></i>
                      </span>

                      <input
                        type="password"
                        className="form-control"
                        placeholder=" old Password"
                        {...register("oldPassword", {
                          required: "oldPassword is required",
                        })}
                      />
                    </div>

                    {errors.oldPassword && (
                      <p className="alert alert-danger">
                        {errors.oldPassword.message}
                      </p>
                    )}


<div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                      <i className="fa fa-key"></i>
                      </span>

                      <input
                        type="password"
                        className="form-control"
                        placeholder="new Password"
                        {...register("newPassword", {
                          required: "newPassword is required",
                        })}
                      />
                    </div>

                    {errors.newPassword && (
                      <p className="alert alert-danger">
                        {errors.newPassword.message}
                      </p>
                    )}

                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                      <i className="fa fa-key"></i>
                      </span>

                      <input
                        type="password"
                        className="form-control"
                        placeholder="confirm New Password"
                        {...register("confirmNewPassword", {
                          required: "confirmNewPassword is required",
                        })}
                      />
                    </div>

                    {errors.confirmNewPassword && (
                      <p className="alert alert-danger">
                        {errors.confirmNewPassword.message}
                      </p>
                    )}

                    

                    
                    <button className="w-100 btn btn-success mt-3">
                    Change Password
                    </button>
                  </form>
                </div>
              </div>
            </div>
    </>
  )
}

