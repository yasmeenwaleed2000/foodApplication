import Header from "../../../SharedModule/components/Header/Header";
import axios from "axios";
import React, { useEffect, useState } from "react";
import NoData from "../../../SharedModule/components/NoData/NoData";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import noData from "../../../assets/images/noData.png";
import DeleteModel from "../../../SharedModule/components/DeleteModel/DeleteModel";

export default function FavouritesList() {
  let token = localStorage.getItem("adminToken");

  const [show, setShow] = useState(false);
  const [favId, setFavId] = useState(0);
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setFavId(id);
    setShow(true);
  };

  const [favList, setFavList] = useState([]);

  const getListFav = async () => {
    try {
      let favoruitList = await axios.get(
        "https://upskilling-egypt.com:443/api/v1/userRecipe/",
        {
          headers: { Authorization: token },
        }
      );

      console.log(favoruitList.data.data);

      setFavList(favoruitList.data.data);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getListFav();
  }, []);

  const onSubmitDelete = async () => {
    // console.log(recipeId);
    try {
      let response = await axios.delete(
        `https://upskilling-egypt.com:443/api/v1/userRecipe/${favId}`,
        { headers: { Authorization: token } }
      );

      handleClose();
      getListFav();
      toast.success("The Selected Item has been Removed from favourites");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ToastContainer />
      <Header
        title="Favorite Items"
        description="You can now add your items that any user can order it from the Application and you can edit"
      />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <DeleteModel />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={onSubmitDelete}>
            confirmDelete
          </Button>
        </Modal.Footer>
      </Modal>

      {/*
        <div className="row p-4">
          {favList?.length > 0 ? (
            favList.map((fav) => (
              <div className="col-md-4 mt-2" key={fav.id}>
                <div className="card w-50">
                  {fav.recipe.imagePath ? (
                    <img
                      className="card-img-top0 text-center "
                      src={`https://upskilling-egypt.com/${fav.recipe?.imagePath}`}
                      alt="NoPhoto"
                    />
                  ) : (
                    <div className="text-center">
                      <img className="" src={noData} alt="noData" />
                    </div>
                  )}
                
                <div className="card-body text-center">
                  <h5>{fav.recipe?.name}</h5>
                  <p>{fav.recipe?.description}</p>
                  <button className="btn btn-outline-danger">
                    {" "}
                    <i
                      onClick={() => handleShow(fav.id)}
                      className="fa fa-trash text-danger mx-2"
                      aria-hidden="true"
                    ></i>
                  </button>
                </div>{" "}
              </div></div>
            ))
          ) : (
            <div className="text-center d-flex justify-content-center">
              {" "}
              <NoData />
            </div>
          )}
        </div>
          */}

      {
        <div className="row p-4 text-center">
          {favList?.length > 0 ? (
            favList.map((fav) => (
              <div className="col-md-4" key={fav.id}>
                <div className="item mt-4 ">
                  {fav.recipe.imagePath ? (
                    <img
                      className="img-fluid w-50"
                      src={`https://upskilling-egypt.com/${fav.recipe?.imagePath}`}
                      alt="NoPhoto"
                    />
                  ) : (
                    <div>
                      <img className="w-25" src={noData} alt="noData" />
                    </div>
                  )}

                  <h5>{fav.recipe?.name}</h5>
                  <p>{fav.recipe?.description}</p>
                </div>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => handleShow(fav.id)}
                >
                  
                  Delete Item
                  <i
                    className="fa fa-trash text-danger mx-2"
                    aria-hidden="true"
                  ></i>
                </button>
              </div>
            ))
          ) : (
            <div className="text-center  d-flex justify-content-center">
              {" "}
              <NoData />
            </div>
          )}
        </div>
      }
    </>
  );
}
