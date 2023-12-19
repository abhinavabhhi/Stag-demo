import axios from "axios";

const baseURL = "http://localhost:8800/api/stagRequest";

const createStagRequest = async (request) => {
  try {
    const res = await axios.post(`${baseURL}/create`, request);
    return res.data;
  } catch (err) {
    return handleAxiosError(err);
  }
};

const deleteRequestById = async (id) => {
  try {
    const res = await axios.delete(`${baseURL}/delete/${id}`);
    return res.data;
  } catch (err) {
    return handleAxiosError(err);
  }
};


const getAllStagRequests = async () => {
  try {
    const res = await axios.get(`${baseURL}/`);
    return res.data;
  } catch (err) {
    return handleAxiosError(err);
  }
};

const getStagRequestById = async (id) => {
  try {
    const res = await axios.get(`${baseURL}/view/${id}`);
    return res.data;
  } catch (err) {
    return handleAxiosError(err);
  }
};

const handleAxiosError = (error) => {
  console.error("Axios error:", error);
  return { error };
};

const updateStagRequest = async (requestData) => {
  try {
    const res = await axios.put(`${baseURL}/update`, requestData);
    return res.data;
  } catch (err) {
    return handleAxiosError(err);
  }
};

export {
  createStagRequest,
  deleteRequestById,
  getAllStagRequests,
  getStagRequestById,
  updateStagRequest,
};
