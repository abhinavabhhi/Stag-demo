import React from "react";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #fff",
    boxShadow: 24,
    borderRadius: 4,
    p: 4,
  },
  closeButton: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
    cursor: "pointer",
    zIndex: 99999,
    color: "#000",
    backgroundColor: theme.palette.background.paper,
    borderRadius: "50%"
  },
}));

const ModalContainer = ({ isOpen, onClose, children }) => {
  const classes = useStyles();
  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className={classes.modal}>
        <CloseIcon className={classes.closeButton} onClick={onClose} />
        {children}
      </div>
    </Modal>
  );
};

export default ModalContainer;
