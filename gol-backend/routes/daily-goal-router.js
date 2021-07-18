const express = require("express");
const addDailyGoalCtrl = require("../controllers/daily-goals/add-daily-goal");
const getDayDataCtrl = require("../controllers/daily-goals/get-day-data");
const deleteDailyGoalCtrl = require("../controllers/daily-goals/delete-daily-goal");

const dailyGoalsRouter = express.Router();

dailyGoalsRouter
    .route("/:date")
    .get(getDayDataCtrl.getDayData)
    .post(addDailyGoalCtrl.addDailyGoal);

dailyGoalsRouter
    .route("/delete/:date")
    .post(deleteDailyGoalCtrl.deleteDailyGoal);

const requestTester = (req, res, next) => {
    console.log(req.params);
    console.log(req.baseUrl);
    console.log(req.method);
    console.log(req.path);
    console.log(req.body);

    res.send("api called");
};

module.exports = dailyGoalsRouter;
