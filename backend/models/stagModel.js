const db = require("./db");
const dbQueries = require("../config/dbQueries");
const {
  SELECT_ALL_STAG_REQUESTS,
  INSERT_STAG_REQUEST,
  UPDATE_STAG_REQUEST,
  GET_STAG_REQUEST_BY_ID,
  DELETE_STAG_REQUEST,
} = dbQueries;

const handleModelError = (operation, error) => {
  console.error(`Error in ${operation} model:`, error);
  throw error;
};

const executeQuery = async (modelName, query, params) => {
  try {
    const [result] = await db.execute(query, params);
    return result;
  } catch (error) {
    handleModelError(modelName, error);
  }
};

// Model function to get all stag requests from the database
exports.getAllStagRequests = async () => {
  return executeQuery("getAllStagRequests", SELECT_ALL_STAG_REQUESTS);
};

// Model function to get a stag request from the database
exports.getStagRequestById = async (id) => {
  return executeQuery("getStagRequestById", GET_STAG_REQUEST_BY_ID, [id]);
};

// Model function to insert a new stag request into the database
exports.insertStagRequest = async (values) => {
  return executeQuery("insertStagRequest", INSERT_STAG_REQUEST, values);
};

// Model function to update a stag request in the database
exports.updateStagRequest = async (values, id) => {
  return executeQuery("updateStagRequest", UPDATE_STAG_REQUEST, [
    ...values,
    id,
  ]);
};

// Model function to delete a stag request from the database
exports.deleteStagRequest = async (id) => {
  return executeQuery("deleteStagRequest", DELETE_STAG_REQUEST, [id]);
};
