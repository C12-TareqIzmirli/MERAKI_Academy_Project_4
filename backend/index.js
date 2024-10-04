const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./models/DB");
const app = express();
const PORT = 5000;
const roleRouter = require("./routes/role");
const userRouter = require("./routes/users");
const categoryRouter = require(".//routes/category");
app.use(cors());
app.use(express.json());
app.use("/roles", roleRouter);
app.use("/categories", categoryRouter);
app.use("/users", userRouter);
// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
