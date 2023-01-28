import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import krishpic from "../images/krish.jpeg";
import otherpic from "../images/krishan.jpg";

const About = () => {
  const [userData, setUserData] = useState({});

  const navigate = useNavigate();

  const callAboutPage = async () => {
    try {
      const res = await fetch("/about", {
        method: "GET",
        headers: {
          Accept: "appllication/json",
          "Content-type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      console.log(data);
      setUserData(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  };

  useEffect(() => {
    callAboutPage();
  }, []);

  return (
    <>
      <div className="container-fluid emp-profile">
        <form method="GET">
          <div className="row">
            <div className="col-md-4">
              <div className="profile-img">
                <img
                  src={userData.name === "krish sharma" ? krishpic : otherpic}
                  alt="krishpic"
                  width="140px"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="profile-head">
                <h5>{userData.name}</h5>
                <h6>{userData.work}</h6>
                <p className="profile-rating mt-3 mb5">
                  <span> RANKING :</span> 1/10
                </p>
                <ul className="nav nav-tabs" role="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      id="home-tab"
                      data-toggle="tab"
                      href="#home"
                      role="tab"
                      aria-controls="home"
                    >
                      About
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      id="profile-tab"
                      data-toggle="tab"
                      href="#profile"
                      role="tab"
                      aria-controls="profile"
                    >
                      Timeline
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-2">
              <input
                type="submit"
                className="profile-edit-btn"
                value="Edit profile"
                name="btnAddMore"
                id=""
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-4 ">
              <div className="profile-work">
                <p>
                  <span> WORK LINK</span>
                </p>
                <a href="https://github.com/krishan-kant-57474" target="_blank">
                  Github
                </a>
                <br />
                <a href="https://github.com/krishan-kant-57474" target="_blank">
                  Instagram
                </a>
                <br />
                <a href="https://github.com/krishan-kant-57474" target="_blank">
                  Krish sharma
                </a>
                <br />
                <a href="https://github.com/krishan-kant-57474" target="_blank">
                  Website Github
                </a>
                <br />
                <br />

                <p>
                  <span>SKILLS</span>
                </p>

                <a href="https://github.com/krishan-kant-57474" target="_blank">
                  web Developer
                </a>
                <br />
                <a href="https://github.com/krishan-kant-57474" target="_blank">
                  Figma
                </a>
                <br />
                <a href="https://github.com/krishan-kant-57474" target="_blank">
                  Software Engineer
                </a>
              </div>
            </div>
            <div className="col-md-8 ps-5 about-info">
              <div className="tab-content profile-tab" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <div className="row">
                    <div className="col-md-6">
                      <label>User ID</label>
                    </div>
                    <div className="col-md-6">
                      <p>{userData._id}</p>
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>Name</label>
                    </div>
                    <div className="col-md-6">
                      <p>{userData.name}</p>
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>Email</label>
                    </div>
                    <div className="col-md-6">
                      <p>{userData.email}</p>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>Phone</label>
                    </div>
                    <div className="col-md-6">
                      <p>{userData.phone}</p>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>Profession</label>
                    </div>
                    <div className="col-md-6">
                      <p>{userData.work}</p>
                    </div>
                  </div>
                </div>

                <div
                  className="tab-pane fade"
                  id="profile"
                  role="tabpanel"
                  aria-labelledby="profile-tab"
                >
                  <div className="row">
                    <div className="col-md-6">
                      <label>Experience</label>
                    </div>
                    <div className="col-md-6">
                      <p>Expert</p>
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>Hourly Rate</label>
                    </div>
                    <div className="col-md-6">
                      <p>10$/hr</p>
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>Total Projects</label>
                    </div>
                    <div className="col-md-6">
                      <p>230</p>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>English Level</label>
                    </div>
                    <div className="col-md-6">
                      <p>Expert</p>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>Availability</label>
                    </div>
                    <div className="col-md-6">
                      <p>6 months</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default About;
