const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require('multer');
const config = require("./config/config.js");
const corsOptions = config.corsOptions;
const routes = require("./routes/index.js");
const stagModel = require("./models/stagModel");
const db = require('./models/db');
const PORT = process.env.PORT || 8800;

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use("/api", routes);

// Set up multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Middleware to handle image uploads
const uploadMiddleware = upload.array('attachments', 5);

// Handle POST request to upload image
app.post('/uploads', uploadMiddleware, async (req, res) => {
  try {
    const files = req.files.map((file) => ({
      filename: file.originalname,
      data: file.buffer, // Store binary data as buffer
      filetype: file.mimetype,
      fileSrc: imageLoad(file)
    }));
    const values = files.map((file) => [file.filename, file.filetype, file.fileSrc]);
    // Use await to handle the asynchronous nature of uploadAttachments
    await stagModel.uploadAttachments(values);
    res.json({ success: true });
  } catch (error) {
    console.error('Error during file upload:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete("/api/stagRequest/delete/:id", async (req, res) => {
  const requestId = req.params.id;
  const q = `DELETE FROM stagdemo.stag_request WHERE id=?`;
  
  try {
    const result = await db.query(q, [requestId]);
    res.send({ success: true, data: result, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/stagRequest/:id", async (req, res) => {
  try {
    const requestId = req.params.id;
    const q = 'SELECT * FROM stagdemo.stag_request WHERE id=?';

    const result = await db.query(q, [requestId]);
    console.log("result", result);
    res.send({
      success: true,
      data: result && result.length ? result[0] : [],
      message: "Request retrieved successfully"
    });
  } catch (error) {
    console.error("Error retrieving request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const imageLoad = (file) => {
  const imageType = file.mimetype;
  const imageBufferData = Buffer.from(file.buffer).toString('base64');
  return `data:${imageType};base64,${imageBufferData}`;
};

app.get("/", (req, res) => {
  res.json("hello from backend!!");
});

app.listen(PORT, () => {
  console.log(`Connected to Backend! Listening on port ${PORT}`);
});
