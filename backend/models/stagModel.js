const db = require('./db');
const dbQueries = require('../config/dbQueries');
const { SELECT_ALL_STAG_REQUESTS, INSERT_STAG_REQUEST, UPDATE_STAG_REQUEST, GET_STAG_REQUEST_BY_ID, DELETE_STAG_REQUEST } = dbQueries;

// Model function to get all stag requests from the database
exports.getAllStagRequests = async () => {
  try {
    const [rows] = await db.execute(SELECT_ALL_STAG_REQUESTS);
    return rows;
  } catch (error) {
    console.error('Error in getAllStagRequests model:', error);
    throw error;
  }
};

// Model function to insert a new stag request into the database
exports.insertStagRequest = async (values) => {
  try {
    const [result] = await db.execute(INSERT_STAG_REQUEST, values);
    return result;
  } catch (error) {
    console.error('Error in insertStagRequest model:', error);
    throw error;
  }
};

// Model function to update a stag request in the database
exports.updateStagRequest = async (values, id) => {
  try {
    const [result] = await db.execute(UPDATE_STAG_REQUEST, [...values, id]);
    return result;
  } catch (error) {
    console.error('Error in updateStagRequest model:', error);
    throw error;
  }
};

// Model function to delete a stag request from the database
exports.deleteStagRequest = async (id) => {
  try {
    const [result] = await db.execute(DELETE_STAG_REQUEST, [id]);
    return result;
  } catch (error) {
    console.error('Error in deleteStagRequest model:', error);
    throw error;
  }
};


exports.getStagRequestById = async(id) => {
  try {
    const [result] = await db.query(GET_STAG_REQUEST_BY_ID, [id]);
    return result;
  } catch(error) {
    console.error('Error in getStagRequestById model:', error);
    throw error;
  }
};