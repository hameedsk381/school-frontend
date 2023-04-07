import { Box } from "@mui/material";
import React, { useState } from "react";
import Collegepics from "./Collegepics";

const ImageUploader = () => {
    const [selectedImages, setSelectedImages] = useState([]);


  const handleDrop = (e) => {
    e.preventDefault();
    const files = [...e.dataTransfer.files];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImages((prevImages) => [...prevImages, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  

  return (
    <Box
    onDrop={handleDrop}
    onDragOver={handleDragOver}
    style={{ border: "1px dashed black", padding: 20 }}
  >
    <div>Drop images here</div>
    {selectedImages.map((image) => (
      <img
        key={image}
        src={image}
        alt="Selected"
        style={{ width: 200, height: 200, margin: 10 }}
      />
    ))}

  </Box>
  );
};

export default ImageUploader;
