import React from "react";
import logo from "../../../assets/images/logo.png";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";


export default function Register() {
  const navigate=useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const appendToFormData = (data) => {
    let formData = new FormData();
    formData.append("userName", data.userName);
    formData.append("email", data.email);
    formData.append("country", data.country);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("profileImage", data.profileImage[0]);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    return formData;
  };
  const onSubmit = async (data) => {
    console.log(data);
    let registerFormData = appendToFormData(data);
    try {
      let response = await axios.post(
        "https://upskilling-egypt.com:443/api/v1/Users/Register",
        registerFormData
      );
      toast.success("register successfully");
      navigate('/confirm-register');
    } catch (errors) {
      toast.error(errors.response.data.message);
    }
  };
  return (
    <>
      <div className="Auth-container vh-100">
        <ToastContainer />
        <div className="overlay vh-100">
          <div className="row  vh-100 justify-content-center align-items-center">
            <div className="col-md-7">
              <div className="register bg-white rounded-3 px-5 py-4">
                <div className="logo-cont text-center mb-3">
                  <img src={logo} alt="food-logo" className="w-50" />
                </div>
                <div>
                  <h3>Register</h3>
                  <p className="text-muted">
                    Welcome Back! Please enter your details
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                        <i className="fa-solid fa-user"></i>
                        </span>

                        <input
                          type="text"
                          className="form-control"
                          placeholder="UserName"
                          {...register("userName", {
                            required: "userName is required",
                          })}
                        />
                      </div>
                      {errors.userName && (
                        <p className="alert alert-danger">
                          {email.userName.message}
                        </p>
                      )}
                    </div>

                    <div className="col-md-6">
                      <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                          <i className="fa fa-envelope" aria-hidden="true"></i>
                        </span>

                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter your E-mail"
                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                              message: "Email not valid",
                            },
                          })}
                        />
                      </div>

                      {errors.email && (
                        <p className="alert alert-danger">
                          {email.errors.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                        <i className="fa-solid fa-globe"></i>
                        </span>

                        <input
                          type="text"
                          className="form-control"
                          placeholder="Country"
                          {...register(
                            "country",

                            { required: "country is required" }
                          )}
                        />
                      </div>

                      {errors.country && (
                        <p className="alert alert-danger">
                          {errors.country.message}
                        </p>
                      )}
                    </div>

                    <div className="col-md-6">
                      <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                        <i className="fa-solid fa-phone-volume"></i>
                        </span>

                        <input
                          type="text"
                          className="form-control"
                          placeholder="PhoneNumber"
                          {...register("phoneNumber", {
                            required: "phoneNumber is required",
                          })}
                        />
                      </div>

                      {errors.phoneNumber && (
                        <p className="alert alert-danger">
                          {errors.phoneNumber.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                          <i className="fa fa-key" aria-hidden="true"></i>
                        </span>

                        <input
                          type="password"
                          className="form-control"
                          placeholder="Password"
                          {...register("password", {
                            required: "password is rquired",
                          })}
                        />
                      </div>

                      {errors.password && (
                        <p className="alert alert-danger">
                          {errors.password.message}
                        </p>
                      )}
                    </div>

                    <div className="col-md-6">
                      <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                        <i className="fa-solid fa-check-double"></i>
                        </span>

                        <input
                          type="password"
                          className="form-control"
                          placeholder="confirm-password"
                          {...register("confirmPassword", {
                            required: "confirmPassword is required",
                          })}
                        />
                      </div>

                      {errors.confirmPassword && (
                        <p className="alert alert-danger">
                          {errors.confirmPassword.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                        <i className="fa-solid fa-file-pdf"></i>
                        </span>

                        <input
                          type="file"
                          className="form-control"
                          placeholder="No file chose"
                          {...register("profileImage")}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end my-2">
                    <Link to={"/login"} className="text-success">
                      Login Now?
                    </Link>
                  </div>
                  <div className="row justify-content-center">
                    <button className="w-75 btn btn-success mt-5 p-2">
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
