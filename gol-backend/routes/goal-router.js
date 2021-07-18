const express = require("express");
const editGoalHandler = require("../data/goal/edit-goal");
const goalStatusHandler = require("../data/goal/goal-status-update");

const goalsRouter = express.Router();

goalsRouter.post("/edit/:goalId", editGoalHandler.editGoal);

goalsRouter.post(
    "/statusupdate/:goalId",
    goalStatusHandler.updateGoalStatus
);

module.exports = goalsRouter;
