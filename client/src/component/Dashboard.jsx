import React, { useState, useEffect } from "react";
import DashboardTable from "./DashboardTable";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import { getAllStagRequests } from "../features/apiCalls";
import { makeStyles } from "@mui/styles";

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

const fetchData = async (setData) => {
  try {
    const response = await getAllStagRequests();
    setData(response);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const Dashboard = () => {
  const classes = useStyles();
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    fetchData(setApiData);
  }, []);

  const refreshData = (status,id) => {
    if(status) {
      console.log("status", status, id);
      setApiData(
        apiData.filter((val) => {
          return val.id !== id;
        }));
    }
  };

  return (
    <div>
      <Box display="flex" alignItems="center">
        <div className={classes.buttonBox}>
          <Button
            component={Link}
            to="/add"
            variant="contained"
            className={classes.linkButton}
            startIcon={<AddIcon />}
          >
            <p className={classes.buttonText}>Add New Request</p>
          </Button>
        </div>
      </Box>
      <DashboardTable data={apiData} onDelete={refreshData} />
    </div>
  );
};

