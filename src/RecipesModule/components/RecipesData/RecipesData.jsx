import React, { useEffect, useState } from "react";
import RecipesHeader from "../../../SharedModule/components/RecipesHeader/RecipesHeader";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";



export default function RecipesData() {
  
  let token = localStorage.getItem("adminToken");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
 

  const navigate = useNavigate();
  const navigateToRecipe = () => {
    navigate('/dashboard/recipes')
  };

  const appendToFormData = (data) => {
    let formData = new FormData();
    formData.append("name",data.name);
    formData.append("price",data.price);
    formData.append("description",data.description );
    formData.append("tagId",data.tagId );
    formData.append("categoriesIds",data.categoriesIds);
    formData.append("recipeImage",data.recipeImage[0]);
   
    return formData;
  };
  

  const onSubmitAdd = async(data) => {
   let recipeDataForm= appendToFormData(data);

   try {
    let response = await axios.post(
      "https://upskilling-egypt.com:443/api/v1/Recipe/",recipeDataForm,
      {
        headers: { Authorization: token },
      },
    );
    
    toast.success(response.data.message)
    navigateToRecipe();

  } catch (error) {
    toast.error(error);
  }
  };

  const [categoriesList, setCategoriesList] = useState([]);
  const [tagsList, setTagsList] = useState([]);
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
        },
      );

      setTagsList(response?.data);
      
    } catch (error) {
      console.log(error);
    }
  };




  useEffect(() => {
    getCategoriesList();
    getTagsList();
  }, []);
  return (
    <>
      <RecipesHeader />
      <ToastContainer />
      <div className="p-5">
        <form onSubmit={handleSubmit(onSubmitAdd)}>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Recipe Name "
              {...register("name", {
                required: "Name is required",
              })}
            />
          </div>

          {errors.name && (
            <p className="alert alert-danger">{errors.name.message}</p>
          )}

          <div className="input-group mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="Enter price "
              {...register("price", {
                required: "price is required",
              })}
            />
          </div>

          {errors.price && (
            <p className="alert alert-danger">{errors.price.message}</p>
          )}


            <div className="input-group mb-3">
            <textarea
            
              className="form-control"
              placeholder="description  "
              {...register("description", {
                required: "description  is required",
              })}
            ></textarea>
          </div>

          {errors.description  && (
            <p className="alert alert-danger">{errors.description .message}</p>
          )}



        <div className="input-group mb-3">
            <select
                 type="number"
              className="form-control"
              {...register("tagId", {
                required: "tag  is required",
              })}
            >
              {tagsList?.map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.name}
                </option>
              ))}
            </select>
          </div>

          {errors.tagId  && (
            <p className="alert alert-danger">{errors.tagId .message}</p>
          )}





          <div className="input-group mb-3">
            <select
              className="form-control"
              {...register("categoriesIds", {
                required: "categoriesIds is required",
              })}
            >
              {categoriesList?.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {errors.categoriesIds && (
            <p className="alert alert-danger">{errors.categoriesIds.message}</p>
          )}

       

          <div className="input-group mb-3">
            <input
              type="file"
              className="form-control"
              {...register("recipeImage", {
                required: "recipeImage is required",
              })}
            />
          </div>

          {errors.recipeImage && (
            <p className="alert alert-danger">{errors.recipeImage.message}</p>
          )}

         

          <div className="d-flex justify-content-end">
            <button className="btn btn-success">Save</button>
          </div>
        </form>
      </div>
    </>
  );
}



