const stagModel = require('../models/stagModel');

const handleError = (operation, error) => {
  console.error(`Error in ${operation} service:`, error);
  throw error;
};

const RequestData = (newObject) => {
  const {
    requestId,
    title,
    description,
    requestedBy,
    sotType,
    sotProperties,
    platform,
    comments,
    attachments,
  } = newObject;

  const sotVars = Array.from({ length: 16 }, (_, i) => newObject[`sotVar${i + 1}`] || null);

  return [
    requestId,
    title,
    description,
    requestedBy,
    sotType,
    sotProperties,
    ...sotVars,
    platform,
    comments,
    attachments,
  ];
};

exports.getAllStagRequests = async () => {
  try {
    return await stagModel.getAllStagRequests();
  } catch (error) {
    handleError('getAllStagRequests', error);
  }
};

exports.createStagRequest = async (newObject) => {
  try {
    const values = RequestData(newObject);
    return await stagModel.insertStagRequest(values);
  } catch (error) {
    handleError('createStagRequest', error);
  }
};

exports.updateStagRequest = async (newObject) => {
  try {
    const values = RequestData(newObject);
    return await stagModel.updateStagRequest(values, newObject.id);
  } catch (error) {
    handleError('updateStagRequest', error);
  }
};

exports.deleteStagRequest = async (id) => {
  try {
    return await stagModel.deleteStagRequest(id);
  } catch (error) {
    handleError('deleteStagRequest', error);
  }
};

exports.getStagRequestById = async (id) => {
  try {
    return await stagModel.getStagRequestById(id);
  } catch (error) {
    handleError('getStagRequestById', error);
  }
};

