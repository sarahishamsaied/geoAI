import React, { useState } from "react";
import axios from "axios";
import { Cloudinary } from "cloudinary-core";

const cloudinary = new Cloudinary({ cloud_name: "dcqlhlybd" });

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [responseTxt, setResponseText] = useState("");
  const [imgUrl, setImgURL] = useState("");
  const [loading, setIsLoading] = useState(false);

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
    formData.append("upload_preset", "zjxiwuoa"); // Replace with your Cloudinary upload preset

    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dcqlhlybd/image/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);

      // Handle the Cloudinary response, which contains the image URL
      const imageUrl = response.data.secure_url;
      console.log(imageUrl);
      // Now, you can send this URL to your Flask API
      sendToFlaskApi(imageUrl);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  const sendToFLask = (url: string) => {
    setIsLoading(true);
    axios
      .post("http://localhost:5000/predict", { file_url: url })
      .then((response) => {
        console.log("Processing");
        console.log(response.data);
        setIsLoading(false);
        setResponseText(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log("error");
        console.error(error);
      });
  };
  const sendToFlaskApi = (imageUrl: any) => {
    // Send the image URL to your Flask API using axios or any other method
    setIsLoading(true);
    axios
      .post("http://localhost:5000/predict", { file_url: imageUrl })
      .then((response) => {
        console.log("Processing");
        console.log(response.data);
        setIsLoading(false);
        setResponseText(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log("error");
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Image Upload</h1>
      {/* <input type="file" accept=".tiff" onChange={handleFileChange} /> */}
      <input
        type="text"
        placeholder="Enter file path"
        onChange={(e) => setImgURL(e.target.value)}
      />
      <button
        onClick={() => sendToFLask(imgUrl)}
        className="bg-blue-500 p-4 rounded-sm"
      >
        Upload
      </button>
      {loading && <p>Loading....</p>}
      {responseTxt.length > 0 && <p>{responseTxt}</p>}
    </div>
  );
};

export default Upload;
