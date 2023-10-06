import React, { useState } from "react";
import axios from "axios";
import { Cloudinary } from "cloudinary-core";

const cloudinary = new Cloudinary({ cloud_name: "dcqlhlybd" });

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e: any) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select an image.");
      return;
    }

    // Upload the selected file to Cloudinary
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", "ukv0dwix"); // Replace with your Cloudinary upload preset

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dcqlhlybd/image/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Handle the Cloudinary response, which contains the image URL
      const imageUrl = response.data.secure_url;

      // Now, you can send this URL to your Flask API
      sendToFlaskApi(imageUrl);
    } catch (error) {
      console.error(error);
    }
  };

  const sendToFlaskApi = (imageUrl: any) => {
    // Send the image URL to your Flask API using axios or any other method
    axios
      .post("http://localhost:5000/predict", { file_url: imageUrl })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Image Upload</h1>
      <input
        type="file"
        accept=".jpg, .jpeg, .png"
        onChange={handleFileChange}
      />
      <button onClick={handleUpload} className="bg-blue-500 p-4 rounded-sm">
        Upload
      </button>
    </div>
  );
};

export default Upload;
