const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectID,
    ref: "User",
  },

  date: {
    type: String,
    required: true,
  },

  bloodPressure: {
    type: String,
    required: true,
  },

  diabetesTest: {
    type: String,
    required: true,
  },
});

module.exports = Report = mongoose.model("Report", ReportSchema);
