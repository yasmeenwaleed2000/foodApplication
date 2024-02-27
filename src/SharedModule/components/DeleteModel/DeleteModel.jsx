import React from 'react';
import noData from "../../../assets/images/noData.png";

export default function DeleteModel() {
  return (
    <>

<div className='text-center'>
        <img src={noData} alt="noData" />
        <h5>Delete this item?</h5>
         <p className='text-muted'>are you sure you want to delete this item ? if you are sure just click on delete it</p>
         </div>


         
    </>
  )
}
