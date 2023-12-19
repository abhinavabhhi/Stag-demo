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

exports.getStagRequestById = (req, res) => {
  const { id } = req.params;
  stagService.getStagRequestById(id)
    .then((result) => {
      res.send({
        success: true,
        data: result && result.length ? result[0] : [],
        message: "Request retrieved successfully",
      });
    })
    .catch((error) => {
      console.error('Error view stag request:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    });
};

exports.createStagRequest = async (req, res) => {
  handleRequest(stagService.createStagRequest, req, res);
};

exports.updateStagRequest = async (req, res) => {
  handleRequest(stagService.updateStagRequest, req, res);
};

exports.deleteStagRequest = async (req, res) => {
  const { id } = req.params;
  try {
    const results = await stagService.deleteStagRequest(id);
    res.json({ success: true, message: 'Stag request deleted successfully' });
  } catch (error) {
    console.error('Error deleting stag request:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
