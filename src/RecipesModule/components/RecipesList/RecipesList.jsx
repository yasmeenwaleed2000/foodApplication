import React, { useState, useEffect } from "react";
import Header from "../../../SharedModule/components/Header/Header";
import axios from "axios";
import noData from "../../../assets/images/noData.png";
import Modal from "react-bootstrap/Modal";
import DeleteModel from "../../../SharedModule/components/DeleteModel/DeleteModel";
import { Navigate, useNavigate } from "react-router-dom";
import NoData from "../../../SharedModule/components/NoData/NoData";

export default function RecipesList() {
 
  const [recipesList, setRicipesList] = useState([]);
  const [recipeId, setRecipeId] = useState(0);
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setRecipeId(id);
    setShow(true);
  };

  const navigateToRecipeData = () => {
    navigate("/dashboard/recipes-data")
  };

  const navigateToUpdateData = () => {
    navigate("/dashboard/update-data")
  };

  const getListRecipes = async () => {
    let token = localStorage.getItem("adminToken");
    try {
      let response = await axios.get(
        "https://upskilling-egypt.com:443/api/v1/Recipe/?pageSize=10&pageNumber=1",
        {
          headers: { Authorization: token },
        }
      );
      setRicipesList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteRecipes = async () => {
    let token = localStorage.getItem("adminToken");
    try {
      let response = await axios.delete(
        `https://upskilling-egypt.com:443/api/v1/Recipe/${recipeId}`,
        {
          headers: { Authorization: token },
        }
      );
      getListRecipes();
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getListRecipes();
  }, []);

  return (
    <>
      <Header
        title="Recipes Items"
        description="You can now add your items that any user can order it from the Application and you can edit"
      />

      <div className="d-flex p-4 justify-content-between">
        <div className="title">
          <h5>Recipe Table Details</h5>
          <p>You can check all details</p>
        </div>
        <div className="btn-container">
          <button onClick={navigateToRecipeData} className="btn btn-success px-5">Add New Item</button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <DeleteModel />

          <div className="text-end my-3">
            <button onClick={deleteRecipes} className="btn btn-outline-danger">
              Delete this item
            </button>
          </div>
        </Modal.Body>
      </Modal>

      {
        <div className="table-container text-center px-4 my-3">
          {recipesList.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Image</th>
                  <th scope="col">Category</th>
                  <th scope="col">Actions </th>
                </tr>
              </thead>
              <tbody>
                {recipesList.map((recipe) => (
                  <tr key={recipe.id}>
                    <th scope="row">{recipe.id}</th>
                    <td>{recipe.name}</td>
                    <td>
                      {recipe.imagePath ? (
                        <img
                          className="imagemodify"
                          src={`https://upskilling-egypt.com/${recipe.imagePath}`}
                          alt=""
                        />
                      ) : (
                        <img
                          className="imagemodify"
                          src={noData}
                          alt="noData"
                        />
                      )}
                    </td>

                    <td>{recipe.category[0]?.name}</td>
                    <td>
                      <i  onClick={navigateToUpdateData}
                        className="fa fa-edit text-warning mx-2"
                        aria-hidden="true"
                      ></i>

                      <i
                        onClick={() => handleShow(recipe.id)}
                        className="fa fa-trash text-danger mx-2"
                        aria-hidden="true"
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (

            <NoData/>
           
          )}
        </div>
      }
    </>
  );
}
