import React, { useEffect, useState } from "react";
import RecipesHeader from "../../../SharedModule/components/RecipesHeader/RecipesHeader";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateData() {
  const [recipeData, setRecipeData] = useState({});
  const [category, setCategory] = useState([]);
  let token = localStorage.getItem("adminToken");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const navigate = useNavigate();
  const navigateToRecipe = () => {
    navigate("/dashboard/recipes");
  };

  const params = useParams();
  console.log(params);

  const appendToFormData = (data) => {
    let formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("tagId", data.tagId);
    formData.append("categoriesIds", data.categoriesIds);
    formData.append("recipeImage", data.recipeImage[0]);

    return formData;
  };

  const fetchRecipeId = async () => {
    try {
      let response = await axios.get(
        `https://upskilling-egypt.com:443/api/v1/Recipe/${params.recipeId}`
      );
      setRecipeData(response.data);
      setCategory(response.data.category);
      console.log(response.data);
      setValue("name", response.data.name);
      setValue("price", response.data.price);
      setValue("description", response.data.description);
      setValue("tagId", response.data.tag?.id);
      setValue(
        "categoriesIds",
        response.data.category.length > 0 ? response.data.category[0].id : " "
      );
      // setValue("recipeImage", response.data.recipeImage?.[0]);
    } catch (error) {
      toast.error(error);
    }
  };

  console.log(category);
  const onSubmitUpdate = async (data) => {
    let recipeDataForm = appendToFormData(data);

    try {
      let response = await axios.put(
        `https://upskilling-egypt.com:443/api/v1/Recipe/${params.recipeId}`,
        recipeDataForm,
        {
          headers: { Authorization: token },
        }
      );
      console.log(response);

      navigateToRecipe();
      toast.success("Udate successfully");
    } catch (error) {
      toast.error(error);
    }
  };

  /* useEffect(()=>{
    setValue("name", data.name);
    setValue("price", data.price);
    setValue("description", data.description); 
    setValue("tagId", data.tagId); 
    setValue("categoriesIds", data.categoriesIds); 
    setValue("recipeImage", data.recipeImage?.[0]); 
  },[data, setValue])*/

  const [categoriesList, setCategoriesList] = useState([]);
  const [tagsList, setTagsList] = useState([]);

  //call categoriesList start page update
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

  //call tag categoriesList start page update

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

  useEffect(() => {
    fetchRecipeId();
    getCategoriesList();
    getTagsList();
  }, []);

  return (
    <>
      <RecipesHeader />
      <ToastContainer />

      <div className="p-5">
        <form onSubmit={handleSubmit(onSubmitUpdate)}>
          <div className="input-group mb-3">
            <input
              //defaultValue={recipeData.name}
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
              // defaultValue={recipeData.price}
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
              // defaultValue={recipeData.description}
              className="form-control"
              placeholder="description  "
              {...register("description", {
                required: "description  is required",
              })}
            ></textarea>
          </div>

          {errors.description && (
            <p className="alert alert-danger">{errors.description.message}</p>
          )}

          <div className="input-group mb-3">
            <select
              // defaultValue={recipeData?.tag?.id || " "}
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

          {errors.tagId && (
            <p className="alert alert-danger">{errors.tagId.message}</p>
          )}

          <div className="input-group mb-3">
            <select
              // defaultValue={category.length > 0 ?recipeData.category[0].id: " "}
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
              // defaultValue={recipeData.imagePath}
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
            <button className="btn btn-success">Update</button>
          </div>
        </form>
      </div>
    </>
  );
}
