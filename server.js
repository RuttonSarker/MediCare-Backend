const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const app = express();

app.use(morgan("dev"));

app.use(express.json({}));
app.use(
  express.json({
    extended: true,
  })
);

dotenv.config({
  path: "./config/config.env",
});

connectDB();

//200 = success, 400 = program error, 500 = server error

app.use("/api/medicare/auth", require("./routes/user"));
app.use("/api/medicare/auth/schedule", require("./routes/schedule"));
app.use("/api/medicare/auth/report", require("./routes/report"));
app.use("/api/medicare/auth/appointment", require("./routes/appointment"));

const PORT = process.env.PORT || 3000;

app.listen(
  PORT,

  console.log(`Server is running on port: ${PORT}`.red.underline.bold)
);
