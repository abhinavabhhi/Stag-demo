const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const config = require("./config/config.js");
//const dbQueries = require('./config/dbQueries.js');
const routes = require('./routes');
const bodyParser = require('body-parser');
require('dotenv').config()

const app = express();
// const { SELECT_ALL_STAG_REQUESTS, INSERT_STAG_REQUEST } = dbQueries;
const corsOptions = config.corsOptions;

// Middleware
app.use(express.json());
app.use(
  cors(corsOptions)
);

const db = mysql.createConnection(config.db);
app.use(bodyParser.json());
app.use('/api', routes);

app.get("/", (req, res) => {
  res.json("hello from backend!!");
});

// app.get("/stagRequest", (req, res) => {
//   db.query(SELECT_ALL_STAG_REQUESTS, (err, data) => {
//     if (err) {
//       return res.status(500).json({ error: "Internal Server Error", details: err });
//     }
//     console.log(data);
//     return res.json(data);
//   });
// });

// app.post("/stagRequest", (req, res) => {
//   const { sotProperties, ...newObject } = req.body;

//   const values = [
//     newObject.title,
//     newObject.description,
//     newObject.requestedBy,
//     newObject.sotType,
//     ...Array.from({ length: 16 }, (_, i) => newObject[`sotVar${i + 1}`] || null),
//     newObject.platform,
//     newObject.comments,
//     newObject.attachments,
//   ];
//   db.query(INSERT_STAG_REQUEST, [values], (err, data) => {
//     if (err) {
//       return res.status(500).json({ error: "Internal Server Error", details: err });
//     }
//     return res.status(201).json(data);
//   });
// });

const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  console.log(`Connected to Backend! Listening on port ${PORT}`);
});
