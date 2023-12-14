const stagService = require("../services/stagService");

const handleRequest = async (handler, req, res) => {
  try {
    const result = await handler(req.body);
    res.status(200).json(result);
  } catch (error) {
    console.error(`Error in ${handler.name}:`, error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAllStagRequests = async (req, res) => {
  handleRequest(stagService.getAllStagRequests, req, res);
};

exports.createStagRequest = async (req, res) => {
  handleRequest(stagService.createStagRequest, req, res);
};

exports.updateStagRequest = async (req, res) => {
  handleRequest(stagService.updateStagRequest, req, res);
};

exports.getAllAttachments = async (req, res) => {
  handleRequest(stagService.getAllAttachments, req, res);
};

exports.deleteStagRequest = async (req, res) => {
  handleRequest(stagService.deleteStagRequest, req, res);
};
