import React, { useState, useEffect } from "react";
import Header from "../../../SharedModule/components/Header/Header";
import axios from "axios";
import noData from "../../../assets/images/noData.png";
import NoData from "../../../SharedModule/components/NoData/NoData";
import Modal from "react-bootstrap/Modal";
import DeleteModel from "../../../SharedModule/components/DeleteModel/DeleteModel";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function UserList() {
  let token = localStorage.getItem("adminToken");
  const [usersList, setUserList] = useState([]);
  const [pagesArray, setPagesArray] = useState([]);
  const [nameSearch, setNameSearch] = useState("");
  const [countrySearch, setCountrtSearch] = useState("");
  const[userId,setUserId]=useState(0);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setUserId(id);
    setShow(true);
  };

  const deleteUser = async () => {
    try {
      let response = await axios.delete(
        `https://upskilling-egypt.com:443/api/v1/Users/${userId}`,
        {
          headers: { Authorization: token },
        }
      );
      getList();
      handleClose();
      toast.success('Delete successfully')
      
    } catch (error) {
      toast.error(error);
    }
  };

  const getList = async (
    pageNo,
    pageSize,
    userName,
    country,
    groups,
    email
  ) => {
    try {
      let response = await axios.get(
        "https://upskilling-egypt.com:443/api/v1/Users",
        {
          headers: { Authorization: token },
          params: {
            pageNumber: pageNo,
            pageSize: pageSize,
            userName: userName,
            country: country,
            groups: groups,
            email: email,
          },
        }
      );
      setPagesArray(
        Array(response.data.totalNumberOfPages)
          .fill()
          .map((_, i) => i + 1)
      );
      console.log(response.data.totalNumberOfPages);
      setUserList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getNameValue = (input) => {
    // console.log(input)
    setNameSearch(input.target.value);
    getList(1, 20, input.target.value, countrySearch);
  };
  const getCountryValue = (input) => {
    // console.log(input)
    setCountrtSearch(input.target.value);
    getList(1, 20, nameSearch, input.target.value);
  };

  useEffect(() => {
    getList(1, 20);
  }, []);

  return (
    <>
      <Header
        title="Users List"
        description="You can now add your items that any user can order it from the Application and you can edit"
      />

<Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <DeleteModel />

          <div className="text-end my-3">
            <button onClick={deleteUser} className="btn btn-outline-danger">
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
          <input
            type="text"
            className="form-control"
            placeholder="Search by Country"
            onChange={getCountryValue}
          />
        </div>

        <div className="col-md-3"></div>
      </div>
      <ToastContainer />
      {
        <div className="table-container text-center px-5 ">
          {usersList.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Country</th>
                  <th scope="col">Image</th>
                  <th scope="col">phone</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {usersList.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.userName}</td>
                    <td>{user.email}</td>
                    <td>{user.country}</td>
                    <td>
                      {user.imagePath ? (
                        <img
                          className=" imagemodify"
                          src={`https://upskilling-egypt.com/${user.imagePath}`}
                          alt=""
                        />
                      ) : (
                        <img
                          className="imagemodify"
                          src={noData}
                          alt="noData"
                        />
                      )}{" "}
                    </td>
                    <td>{user.phoneNumber}</td>
                 <td> <i   onClick={() => handleShow(user.id)} className="fa fa-trash text-danger mx-2"
                        aria-hidden="true"
                      ></i></td>  
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <NoData />
          )}
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
                  onClick={() => getList(pageNo, 10)}
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
        </div>
      }
    </>
  );
}
