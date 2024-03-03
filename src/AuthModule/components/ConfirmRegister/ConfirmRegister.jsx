import React from 'react';
import{useForm} from 'react-hook-form';
import logo from '../../../assets/images/logo.png';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";


export default function ConfirmRegister() {
    const{register,handleSubmit,formState:{errors}}=useForm();
    const navigate=useNavigate();
   
    const onSubmitConfirmRegister = async(data) => {
      try {
       let response = await axios.put(
         "https://upskilling-egypt.com:443/api/v1/Users/verify",data
         
       );
       console.log(response)
       toast.success("Confirm Register is Successfully")
       navigate('/login');
   
     } catch (error) {
       toast.error(error.response.data.message);
     }
     };
   
  return (
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
                <h3>Verify account</h3>
                <p className="text-muted">
                 Please Enter Your Code Or Check Your Inbox
                </p>

                <form onSubmit={handleSubmit(onSubmitConfirmRegister)}>
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
                    <p className="alert alert-danger">{errors.email.message}</p>
                  )}

                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa fa-key"></i>
                    </span>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="code"
                      {...register("code", {
                        required: "code is required",
                      })}
                    />
                  </div>
                  {errors.code && (
                    <p className="alert alert-danger">
                      {errors.code.message}
                    </p>
                  )}

                  <button className="w-100 btn btn-success">Verify account</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
