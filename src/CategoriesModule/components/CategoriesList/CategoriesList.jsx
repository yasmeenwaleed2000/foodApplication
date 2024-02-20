import React, { useEffect, useState } from "react";
import Header from "../../../SharedModule/components/Header/Header";
import axios from "axios";
import noData from "../../../assets/images/noData.png";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import Update from "../Update/Update";
import Delete from "../Delete/Delete";


export default function Categories() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmitAdd = async (data) => {
    console.log(data);
    try {
      let response = await axios.post(
        "https://upskilling-egypt.com:443/api/v1/Category/",
        data,
        {
          headers: { Authorization: token },
        }
      );
      getList();
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };
  const [categoriesList, setCategoriesList] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let token = localStorage.getItem("adminToken");

  const getList = async () => {
    try {
      let categoriesList = await axios.get(
        "https://upskilling-egypt.com:443/api/v1/Category/?pageSize=10&pageNumber=1",
        {
          headers: { Authorization: token },
        }
      );
      setCategoriesList(categoriesList.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getList();
  }, []);

  return (
    <>
      <Header
        title="Categories Items"
        description="You can now add your items that any user can order it from the Application and you can editt"
      />

      <div className="categories-container">
        <div className="title-info d-flex justify-content-between p-4">
          <div className="title">
            <h5>Categories Table Details</h5>
            <p>You can check all details</p>
          </div>
          <div className="btn-container">
            <button className="btn btn-success" onClick={handleShow}>
              Add New Category
            </button>
          </div>
        </div>

        <div className="table-container text-center">
          {categoriesList.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categoriesList.map((cat) => (
                  <tr key={cat.id}>
                    <th scope="row">{cat.id}</th>
                    <td>{cat.name}</td>
                    <td>
                  


                            <Update catId={cat.id} getAllItem={getList}/>
               
                            <Delete catId={cat.id} getAllItem={getList}/>
                      

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div>
              <img src={noData} alt="noData" />
              <h5>No Data !</h5>
              <p className="text-muted">
                are you sure you want to delete this item ? if you are sure just
                click on delete it
              </p>
            </div>
          )}
        </div>
      </div>

      <div
        className="modal show"
        style={{ display: "block", position: "initial" }}
      >
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit(onSubmitAdd)}>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Category Name "
                  {...register("name", {
                    required: "Name is required",
                  })}
                />
              </div>

              {errors.name && (
                <p className="alert alert-danger">{errors.name.message}</p>
              )}
              <div className="d-flex justify-content-end">
                <button className="btn btn-success">Save</button>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>







       
      </div>
    </>
  );
}
