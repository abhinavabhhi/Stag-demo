// services/stagService.js
const stagModel = require('../models/stagModel');

exports.getAllStagRequests = async () => {
  try {
    // Perform any additional logic if needed
    const stagRequests = await stagModel.getAllStagRequests();
    return stagRequests;
  } catch (error) {
    console.error('Error in getAllStagRequests service:', error);
    throw error;
  }
};

exports.createStagRequest = async (newObject) => {
  try {
    const values = [
      newObject.title,
      newObject.description,
      newObject.requestedBy,
      newObject.sotType,
      ...Array.from({ length: 16 }, (_, i) => newObject[`sotVar${i + 1}`] || null),
      newObject.platform,
      newObject.comments,
      newObject.attachments,
    ];
    const result = await stagModel.insertStagRequest(values);
    //console.log('Insert result:', result);
    return result;
  } catch (error) {
    console.error('Error in createStagRequest service:', error);
    throw error;
  }
};
