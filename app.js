const express = require("express");
const app = express();
const cors = require("cors");

const indexRoutes = require("./routes/index.js");

app.use(cors());

app.use(indexRoutes)

app.listen(3000, () => {
  console.log("Started server");
});