const db = require('./db');
const dbQueries = require('../config/dbQueries');
const { SELECT_ALL_STAG_REQUESTS, INSERT_STAG_REQUEST, UPDATE_STAG_REQUEST, UPLOAD_ATTACHMENTS, GET_UPLOADED_ATTACHMENTS, DELETE_STAG_REQUEST } = dbQueries;

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

// Model function to upload attachments into the database
exports.uploadAttachments = async (values) => {
  try {
    const promises = values.map(item => db.execute(UPLOAD_ATTACHMENTS, item));
    await Promise.all(promises);
    console.log('Files inserted into MySQL');
    return { success: true };
  } catch (error) {
    console.error('Error uploading attachments to MySQL:', error);
    throw error;
  }
};

// Model function to get all attachments from the database
exports.getAllAttachments = async () => {
  try {
    const [rows] = await db.execute(GET_UPLOADED_ATTACHMENTS);
    return rows;
  } catch (error) {
    console.error('Error in getAllAttachments model:', error);
    throw error;
  }
};

// Model function to delete a stag request from the database
exports.deleteStagRequest = async (req) => {
  try {
    const query = `${DELETE_STAG_REQUEST}${req}`;
    const [result] = await db.query(query);
    return result;
  } catch (error) {
    console.error('Error in deleteStagRequest model:', error);
    throw error;
  }
};
