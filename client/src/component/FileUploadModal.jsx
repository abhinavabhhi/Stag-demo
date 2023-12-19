import React, { useState, useCallback } from "react";
import Dropzone from "react-dropzone";
import Modal from "react-modal";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

Modal.setAppElement("#root"); // Set the root element for accessibility

const FileUploadModal = ({ isOpen, onRequestClose, onDrop }) => {
  const [files, setFiles] = useState([]);
  const [fileSizeError, setFileSizeError] = useState(false);

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
      zIndex: 99999, // Z-index for the overlay
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

  const closeButtonStyles = {
    position: "absolute",
    top: "8px",
    right: "8px",
    cursor: "pointer",
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

  const handleDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      if(file.size <= 5 * 1024 * 1024) {
        setFileSizeError(false);
        const reader = new FileReader();
  
        reader.onload = function (e) {
          setFiles((prevFiles) => [
            ...prevFiles,
            { name: file.name, type: file.type, src: e.target.result },
          ]);
        };
  
        reader.readAsDataURL(file);

      } else {
        setFileSizeError(true);
      }
    });
  }, []);

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
  };

  const uploadFiles = () => {
    if (files && files.length > 0) {
      onDrop(files);
      setFiles([]); // Clear files when the modal is closed
      onRequestClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="File Upload Modal"
      style={modalStyles}
      disableBackdropClick
    >
      <CloseIcon style={closeButtonStyles} onClick={closeModal} />
      <h2>File Upload</h2>
      <Dropzone onDrop={handleDrop} maxFiles={5}>
        {({ getRootProps, getInputProps }) => (
          <form method="POST" encType="multipart/form-data">
            <div {...getRootProps()} style={dropzoneStyles}>
              <input {...getInputProps()} />
              <CloudUploadIcon
                style={{ padding: "5px", fontSize: 50, color: "#27272a" }}
              />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
          </form>
        )}
      </Dropzone>
      {fileSizeError && (
        <Typography variant="body2" color="error" style={{ marginTop: "8px" }}>
          File size exceeds 5 MB limit
        </Typography>
      )}
      {files.length > 0 && (
        <Grid item xs={12} md={12}>
          <h3 style={{ marginTop: "20px" }}>Selected Files</h3>
          <div
            style={{
              maxHeight: "200px", // Set the maximum height you desire
              overflowY: "auto", // Enable vertical scrollbar
            }}
          >
              {files.map((file, index) => (
                <div key={file.name} style={fileGridItemStyles}>
                  <span>{file.name}</span>
                  <IconButton onClick={() => removeFile(index)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </div>
              ))}
          </div>
        </Grid>
      )}
      <Button
        style={{ marginTop: "20px" }}
        variant="contained"
        color="primary"
        onClick={uploadFiles}
      >
        Upload
      </Button>
    </Modal>
  );
};

export default FileUploadModal;
