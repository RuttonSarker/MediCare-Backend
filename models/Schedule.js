const mongoose = require("mongoose");

const ScheduleSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectID,
    ref: "User",
  },

  day: {
    type: String,
    required: true,
  },

  startTime: {
    type: String,
    required: true,
  },

  endTime: {
    type: String,
    required: true,
  },
});

module.exports = Schedule = mongoose.model("Schedule", ScheduleSchema);
