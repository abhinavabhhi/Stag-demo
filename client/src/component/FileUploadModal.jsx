import React, { useState } from "react";
import Dropzone from "react-dropzone";
import Modal from "react-modal";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import { uploadAttachments } from "../features/apiCalls";

Modal.setAppElement("#root"); // Set the root element for accessibility

const FileUploadModal = ({ isOpen, onRequestClose, onDrop }) => {
  const [files, setFiles] = useState([]);
  const dropzoneStyles = {
    width: "100%",
    height: "100px",
    border: "2px dashed #ccc",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    outline: "none",
  };
  const modalStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay
      zIndex: 1000, // Z-index for the overlay
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "4px",
      zIndex: 1001, // Z-index for the modal content
      overflow: "hidden",
      width: "50%",
      height: "auto",
    },
  };

  const fileGridItemStyles = {
    backgroundColor: "#f0f0f0",
    padding: "10px",
    borderRadius: "4px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
    width: "auto",
  };

  const handleDrop = (acceptedFiles) => {
    setFiles([...files, ...acceptedFiles]);
    onDrop([...files, ...acceptedFiles]); // Pass the files to the parent component if needed
  };

  const removeFile = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
    onDrop(updatedFiles); // Pass the updated files to the parent component if needed
  };

  const closeModal = async (e) => {
    e.preventDefault();
    setFiles([]); // Clear files when the modal is closed
    onRequestClose();
    // if (files) {
    //   try {
    //     //console.log('Uploading Image:', image);
    //     const formData = new FormData();
    //     formData.append("attachments", files);
    //     console.log("FormData:", formData);
    //     const response = await uploadAttachments(formData);
    //     console.log("Upload Response:", response);

    //     if (response.status === 200) {
    //       console.log("Image uploaded successfully");
    //       //   fetchImages();
    //       setFiles([]); // Clear files when the modal is closed
    //       onRequestClose();
    //     } else {
    //       console.error("Error uploading image:", response.statusText);
    //     }
    //   } catch (error) {
    //     console.error("Error uploading image:", error.message);
    //   }
    // } else {
    //   console.warn("No image selected for upload");
    // }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="File Upload Modal"
      style={modalStyles}
    >
      <h2>File Upload</h2>
      <Dropzone onDrop={handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <form method="POST" encType="multipart/form-data">
            <div {...getRootProps()} style={dropzoneStyles}>
              <input {...getInputProps()} />
              <CloudUploadIcon
                style={{ padding: "5px", fontSize: 50, color: "#009688" }}
              />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
          </form>
        )}
      </Dropzone>
      {files && files.length > 0 && (
        <>
          <h3 style={{ marginTop: "20px" }}>Selected Files</h3>
          <div>
            {files.map((file, index) => (
              <div key={file.name} style={fileGridItemStyles}>
                <span>{file.name}</span>
                <IconButton onClick={() => removeFile(index)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </div>
            ))}
          </div>
        </>
      )}
      <Button style={{ marginTop: "20px" }} variant="contained" color="primary" onClick={closeModal}>
        Close
      </Button>
    </Modal>
  );
};

export default FileUploadModal;
