// WrapperComponent.jsx

import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import { getAllStagRequests } from "../features/apiCalls";
import { makeStyles } from "@mui/styles";
import ModalContainer from "./ModalContainer";
import AddStagRequest from "./AddStagRequest";
import LoadingSpinner from "./LoadingSpinner";
import DashboardTable from "./DashboardTable";

const useStyles = makeStyles((theme) => ({
  linkButton: {
    textDecoration: "none",
    color: theme.palette.primary.main,
    textTransform: "capitalize",
  },
  buttonBox: {
    margin: "10px",
    marginLeft: "auto",
  },
  buttonText: {
    textTransform: "capitalize",
    margin: "0",
  },
}));

const WrapperContainer = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const classes = useStyles();
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getAllStagRequests();
      setApiData(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Initial data fetch

  const refreshData = (status, id) => {
    if (status) {
      setApiData(
        apiData.filter((val) => {
          return val.id !== id;
        })
      );
    }
  };

  const openModal = (content) => {
    setModalContent(content);
    setModalIsOpen(true);
  };

  const onCloseModal = () => {
    setModalContent(null);
    setModalIsOpen(false);
  };

  return (
    <div>
      <Box display="flex" alignItems="center">
        <div className={classes.buttonBox}>
          <Button
            className={classes.linkButton}
            startIcon={<AddIcon />}
            onClick={() =>
              openModal(
                <AddStagRequest
                  onClose={onCloseModal}
                  onDataRefresh={fetchData}
                />
              )
            }
          >
            <p className={classes.buttonText}>Add New Request</p>
          </Button>
        </div>
      </Box>
      <ModalContainer isOpen={modalIsOpen} onClose={onCloseModal}>
        {modalContent}
      </ModalContainer>
      {loading && <LoadingSpinner />}
      <DashboardTable onDataRefresh={fetchData} onModalOpen={openModal} data={apiData} onDelete={refreshData} />
    </div>
  );
};

export default WrapperContainer;
