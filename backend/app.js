const express = require("express");
const cors = require("cors");
const routes = require("./routes/index.js");
const config = require("./config/config.js");
const corsOptions = config.corsOptions;
const PORT = process.env.PORT || 8800;
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "10mb" }));
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "10mb",
  })
  );
app.use(express.json());
app.use(cors(corsOptions));
app.use("/api", routes);

app.get("/", (req, res) => {
  res.json("hello from backend!!");
});

app.listen(PORT, () => {
  console.log(`Connected to Backend! Listening on port ${PORT}`);
});
