// models/stagModel.js
const db = require('./db');
const dbQueries = require('../config/dbQueries');
const { SELECT_ALL_STAG_REQUESTS, INSERT_STAG_REQUEST } = dbQueries;

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
    //console.log('Insert result:', result);
    return result;
  } catch (error) {
    console.error('Error in insertStagRequest model:', error);
    throw error;
  }
};
