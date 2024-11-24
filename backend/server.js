const express = require("express");
const { loadModels } = require("./config/modelConfig");
const path = require("path");
const app = express();
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 3000;

const apiRoutes = require("./routes/apiRoutes");

app.use(cors());
app.use(express.json());

// Load models at the start
loadModels()
  .then(() => {
    app.use("/api/textai", apiRoutes); // Use /api prefix for routes
  })
  .catch((err) => {
    console.error("Failed to load models:", err);
    process.exit(1); // Exit if models fail to load
  });

const _dirname = path.resolve();
app.use(express.static(path.join(_dirname, "/frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(_dirname, "/frontend/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
