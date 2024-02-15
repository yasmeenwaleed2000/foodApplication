import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {RouterProvider,createBrowserRouter} from "react-router-dom";
import Home from '../src/HomeModule/components/Home/Home';
import Notfound from '../src/SharedModule/components/Notfound/Notfound';
import AuthLayout from "./SharedModule/components/AuthLayout/AuthLayout";
import Login from "./AuthModule/components/Login/Login";
import Forgotpass from "./AuthModule/components/Forgotpass/Forgotpass";
import MasterLayout from "./SharedModule/components/MasterLatout/MasterLayout";
import RecipesList from '../src/RecipesModule/components/RecipesList/RecipesList';
import UserList from './UsersModule/components/UserList/UserList';
import CategoriesList from './CategoriesModule/components/CategoriesList/CategoriesList';
import {jwtDecode} from 'jwt-decode';
import ProtectedRoute from './SharedModule/components/ProtectedRoute/ProtectedRoute';
import Resetpass from './AuthModule/components/Resetpass/Resetpass';



function App() {
  const[adminData,setAdminData]=useState(null);
  let saveAdminData=()=>{
    let encodedToken=localStorage.getItem('adminToken');
    let decodedToken=jwtDecode(encodedToken);
    setAdminData(decodedToken)
  };
useEffect(()=>{
if (localStorage.getItem('adminToken')){
  saveAdminData();
}
},[]);

const routes=createBrowserRouter([
 
{path: "dashboard",
element:(
<ProtectedRoute adminData= {adminData}>
  <MasterLayout adminData={adminData}/>
  </ProtectedRoute>),
errorElement:<Notfound/>,
children:[
  {index:true, element:<Home/>},
  {path:'recipes',element:<RecipesList/>},
  {path:'userlist',element:<UserList/>},
  {path:'categorieslist',element:<CategoriesList/>},
],
},


{
  path: "/",
element:

<AuthLayout/>
,
errorElement:<Notfound/>,
children:[
{index:true, element:<Login saveAdminData= {saveAdminData}/>},
{path:'login',element:<Login  saveAdminData= {saveAdminData}/>},
{path:'forgot-pass',element:<Forgotpass/>},
{path:'reset-pass',element:<Resetpass/>},
],
},



]);
  
  return (
    <>
   
     <RouterProvider router={routes}/>
    </>
  )
}

export default App
