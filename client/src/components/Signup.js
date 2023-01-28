import React, { useState } from "react";
// import signpic from "../images/logo.png";
import { NavLink, useNavigate } from "react-router-dom";


var signpic="https://img.freepik.com/free-vector/flat-creativity-concept-illustration_52683-64279.jpg?t=st=1654425854~exp=1654426454~hmac=ab7353feb4fc0d7b698f1071652da17aedde78a414d511e970cb44f787f3a2a0&w=1380";


const Signup = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: "",
  });

  let name, value;

  const handleInputes = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const postData = async (e) => {
    e.preventDefault();
    const { name, email, phone, work, password, cpassword } = user;
    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        work,
        password,
        cpassword,
      }),
    });
    const data = await res.json();

    if (data.status === 422 || !data) {
      window.alert("invalid registratiion");
      console.log("invalid registratiion");
    } else {
      window.alert("successfull registratiion");
      console.log("successfull registratiion");

      navigate("/login");
    }
  };


  return (
    <>
      <section className="signup">
        <div className="signup-t">
         
            <div className="signup-form">
              <h2 className="form-title">Sign up</h2>
              <form method="POST" className="register-form" id="register-form">
                <div className="form-group">
                  <label htmlFor="name">
                    <i class="zmdi zmdi-account"></i>
                  </label>
                  
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="off"
                    placeholder="Your Name"
                    value={user.name}
                    onChange={handleInputes}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    <i class="zmdi zmdi-email"></i>
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    autoComplete="off"
                    placeholder="Your Email"
                    value={user.email}
                    onChange={handleInputes}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">
                    <i class="zmdi zmdi-phone-in-talk"></i>
                  </label>
                  <input
                    type="number"
                    name="phone"
                    id="phone"
                    autoComplete="off"
                    placeholder="Your Phone"
                    value={user.phone}
                    onChange={handleInputes}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="work">
                    <i class="zmdi zmdi-slideshow"></i>
                  </label>
                  <input
                    type="text"
                    name="work"
                    id="work"
                    autoComplete="off"
                    placeholder="Your Profession"
                    value={user.work}
                    onChange={handleInputes}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">
                    <i class="zmdi zmdi-lock"></i>
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="off"
                    placeholder="Your Password"
                    value={user.password}
                    onChange={handleInputes}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cpassword">
                    <i class="zmdi zmdi-lock"></i>
                  </label>
                  <input
                    type="password"
                    name="cpassword"
                    id="cpassword"
                    autoComplete="off"
                    placeholder="Confirm Your Password"
                    value={user.cpassword}
                    onChange={handleInputes}
                  />
                </div>
                <div className="form-button">
                  <input
                    type="submit"
                    name="signup"
                    id="signup"
                    className="form-submit"
                    value="register"
                    onClick={postData}
                  />
                </div>
              </form>
            </div>

            <div className="signup-image">
              <figure>
                <img src={signpic} alt="pic" width="400px" />
              </figure>
              <NavLink to="/login" className="signup-image-link">
                I am already register
              </NavLink>
            </div>
          </div>
      
      </section>
    </>
  );
};

export default Signup;
