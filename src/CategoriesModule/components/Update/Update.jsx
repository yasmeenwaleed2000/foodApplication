import React, { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useForm} from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function Update({catId,getAllItem,catName}) {
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const {
    register,
    handleSubmit,
    formState: { errors },setValue
  } = useForm();

  const onSubmitUpdate =async (data) => {
    let token = localStorage.getItem("adminToken");
    console.log(data);
    try{
      let response=await axios.put(`https://upskilling-egypt.com:443/api/v1/Category/${catId}`,data, 
       { headers: { Authorization: token },}
      );
      
      handleClose();
     toast.success("Update is successfully");
     //console.log(response );
     getAllItem();
    }catch(error){
      toast.error(error)
    }
  };

  useEffect(()=>{
    setValue("name",catName)
  },[catName])
 

  
  return (
    <>
<button className="btn btn-warning mx-2"  onClick={handleShow}>Update</button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edite Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
       
          <form onSubmit={handleSubmit(onSubmitUpdate)}>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="name "
                {...register("name", {
                  required: "name is required",
                })}
              />
            </div>

            {errors.name && (
              <p className="alert alert-danger">{errors.name.message}</p>
            )}

            <div className="d-flex justify-content-end">
              <button className="btn btn-success">Edite</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
