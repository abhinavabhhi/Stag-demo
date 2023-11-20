import express from "express";
import mysql from "mysql";
import cors from "cors"; // Import the cors middleware

const app = express();
app.use(express.json()); // Add this line to parse JSON requests
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your React app's origin
    credentials: true,
}));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "abhi123NAV@",
  database: "stagdemo",
});

// Define reusable queries
const SELECT_ALL_STAG_REQUESTS = "SELECT * FROM stagdemo.stag_request";
const INSERT_STAG_REQUEST = `INSERT INTO stag_request (
  title, description, requestedBy, sotType,
  sotVar1, sotVar2, sotVar3, sotVar4, sotVar5, sotVar6, sotVar7, sotVar8, sotVar9,
  sotVar10, sotVar11, sotVar12, sotVar13, sotVar14, sotVar15, sotVar16,
  platform, comments, attachments
) VALUES (?)`;

app.get("/", (req, res) => {
  res.json("hello from backend!!");
});

app.get("/stagRequest", (req, res) => {
  db.query(SELECT_ALL_STAG_REQUESTS, (err, data) => {
    if (err) return res.json(`some error encountered ===> ${err}`);
    return res.json(data);
  });
});

app.post("/stagRequest", (req, res) => {
  console.log("re", req.body);
  const { sotProperties, ...newObject } = req.body;
  const values = [
    newObject.title,
    newObject.description,
    newObject.requestedBy,
    newObject.sotType,
    newObject.sotVar1,
    newObject.sotVar2,
    newObject.sotVar3,
    newObject.sotVar4,
    newObject.sotVar5,
    newObject.sotVar6,
    newObject.sotVar7,
    newObject.sotVar8,
    newObject.sotVar9,
    newObject.sotVar10,
    newObject.sotVar11,
    newObject.sotVar12,
    newObject.sotVar13,
    newObject.sotVar14,
    newObject.sotVar15,
    newObject.sotVar16,
    newObject.platform,
    newObject.comments,
    newObject.attachments,
  ];
console.log("value", values);
  db.query(INSERT_STAG_REQUEST, values, (err, data) => {
    if (err) return res.status(500).send(`Internal Server Error: ${err}`);
    return res.status(201).json(data);
  });
});

app.listen("8800", () => {
  console.log("Connected to Backend!");
});
