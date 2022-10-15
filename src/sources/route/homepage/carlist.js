import React, { useState, useEffect } from "react";

import auth from "../../../services/authService";
import jwt from "../../../services/userService";
import calendar from "../../assets/Calendar_Days.png";
import CanvasJSReact from "../../../component/canvasjs.react";
import "./homepage.css";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const CarListing = () => {
  const [carCal, setCarCal] = useState("");
  const [error, setError] = useState("");
  const [car, setCar] = useState({});
  var [calcateTotal, setCalculateTotal] = useState("");
  useEffect(() => {
    async function getCarData() {
      try {
        const response = await auth.get(
          "http://localhost:3001/gen/availablecars",
          {
            "Content-type": "application/json; charset=UTF-8",
          }
        );

        if (response.status == 200) {
          setCar(response.data);
          console.log(response.data);
          setCalculateTotal(
            parseInt(response.data.bus) +
              parseInt(response.data.sienna) +
              parseInt(response.data.truck) +
              parseInt(response.data.exquisite)
          );
          return;
        } else {
          console.log(response);
        }
      } catch (err) {
        if (err.response.status >= 400 && err.response.status < 500) {
          return setError(err.response.data);
        }

        return setError(err.message);
      }
    }
    getCarData();
  }, []);

  const options = {
    animationEnabled: true,
    title: {
      text: "",
    },
    data: [
      {
        type: "doughnut",
        dataPoints: [
          { label: "Bus", y: car.bus },
          { label: "Sienna", y: car.sienna },
          { label: "Exquisite", y: car.exquisite },
          { label: "Waybill", y: car.truck },
        ],
      },
    ],
  };

  return (
    <div className="px-2 mt-4">
      <h4>Admin DashBoard</h4>
      <h6 className="pl-4 mt-3">Welcome, Kingsley</h6>

      <div className="mt-5">
        <h4 className="pl-3">Cars Available ({calcateTotal})</h4>
        <div style={{ height: "auto", width: "100%" }} className="d-flexx">
          <div style={{ width: "100%" }} className="d-flexxx py-2">
            <div
              style={{ width: "300px" }}
              className=" m d-flex mx-2 flex-column mt-5"
            >
              {jwt.getDetails().as === "admin" && (
                <div className="my-3 py-2">
                  <form>
                    <div class="input-group ">
                      <div className="input-group-prepend w-25 px-1">
                        <input
                          type="number"
                          className="form-control"
                          name=""
                          id=""
                          min="0"
                          placeholder="0"
                        />
                      </div>
                      <select className="custom-select" name="" id="">
                        <option selected>choose</option>
                        <option value="Bus">Bus</option>
                        <option value="Sienna">Sienna</option>
                        <option value="Exquisite">Exquisite</option>
                        <option value="truck">Truck</option>
                      </select>
                      <div className="input-group-append">
                        <button className="btn btn-success">Update</button>
                      </div>
                    </div>
                  </form>
                </div>
              )}
              <div>
                <img src={calendar} className="py-2 mr-2" alt="" />
                <span>Bus ({car.bus})</span>
              </div>
              <div>
                <img src={calendar} className="py-2 mr-2" alt="" />
                <span>Sienna ({car.sienna})</span>
              </div>
              <div>
                <img src={calendar} className="py-2 mr-2" alt="" />
                <span>Exquisite ({car.exquisite})</span>
              </div>
              <div>
                <img src={calendar} className="py-2 mr-2" alt="" />
                <span>Truck ({car.truck})</span>
              </div>
            </div>
            <div style={{ width: "300px" }} className="d-flexx mt-5">
              <CanvasJSChart options={options} />
            </div>

            {!car && <div>{error}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarListing;