import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../../SharedModule/components/Header/Header";
import RecipesHeader from "../../../SharedModule/components/RecipesHeader/RecipesHeader";


export default function Home({ adminData }) {
  

  
  return (
    <>
      <ToastContainer />
      <Header
        title={`welcome ${adminData?.userName} !`}
        description="This is a welcoming screen for the entry of the application , you can now see the options"
      />
   <RecipesHeader/>
     
    </>
  );
}
