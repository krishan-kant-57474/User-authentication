import React, { useState, useEffect } from "react";
import phone from "../images/phone.png";
import email from "../images/email.png";
import address from "../images/address.png";



const Contact = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const userContact = async () => {
    try {
      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });

      const data = await res.json();
      console.log(data);
      setUserData({
        ...userData,
        name: data.name,
        email: data.email,
        phone: data.phone,
      });

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userContact();
  }, []);

  //we are storing data

  const handalInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };

  // send the data to backend

  const contactForm = async (e) => {
    e.preventDefault();

    const { name, email, phone, message } = userData;

    const res = await fetch("/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        message,
      }),
    });
    const data = await res.json();

    if (!data) {
      console.log("message not send");
    } else {
      alert("message send");
      setUserData({ ...userData, message: "" });
    }
  };

  return (
    <>
      <div className="main_contact">
        <div className="contact-info">
          <div className="contact-info-item d-flex justify-content-lg-start align-items-center t1">
            <img src={phone} alt="Phone" width="50px" />
            <div className="contact_info_item">
              <div className="contact_info_title">Phone</div>
              <div className="contact_info_text">+91 1111543 2198</div>
            </div>
          </div>
          <div className="contact-info-item d-flex justify-content-lg-start align-items-center t1">
            <img src={email} alt="Phone" width="50px" />
            <div className="contact_info_item">
              <div className="contact_info_title">Email</div>
              <div className="contact_info_text">
                Krish.sharma.57474@gmail.com
              </div>
            </div>
          </div>
          <div className="contact-info-item d-flex justify-content-lg-start align-items-center t1">
            <img src={address} alt="Phone" width="50px" />
            <div className="contact_info_item">
              <div className="contact_info_title">Address</div>
              <div className="contact_info_text">Gurgaon</div>
            </div>
          </div>
        </div>

        {/* contact us form  */}

        <div className="contant-page">
          <h3>Get in Touch</h3>

          <form id="contact_form" method="POST">
            <div className="contant-input">
              <input
                type="text"
                id="contact_form_name"
                className="cantact_from_name input_field"
                placeholder="Your Name"
                value={userData.name}
                name="name"
                required="true"
              />
              <input
                type="email"
                id="contact_form_email"
                className="cantact_from_email input_field"
                placeholder="Your Email"
                value={userData.email}
                name="email"
                required="true"
              />
              <input
                type="number"
                id="contact_form_phone"
                className="cantact_from_phone input_field"
                placeholder="Your Phone Number"
                value={userData.phone}
                name="phone"
                required="true"
              />
            </div>
            <div className="contact_text">
              <textarea
                value={userData.message}
                name="message"
                onChange={handalInput}
                className="text_field contact_form_message"
                placeholder="Message"
                cols="93"
                rows="10"
              ></textarea>
            </div>
            <div className="contact_button">
              <button
                onClick={contactForm}
                type="submit"
                className="button contact_submit_button"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
