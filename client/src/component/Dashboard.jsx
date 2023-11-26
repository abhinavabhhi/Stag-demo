import React, { useState, useEffect } from "react";
import axios from "axios";
import DashboardTable from "./DashboardTable";
import { Link } from 'react-router-dom';

export const Dashboard = () => {
  const [apiData, setApiData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8800/api/stagRequest");
        setApiData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
         <p><Link to="/add">Stag Request</Link></p>
      <DashboardTable data={apiData} />
    </div>
  );
};
