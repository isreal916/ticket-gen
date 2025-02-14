import React from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import "./style/imguploader.css";

function Dropzone() {
    const [img, setImg] = React.useState('none');
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
   backgroundImage: "url('"+img+"')",

};
  return (
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
      </div>
    </div>
  );
}

export default Dropzone;
