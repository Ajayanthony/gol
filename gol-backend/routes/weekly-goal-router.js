const express = require("express");
const addWeeklyGoalCtrl = require("../controllers/weekly-goals/add-weekly-goal");
const getWeeklyDataCtrl = require("../controllers/weekly-goals/get-weekly-data");
const deleteCtrl = require("../controllers/weekly-goals/delete-weekly-goal");
const weeklyGoalsRouter = express.Router();

weeklyGoalsRouter
    .route("/:date")
    .get(getWeeklyDataCtrl.getWeeklyData)
    .post(addWeeklyGoalCtrl.addWeeklyGoal);

weeklyGoalsRouter
    .route("/delete/:date")
    .post(deleteCtrl.deleteWeeklyGoal);

module.exports = weeklyGoalsRouter;
