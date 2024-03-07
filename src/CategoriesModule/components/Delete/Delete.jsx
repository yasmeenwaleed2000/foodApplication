import React from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import { useState } from "react";
import DeleteModel from "../../../SharedModule/components/DeleteModel/DeleteModel";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Delete({catId,getAllItem}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onSubmitDelete =async (data) => {
    let token = localStorage.getItem("adminToken");
    console.log(data);
    try{
      
      
      let response=await axios.delete(`https://upskilling-egypt.com:443/api/v1/Category/${catId}`, 
       { headers: { Authorization: token },}
       
      );
       
      handleClose();
      toast.success("Delete is successfully");
      getAllItem();
      console.log(response);
     
    }catch(error){
      console.log(error)
    }
  };

  
  return (
   <>
   
   <button className="btn btn-danger" onClick={handleShow}> Delete</button>
   

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
         
        <DeleteModel/>

        <div className="d-flex justify-content-end">
              <button className="btn btn-outline-danger" onClick={onSubmitDelete}>Delete this item</button>
            </div>
        </Modal.Body>
       
      </Modal>
   </>
  )
}
