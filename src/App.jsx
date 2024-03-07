import { useState, useEffect } from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter, createHashRouter } from "react-router-dom";
import Home from "../src/HomeModule/components/Home/Home";
import Notfound from "../src/SharedModule/components/Notfound/Notfound";
import AuthLayout from "./SharedModule/components/AuthLayout/AuthLayout";
import Login from "./AuthModule/components/Login/Login";
import Forgotpass from "./AuthModule/components/Forgotpass/Forgotpass";
import MasterLayout from "./SharedModule/components/MasterLatout/MasterLayout";
import RecipesList from "../src/RecipesModule/components/RecipesList/RecipesList";
import UserList from "./UsersModule/components/UserList/UserList";
import CategoriesList from "./CategoriesModule/components/CategoriesList/CategoriesList";
import { jwtDecode } from "jwt-decode";
import ProtectedRoute from "./SharedModule/components/ProtectedRoute/ProtectedRoute";
import Resetpass from "./AuthModule/components/Resetpass/Resetpass";
import RecipesData from "./RecipesModule/components/RecipesData/RecipesData";
import Register from "./AuthModule/components/Register/Register";
import UpdateData from "./RecipesModule/components/UpdateData/UpdateData";
import ConfirmRegister from "./AuthModule/components/ConfirmRegister/ConfirmRegister";
import FavouritesList from "./FavouritesModule/Components/FavouritesList/FavouritesList";
import { ToastContainer } from "react-toastify";

function App() {
  const [adminData, setAdminData] = useState(null);
  let saveAdminData = () => {
    let encodedToken = localStorage.getItem("adminToken");
    let decodedToken = jwtDecode(encodedToken);
    localStorage.setItem("loginData", JSON.stringify(decodedToken));
    
    setAdminData(decodedToken);
  };
  useEffect(() => {
    if (localStorage.getItem("adminToken")) {
      saveAdminData();
    }
  }, []);

  const routes = createHashRouter([
    {
      path: "dashboard",
      element: (
        <ProtectedRoute adminData={adminData}>
          <MasterLayout adminData={adminData} />
        </ProtectedRoute>
      ),
      errorElement: <Notfound />,
      children: [
        { index: true, element: <Home adminData={adminData} /> },
        { path: "recipes", element: <RecipesList /> },
        { path: "userlist", element: <UserList /> },
        { path: "recipes-data", element: <RecipesData /> },
        { path: "update-data/:recipeId", element: <UpdateData /> },
        { path: "categorieslist", element: <CategoriesList /> },
        { path: "favouritesList", element: <FavouritesList /> },
      ],
    },

    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <Notfound />,
      children: [
        { index: true, element: <Login saveAdminData={saveAdminData} /> },
        { path: "login", element: <Login saveAdminData={saveAdminData} /> },
        { path: "forgot-pass", element: <Forgotpass /> },
        { path: "reset-pass", element: <Resetpass /> },
        { path: "register", element: <Register /> },
        { path: "confirm-register", element: <ConfirmRegister /> },
      ],
    },
  ]);

  return (
    <>
    <ToastContainer/>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
