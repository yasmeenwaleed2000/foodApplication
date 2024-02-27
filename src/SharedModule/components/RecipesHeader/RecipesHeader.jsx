import React from 'react';
import {useNavigate} from "react-router-dom";

export default function RecipesHeader() {
    const navigate=useNavigate();

    const navigateToRecipes=()=>{
       navigate("/dashboard/recipes")
    }
  return (
   <>
     <div className="container  p-5 home-container">
        <div className="row align-items-center">
          <div className="col-md-8">
            <h4>
              Fill the <span className="text-success">Recipes</span> !
            </h4>
            <p className="w-50">
              you can now fill the meals easily using the table and form , click
              here and sill it with the table !
            </p>
          </div>

          <div className="col-md-4 d-flex justify-content-end">
            <button className="btn btn-success" onClick={navigateToRecipes}>
              Fill Recipes <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
   </>
  )
}
