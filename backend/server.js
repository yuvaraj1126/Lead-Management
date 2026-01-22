const express = require("express");
const cors = require("cors");
const connectDB = require("./config/data");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());   

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/leads", require("./routes/lead.routes"));

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});
