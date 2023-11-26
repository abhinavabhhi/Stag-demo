const stagService = require('../services/stagService');

exports.getAllStagRequests = async (req, res) => {
  try {
    const stagRequests = await stagService.getAllStagRequests();
    res.json(stagRequests);
  } catch (error) {
    console.error('Error in getAllStagRequests:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.createStagRequest = async (req, res) => {
//   console.log("req", req);
  const { sotProperties, ...newObject } = req.body;

  try {
    const createdStagRequest = await stagService.createStagRequest(newObject);
    res.status(201).json(createdStagRequest);
  } catch (error) {
    console.error('Error in createStagRequest:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
