import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import jwt from "../../services/userService";
import auth from "../../services/authService";
import config from "../../config.json";
import "react-toastify/dist/ReactToastify.css";

const CarOwnerRoute = () => {
  const [userObject, setUserObject] = useState({});
  const [userArray, setUserArray] = useState([]);

  useEffect(() => {
    async function GetCarOwnerDetail() {
      try {
        const response = await auth.get(config.apiUrl + "/carowner", {
          "Content-type": "application/json; charset=UTF-8",
        });

        if (response.status >= 200 && response.status < 3000) {
          setUserObject(response.data);
          setUserArray(response.data.car);
          return;
        } 
      } catch (err) {
        if (err.response.status >= 400 && err.response.status < 500) {
          return toast.error(err.response.data);
        }

        return toast.error(err.message);
      }
    }
    GetCarOwnerDetail();
  }, []);

  return (
    <div className="px-2 mt-4">
      <h5 className="poppinsmeduim">Carowners</h5>
      <h6 className="pl-4 mt-3 ralewaysemibold">
        Welcome, {jwt.getDetails().firstName}
      </h6>

      <div className="my-5 ralewaymeduim">
        <h6 className="pl-3"></h6>

        <div className="table-control-1 mt-3 ">
          <table className="table table-sm ">
            <thead>
              <tr className="">
                <th>Email</th>
                <th>Registered Date</th>
                <th>phone Number</th>
                <th>Cars Info</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{userObject.email}</td>
                <td>{userObject.date}</td>

                <td>{userObject.phoneNum}</td>
                <td>
                  <ol>
                    {userArray.map((v) => {
                      return (
                        <ol>
                          <li>{v.name}</li>
                          <li>{v.type}</li>
                          <li>{v.model}</li>
                          <li>{v.date}</li>
                          <br />
                        </ol>
                      );
                    })}
                  </ol>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CarOwnerRoute;
