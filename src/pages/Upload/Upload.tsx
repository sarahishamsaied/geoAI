import React, { useState } from "react";
import axios from "axios";

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e: any) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(e);
    if (!selectedFile) {
      alert("Please select a TIFF image.");
      return;
    }

    const formData = new FormData();
    formData.append("file_url", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:5000/predict",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>TIFF Image Upload</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".tiff" onChange={handleFileChange} />
        <button type="submit" className="bg-blue-500 p-4 rounded-sm">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Upload;
