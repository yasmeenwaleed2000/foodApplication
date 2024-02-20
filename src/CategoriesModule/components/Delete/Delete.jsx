import React from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import { useState } from "react";
import noData from "../../../assets/images/noData.png";

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
      getAllItem();
      console.log(response);
     
    }catch(error){
      console.log(error)
    }
  };

  
  return (
   <>
   <button className="btn btn-danger" onClick={handleShow}>Delete</button>
   

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <div className='text-center'>
        <img src={noData} alt="noData" />
        <h5>Delete this item?</h5>
         <p className='text-muted'>are you sure you want to delete this item ? if you are sure just click on delete it</p>
         </div>


        <div className="d-flex justify-content-end">
              <button className="btn btn-outline-danger" onClick={onSubmitDelete}>Delete this item</button>
            </div>
        </Modal.Body>
       
      </Modal>
   </>
  )
}
