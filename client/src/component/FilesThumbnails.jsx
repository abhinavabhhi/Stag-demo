import React, { useState, useEffect } from 'react';
import Grid from "@mui/material/Grid";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import FileIconPdf from "@mui/icons-material/PictureAsPdf";
import FileIconDefault from "@mui/icons-material/InsertDriveFile";
import CarouselSlider from "./CarouselSlider";
import ModalContainer from "./ModalContainer";

const useStyles = makeStyles((theme) => ({
  thumbnailGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
    gap: "10px",
    marginTop: "10px",
  },
  thumbnailContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    borderRadius: "4px",
    marginBottom: "10px",
    border: "1px solid #d3d3d3",
  },
  thumbnailStyles: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "flex",
    alignItems: "center",
  },
  deleteIcon: {
    margin: "5px",
    color: theme.palette.error.main,
    cursor: "pointer",
    backgroundColor: "#fff",
    position: "absolute !important",
  },
  thumbnailWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    cursor: "pointer",
  },
  fileIcon: {
    fontSize: 48,
    color: theme.palette.primary.main,
  },
}));

const FilesThumbnails = ({ label, initialData, onUpdateFiles }) => {
  const classes = useStyles();
  const [state, setState] = useState({
    selectedImageIndex: null,
    attachmentsModalOpen: false,
    files: initialData,
  });

  const handleAttachmentsClick = (attachments, index) => {
    if (attachments && attachments.length > 0) {
      setState((prevState) => ({
        ...prevState,
        selectedImageIndex: index,
        attachmentsModalOpen: true,
      }));
    }
  };

  const removeFile = (index) => {
    setState((prevState) => {
      const updatedFiles = [...prevState.files];
      updatedFiles.splice(index, 1);
      return { ...prevState, files: updatedFiles };
    });
  };

  useEffect(() => {
    onUpdateFiles(state.files);
  }, [state.files, onUpdateFiles]);

  return (
    <>
      {state.files.length > 0 && (
        <>
          <Grid item xs={12} md={12}>
            <h3 style={{ marginTop: "20px" }}>{label}</h3>
            <div className={classes.thumbnailGrid}>
              {state.files.map((file, index) => (
                <div key={index} className={classes.thumbnailContainer}>
                  <div
                    className={classes.thumbnailWrapper}
                    onClick={() => handleAttachmentsClick(state.files, index)}
                  >
                    {file.type.startsWith("image/") ? (
                      <img
                        src={file.src}
                        alt={file.name}
                        className={classes.thumbnailStyles}
                      />
                    ) : file.type === "application/pdf" ? (
                      <FileIconPdf className={classes.fileIcon} />
                    ) : (
                      <FileIconDefault className={classes.fileIcon} />
                    )}
                  </div>
                  <IconButton
                    onClick={() => removeFile(index)}
                    className={classes.deleteIcon}
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                </div>
              ))}
            </div>
          </Grid>
          <ModalContainer
            isOpen={state.attachmentsModalOpen}
            onClose={() => {
              setState((prevState) => ({
                ...prevState,
                attachmentsModalOpen: false,
                selectedImageIndex: null,
              }));
            }}
          >
            {state.files.length === 1 ? (
              <img
                src={state.files[0].src}
                alt="Attachment"
                style={{ width: "100%", marginBottom: "16px" }}
              />
            ) : (
              <CarouselSlider
                attachments={state.files}
                selectedIndex={state.selectedImageIndex}
              />
            )}
          </ModalContainer>
        </>
      )}
    </>
  );
};

export default FilesThumbnails;
