const express = require("express");
const addMonthlyGoalCtrl = require("../controllers/monthly-goals/add-monthly-goal");
const getMonthlyDataCtrl = require("../controllers/monthly-goals/get-month-data");
const deleteCtrl = require("../controllers/monthly-goals/delete-monthly-goal");

const monthlyGoalsRouter = express.Router();

monthlyGoalsRouter
    .route("/:date")
    .get(getMonthlyDataCtrl.getMonthlyData)
    .post(addMonthlyGoalCtrl.addMonthlyGoal);

monthlyGoalsRouter
    .route("/delete/:date")
    .post(deleteCtrl.deleteMonthlyGoal);

module.exports = monthlyGoalsRouter;
