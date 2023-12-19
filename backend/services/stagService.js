const stagModel = require('../models/stagModel');

const handleError = (operation, error) => {
  console.error(`Error in ${operation} service:`, error);
  throw error;
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
    const values = [
      newObject.requestId,
      newObject.title,
      newObject.description,
      newObject.requestedBy,
      newObject.sotType,
      newObject.sotProperties,
      ...Array.from({ length: 16 }, (_, i) => newObject[`sotVar${i + 1}`] || null),
      newObject.platform,
      newObject.comments,
      newObject.attachments,
    ];
    return await stagModel.insertStagRequest(values);
  } catch (error) {
    handleError('createStagRequest', error);
  }
};

exports.updateStagRequest = async (newObject) => {
  try {
    const values = [
      newObject.requestId,
      newObject.title,
      newObject.description,
      newObject.requestedBy,
      newObject.sotType,
      newObject.sotProperties,
      ...Array.from({ length: 16 }, (_, i) => newObject[`sotVar${i + 1}`] || null),
      newObject.platform,
      newObject.comments,
      newObject.attachments
    ];
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
    const result = await stagModel.getStagRequestById(id);
    return result;
  } catch (error) {
    handleError('getStagRequestById', error);
  }
};

