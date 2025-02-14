import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./form.css";
import { useDropzone } from "react-dropzone";
import axios from "axios";

import Progress from "../components/progress";
import AccessType from "../components/access";
import ticketTypes from "../data";
import Button from "../components/button";
import Dropzone from "../components/imguploader";

const Form = () => {
  const [img, setImg] = React.useState("none");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    ticketNumber: "1",
    ticketType:"Regular"
  });
  const [show, setShow] = useState(1);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    let tempErrors = {};

    if (!formData.name) tempErrors.name = "Name is required";
    if (img == "none") tempErrors.img = "Name is required";
    if (!formData.email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is invalid";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    const combinedData = {
      ...formData,
      img: img,
    };
    e.preventDefault();
    if (validate()) {
      alert("Form data submitted: " + JSON.stringify(combinedData));
      localStorage.setItem("formData", JSON.stringify(combinedData));

      // Handle form submission logic here
      console.log("Form data submitted:", combinedData);
    } else {
      toast.error("Please fix the errors in the form");
    }
  };



  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUD_NAME
        }/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
      setImg(response.data.url);
    },
  });

  const imgStyle = {
    backgroundImage: "url('" + img + "')",
  };
  const handleAccess = (ev,type) => {
    // alert("You have selected the "+data.type+" access ticket");
    document
      .querySelectorAll(".access-button")
      .forEach((button) => button.classList.remove("active"));

    ev.currentTarget.classList.add("active");
    formData.ticketType = type;
  };
  return (
    <>
      
    { (show == 1)? <div className="form-container one">
        <div className="form-header">
          <p>Ticket Selection</p> <span>step 1/3</span>
        </div>
        <Progress value={33} />
        <div className="form-body">
          <div className="event-details">
            <p className="event-name">Techember Fest ”25</p>
            <p>
              Join us for an unforgettable experience at [techist]! Secure your
              spot now.
            </p>
            <p>📍 [Bayeku,Igbogbo] || March 15, 2025 | 7:00 PM</p>
          </div>
          <Progress value={0} />
          <div className="ticket-form">
            <p>Select Ticket Type:</p>
            <div className="ticket-type">
              {ticketTypes.map((ticket, index) => (
                <AccessType
                  key={index}
                  data={ticket}
                  handleClick={handleAccess}
                />
              ))}
            </div>
          </div>
          <div className="num-ticket">
            <p>Number of Tickets</p>
            <select
              name="ticketNumber"
              id="nTicket"
              value={formData.ticketNumber}
              onChange={handleChange}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="action-button">
            <Button text="cancel" backgroundColor="#041E23" />
            <Button text="Next" backgroundColor="#24A0B5" onClick={()=>setShow(2)}/>
          </div>
        </div>
      </div>:
      <div className="form-container two">
        <div className="form-header">
          <p>Attendee Details</p> <span>step 2/3</span>
        </div>
        <Progress value={60} />
        <div className="form-body">
          <div className="image-upload">
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <div className="dropZone" style={imgStyle}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <path
                    d="M25.264 14.816C24.6813 10.2266 20.7507 6.66663 16.0053 6.66663C12.3307 6.66663 9.13866 8.81463 7.68133 12.2C4.81733 13.056 2.672 15.76 2.672 18.6666C2.672 22.3426 5.66266 25.3333 9.33866 25.3333H10.672V22.6666H9.33866C7.13333 22.6666 5.33866 20.872 5.33866 18.6666C5.33866 16.7946 6.93733 14.9906 8.90266 14.6453L9.67733 14.5093L9.93333 13.7653C10.8707 11.0306 13.1973 9.33329 16.0053 9.33329C19.6813 9.33329 22.672 12.324 22.672 16V17.3333H24.0053C25.476 17.3333 26.672 18.5293 26.672 20C26.672 21.4706 25.476 22.6666 24.0053 22.6666H21.3387V25.3333H24.0053C26.9467 25.3333 29.3387 22.9413 29.3387 20C29.3371 18.8047 28.9348 17.6444 28.1962 16.7046C27.4575 15.7649 26.4251 15.0999 25.264 14.816Z"
                    fill="#FAFAFA"
                  />
                  <path
                    d="M17.3387 18.6666V13.3333H14.672V18.6666H10.672L16.0053 25.3333L21.3387 18.6666H17.3387Z"
                    fill="#FAFAFA"
                  />
                </svg>
                {isDragActive ? (
                  <p>Drop the image here ...</p>
                ) : (
                  <p> Drag & drop or click to upload</p>
                )}
                {errors.img && <p className="text-error">{errors.img}</p>}
              </div>
            </div>
          </div>
          <Progress value={0} />
          <div className="form-control">
            <p>Enter your name</p>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="text-error">{errors.name}</p>}
          </div>
          <div className="form-control">
            <p>Enter your email*</p>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="text-error">{errors.email}</p>}
          </div>
          <div className="form-control">
            <p>About the project</p>
            <textarea
              name="message"
              rows="5"
              placeholder="Textarea"
              value={formData.message}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="action-buttons">
            <Button text="Back" backgroundColor="#041E23" onClick={()=>setShow(1)} />
            <Button
              text="Get My Free Ticket"
              backgroundColor="#24A0B5"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>}
    
    </>
  );
};

export default Form;
