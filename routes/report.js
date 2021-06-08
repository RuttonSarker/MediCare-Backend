const express = require("express");
const router = express.Router();
const Report = require("../models/Report");
const auth = require("../middleware/user_jwt");

router.post("/insert", auth, async (req, res, next) => {
  try {
    const ReportManager = await Report.create({
      user: req.user.id,
      date: req.body.date,
      bloodPressure: req.body.bloodPressure,
      diabetesTest: req.body.diabetesTest,
    });

    if (!ReportManager) {
      return res.status(400).json({
        success: false,
        msg: "Something Error!",
      });
    }

    res.status(200).json({
      success: true,
      ReportManager: ReportManager,
      msg: "Succesfully Created",
    });
  } catch (error) {
    next(error);
  }
});

router.get("/get", auth, async (req, res, next) => {
  try {
    const user = await Report.find(req.body.id);
    if (!user) {
      return res.status(400).json({
        success: false,
        msg: "Something Error!",
      });
    }

    res.status(200).json({
      success: true,
      user: user,
      msg: "Succesfully Fetched",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
