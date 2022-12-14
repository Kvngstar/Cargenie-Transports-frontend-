import React, { useState, useEffect } from "react";
import {  toast } from "react-toastify";
import config from "../../../config.json";
import "react-toastify/dist/ReactToastify.css";
import auth from "../../../services/authService";
import jwt from "../../../services/userService";
import NotifyBox from "../../../component/notifybox";
import "./homepage.css";

const Notification = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [newArray, setNewArray] = useState([]);
  var [length, setLength] = useState([]);
  const [count, setCount] = useState(0);
  const [slicedArray, setSlicedArray] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [loading, setLoading] = useState(true);

  function Paginate(event) {
    const pageNum = event.target.innerHTML;
    length.forEach((v) => {
      if (v == pageNum) {
        setActivePage(v);
      }
    });
    let startNum = (pageNum - 1) * 3;

    setSlicedArray(newArray.slice(startNum, count).splice(0, 3));
  }
  async function getNotification() {
    try {
      const response = await auth.get(config.apiUrl + "/notification", {
        "Content-type": "application/json; charset=UTF-8",
      });

      if (response.status >= 200 && response.status < 400) {
        setNewArray(response.data);
        setCount(response.data.length);
        setSlicedArray(() => {
          return response.data.slice(0, response.data.length).splice(0, 3);
        });

        setLength(() => {
          return [
            ...Array(Math.ceil(response.data.length / 3) + 1).keys(),
          ].slice(1);
        });
        setLoading(false);

        return;
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500
      ) {
        return toast.error(error.response.data);
      }

      return toast.error(error.message);
    }
  }
  useEffect(() => {
    getNotification();
  }, []);
  function handleState(event) {
    const { name, value } = event.target;

    setFormData((v) => {
      return { ...v, [name]: value };
    });
  }
  async function SendData(event) {
    event.preventDefault();

    if (formData.title.trim() == "" || formData.description.trim() == "") {
      return toast.error("No input should be empty");
    }
    try {
      const response = await auth.post(
        config.apiUrl + "/notification",
        formData,
        {
          "Content-type": "application/json; charset=UTF-8",
        }
      );

      if (response.status >= 200 && response.status < 400) {
        toast.success(response.data);
        getNotification();
        formData.title = "";
        formData.description = "";
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500
      ) {
        return toast.error(error.response.data);
      }

      return toast.error(error.message);
    }
  }

  return (
    <div className="px-2 mt-4">
      <h4 className="poppinsmeduim fontsize14"> Notification Center ({count}) </h4>
      <h6 className="pl-4 mt-3 ralewaysemibold">Welcome, {jwt.getDetails().firstName}</h6>
      <div className="container mt-5 pb-2 ralewaymeduim">
        {jwt.getDetails().as == "admin" && (
          <div class="input-group lightback">
            <div class="input-group-prepend">
              <span class="input-group-text bg-transparent" id="">
                <span class="material-symbols-outlined">
                  notifications_active
                </span>
              </span>
            </div>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleState}
              class="form-control"
              placeholder="Title"
            />
            <textarea
              className="form-control w-50"
              value={formData.description}
              onChange={handleState}
              placeholder="Message"
              name="description"
              id=""
              cols="50"
              rows="1"
            />
            <button
              type="submit d-inline"
              onClick={SendData}
              className="btn btn-success input-group-append"
            >
              <span class="material-symbols-outlined">send</span>
            </button>
          </div>
        )}
          <div className="p" style={{minHeight: "300px"}}  >
          {loading ? (
              <div className="preloadcont" >
                <div></div>
                <div className="middleelement"></div>
                <div></div>
              </div>
            ) : slicedArray.map((v) => {
          return (
            <NotifyBox
              title={v.title}
              seen={v.seen}
              date={v.Date}
              desc={v.description}
            />
          );
        })}
      </div>
      </div>

      <nav aria-label="..." className="mt-3 mb-3">
        <ul class="pagination pagination-sm">
          {length.map((v) => {
            return (
              <li class="page-item lightback" onClick={Paginate}>
                <a class="page-link">{v}</a>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="text-center bg-light mb-3">page - {activePage}</div>
    </div>
  );
};

export default Notification;
