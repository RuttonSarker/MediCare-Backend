const express = require("express");
const router = express.Router();
const Schedule = require("../models/Schedule");
const auth = require("../middleware/user_jwt");

router.post("/insert", auth, async (req, res, next) => {
  try {
    const scheduleManager = await Schedule.create({
      user: req.user.id,
      day: req.body.day,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
    });

    if (!scheduleManager) {
      return res.status(400).json({
        success: false,
        msg: "Something Error!",
      });
    }

    res.status(200).json({
      success: true,
      scheduleManager: scheduleManager,
      msg: "Succesfully Created",
    });
  } catch (error) {
    next(error);
  }
});

router.get("/time", auth, async (req, res, next) => {
  try {
    const scheduleManager = await Schedule.find({
      user: req.user.id,
      day: req.body.day,
    });

    if (!scheduleManager) {
      return res.status(400).json({
        success: false,
        msg: "Something Error!",
      });
    }
    res.status(200).json({
      success: true,
      scheduleManager: scheduleManager,
      msg: "Succesfully Fetched",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
