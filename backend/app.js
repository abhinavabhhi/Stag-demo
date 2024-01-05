const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const routes = require("./routes/index.js");
const config = require("./config/config.js");

const corsOptions = config.corsOptions;
const PORT = process.env.PORT || 8800;

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cors(corsOptions));
app.use("/api", routes);

app.get("/", (req, res) => {
  res.json("Hello from the backend!!");
});

app.post("/api/stagRequest/createIssue", async (req, res) => {
  try {
    const auth = {
      username: 'abhinav.alkuchi@sephora.com',
      password: 'MTcxODMxODE1NTg3OvLi1tS52jg1RYKgmummdA1522Z5'
    };
    const baseUrl = 'https://jira.sephora.com';
    const data = req.body;
    console.log("data====", data);
    const config = {
      headers: { 'Content-Type': 'application/json' },
      auth: auth
    };
    const response = await axios.post(`${baseUrl}/rest/api/2/issue`, data, config);
    console.log("response===", response);
    return response.data.key;
  } catch (error) {
    console.log('error: ')
    console.log(error.response.data.errors)
  }
});

app.listen(PORT, () => {
  console.log(`Connected to Backend! Listening on port ${PORT}`);
});

function getJiraHeaders() {
  const jiraToken = 'MTcxODMxODE1NTg3OvLi1tS52jg1RYKgmummdA1522Z5';
  const jiraAuth = 'abhinav.alkuchi@sephora.com:' + jiraToken;
  
  return {
    Authorization: `Basic ${Buffer.from(jiraAuth).toString("base64")}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };
}
