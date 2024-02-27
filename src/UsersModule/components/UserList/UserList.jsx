import React, { useState ,useEffect} from "react";
import Header from "../../../SharedModule/components/Header/Header";
import axios from 'axios';
import noData from "../../../assets/images/noData.png";
import NoData from "../../../SharedModule/components/NoData/NoData";

export default function UserList() {
  const [usersList, setUserList]=useState([]);
 
  const getList =async () => {
    let token=localStorage.getItem("adminToken");
    try{
        let response=await axios.get("https://upskilling-egypt.com:443/api/v1/Users/?pageSize=10&pageNumber=1",
        {
          headers: { Authorization: token },
        }
        );
        setUserList(response.data.data);
        }
        catch (error){
          console.log(error);
        }
          };

          useEffect(()=>{
            getList();
          },[]);

  return (
    <>
      <Header
        title="Users List"
        description="You can now add your items that any user can order it from the Application and you can edit"
      />




   {<div className="table-container text-center px-5 my-3">
          {usersList.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Image</th>
                  <th scope="col">phone</th>
                  
                </tr>
              </thead>
              <tbody>


                {usersList.map((user) => (
                  <tr key={user.id}>
                    <th scope="row">{user.id}</th>
                    <td>{user.userName}</td>
                    <td>{user.email}</td>
                    <td>{user.imagePath?(<img className=" imagemodify" src={`https://upskilling-egypt.com/${user.imagePath}`} alt="" />):(<img className="imagemodify" src={noData} alt="noData" />)} </td>
                    <td>{user.phoneNumber}</td>
                   
                  </tr>
                ))}
              </tbody>
            </table>
          )                                 
          
          
                                                  : (
                                                    <NoData/>
          
          )}
          </div>}
    </>
  );
}
