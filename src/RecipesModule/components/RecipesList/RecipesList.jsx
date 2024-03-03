import React, { useState, useEffect } from "react";
import Header from "../../../SharedModule/components/Header/Header";
import axios from "axios";
import noData from "../../../assets/images/noData.png";
import Modal from "react-bootstrap/Modal";
import DeleteModel from "../../../SharedModule/components/DeleteModel/DeleteModel";
import { Navigate, useNavigate } from "react-router-dom";
import NoData from "../../../SharedModule/components/NoData/NoData";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function RecipesList() {
  const loginData= JSON.parse(localStorage.getItem("loginData"));
  
  const [recipesList, setRicipesList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [nameSearch, setNameSearch] = useState("");
  const [selectedTagId, setSelectedTagId] = useState(0);
  const [selectedCatId, setSelectedCatId] = useState(0);
  const [tagsList, setTagsList] = useState([]);
  const [recipeId, setRecipeId] = useState(0);
  const [pagesArray, setPagesArray] = useState([]);
  const navigate = useNavigate();
  let token = localStorage.getItem("adminToken");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setRecipeId(id);
    setShow(true);
  };

  const navigateToRecipeData = () => {
    navigate("/dashboard/recipes-data");
  };

  const navigateToUpdateData = () => {
    navigate("/dashboard/update-data");
  };

  const getListRecipes = async (pageNo, pageSize, name, tagId, catId) => {
    try {
      let response = await axios.get(
        "https://upskilling-egypt.com:443/api/v1/Recipe/",
        {
          headers: { Authorization: token },
          params: {
            pageNumber: pageNo,
            pageSize: pageSize,
            name: name,
            tagId: tagId,
            categoryId: catId,
          },
        }
      );
      setPagesArray(
        Array(response.data.totalNumberOfPages)
          .fill()
          .map((_, i) => i + 1)
      );
      console.log(response.data.totalNumberOfPages);
      setRicipesList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteRecipes = async () => {
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
    getListRecipes(1, 10);
    getCategoriesList();
    getTagsList();
  }, []);

  const getNameValue = (input) => {
    setNameSearch(input.target.value);
    getListRecipes(1, 10, input.target.value, selectedTagId, selectedCatId);
  };

  const getCatValue = (select) => {
    setSelectedCatId(select.target.value);
    getListRecipes(1, 10, nameSearch, selectedTagId, select.target.value);
  };

  const getTagValue = (select) => {
    setSelectedTagId(select.target.value);
    getListRecipes(1, 10, nameSearch, select.target.value, selectedCatId);
  };

  const getCategoriesList = async () => {
    try {
      let response = await axios.get(
        "https://upskilling-egypt.com:443/api/v1/Category/?pageSize=10&pageNumber=1",
        {
          headers: { Authorization: token },
        }
      );

      setCategoriesList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTagsList = async () => {
    try {
      let response = await axios.get(
        "https://upskilling-egypt.com:443/api/v1/tag/",
        {
          headers: { Authorization: token },
        }
      );

      setTagsList(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addToFav = async (recipeId) => {
    try {
      let response = await axios.post(
        "https://upskilling-egypt.com:443/api/v1/userRecipe/",{"recipeId":recipeId},
        {
          headers: { Authorization: token },
        }
      );
     
      console.log(response);
      toast.success("Item Added To Favourites")
    } catch (error) {
      toast.error(error);
    }
  };

  

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
        {loginData?.userGroup=='SuperAdmin'?( <div className="btn-container">
          <button
            onClick={navigateToRecipeData}
            className="btn btn-success px-5"
          >
            Add New Item
          </button>
        </div>
      ):("")
       }
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

      <div className="row p-4">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Name"
            onChange={getNameValue}
          />
        </div>
        <div className="col-md-3">
          <select className="form-control" onChange={getCatValue}>
            <option value="">search by categories</option>
            {categoriesList?.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-3">
          <select className="form-control" onChange={getTagValue}>
            <option value="">search by Tag</option>
            {tagsList?.map((tag) => (
              <option key={tag.id} value={tag.id}>
                {tag.name}
              </option>
            ))}
          </select>
        </div>
      </div>

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
                      {loginData?.userGroup=='SuperAdmin'?(<>
                        <i
                        onClick={navigateToUpdateData}
                        className="fa fa-edit text-warning mx-2"
                        aria-hidden="true"
                      ></i>

                      <i
                        onClick={() => handleShow(recipe.id)}
                        className="fa fa-trash text-danger mx-2"
                        aria-hidden="true"
                      ></i>
                      </>):( <button className="btn">  <i 
                       onClick={() => addToFav(recipe.id)}
                        className="fa fa-heart text-danger mx-2"
                        aria-hidden="true"
                       
                      ></i></button>)}
                   
                    </td>
                  </tr>
                ))}
              </tbody>

              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  <li className="page-item">
                    <a className="page-link" aria-label="Previous">
                      <span aria-hidden="true">&laquo;</span>
                      <span className="sr-only">Previous</span>
                    </a>
                  </li>
                  {pagesArray.map((pageNo) => (
                    <li
                      key={pageNo}
                      onClick={() => getListRecipes(pageNo, 10)}
                      className="page-item"
                    >
                      <a className="page-link">{pageNo}</a>
                    </li>
                  ))}

                  <li className="page-item">
                    <a className="page-link" aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                      <span className="sr-only">Next</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </table>
          ) : (
            <NoData />
          )}
        </div>
      }
    </>
  );
}
