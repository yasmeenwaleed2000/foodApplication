import React from "react";
import logo from "../../../assets/images/logo.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Resetpass() {
    const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    axios
      .post("https://upskilling-egypt.com:443/api/v1/Users/Reset", data)
      .then((response) => {
        setTimeout(()=>toast.success("login success",{position:"top-right"}),100
        ) ;
        console.log(response);
        navigate("/login");
      })
      .catch((error) => {
        toast(error.response.data.message);
      });
  };

  return (
    <>
      <>
        <div className="Auth-container vh-100 ">
        <ToastContainer />
          <div className="overlay vh-100 container-fluid">
            <div className="row vh-100 justify-content-center align-items-center">
              <div className="col-md-5 ">
                <div className="login bg-white rounded-3 px-5 py-4">
                  <div className="logo-cont text-center mb-3">
                    <img src={logo} alt="food-logo" className="w-50" />
                  </div>
                  <h5> Reset Password</h5>
                  <p className="text-muted">
                    Please Enter Your Otp or Check Your Inbox
                  </p>

                  <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fa fa-envelope" aria-hidden="true"></i>
                      </span>

                      <input
                        type="text"
                        className="form-control"
                        placeholder="Email"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                            message: "Email not valid",
                          },
                        })}
                      />
                    </div>

                    {errors.password && (
                      <p className="alert alert-danger">
                        {errors.email.message}
                      </p>
                    )}

                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                      <i className="fa fa-key"></i>
                      </span>

                      <input
                        type="password"
                        className="form-control"
                        placeholder=" New Password"
                        {...register("password", {
                          required: "password is required",
                        })}
                      />
                    </div>

                    {errors.password && (
                      <p className="alert alert-danger">
                        {errors.password.message}
                      </p>
                    )}

                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                      <i className="fa fa-key"></i>
                      </span>

                      <input
                        type="password"
                        className="form-control"
                        placeholder="Confirm New Password"
                        {...register("confirmPassword", {
                          required: "confirmPassword is required",
                        })}
                      />
                    </div>

                    {errors.password && (
                      <p className="alert alert-danger">
                        {errors.confirmPassword.message}
                      </p>
                    )}

                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                      <i className="fa fa-key"></i>
                      </span>

                      <input
                        type="text"
                        className="form-control"
                        placeholder="OTP"
                        {...register("seed", {
                          required: "seed is required",
                        })}
                      />
                    </div>

                    {errors.password && (
                      <p className="alert alert-danger">
                        {errors.seed.message}
                      </p>
                    )}
                    <button className="w-100 btn btn-success mt-5">
                      Reset Password
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
}
