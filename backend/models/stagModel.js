const db = require('./db');
const dbQueries = require('../config/dbQueries');
const {
  SELECT_ALL_STAG_REQUESTS,
  INSERT_STAG_REQUEST,
  UPDATE_STAG_REQUEST,
  GET_STAG_REQUEST_BY_ID,
  DELETE_STAG_REQUEST
} = dbQueries;

const handleModelError = (operation, error) => {
  console.error(`Error in ${operation} model:`, error);
  throw error;
};

exports.getAllStagRequests = async () => {
  try {
    const [rows] = await db.execute(SELECT_ALL_STAG_REQUESTS);
    return rows;
  } catch (error) {
    handleModelError('getAllStagRequests', error);
  }
};

exports.getStagRequestById = async (id) => {
  try {
    const [result] = await db.execute(GET_STAG_REQUEST_BY_ID, [id]);
    return result;
  } catch (error) {
    handleModelError('getStagRequestById', error);
  }
};

exports.insertStagRequest = async (values) => {
  try {
    const [result] = await db.execute(INSERT_STAG_REQUEST, values);
    return result;
  } catch (error) {
    handleModelError('insertStagRequest', error);
  }
};

exports.updateStagRequest = async (values, id) => {
  try {
    const [result] = await db.execute(UPDATE_STAG_REQUEST, [...values, id]);
    return result;
  } catch (error) {
    handleModelError('updateStagRequest', error);
  }
};

exports.deleteStagRequest = async (id) => {
  try {
    const [result] = await db.execute(DELETE_STAG_REQUEST, [id]);
    return result;
  } catch (error) {
    handleModelError('deleteStagRequest', error);
  }
};
