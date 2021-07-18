const express = require("express");
const addLtGoal = require("../controllers/long-term-goals/add-lt-goal");
const getLtGoals = require("../controllers/long-term-goals/get-lt-goals");
const deleteLtGoal = require("../controllers/long-term-goals/delete-lt-goal");
const updateLtGoalStatus = require("../controllers/long-term-goals/lt-goal-status-update");
const editLtGoal = require("../data/goal/long-term-goals/edit-lt-goal");
const getLtGoalById = require("../data/goal/long-term-goals/get-lt-goal");

const ltGoalsRouter = express.Router();

ltGoalsRouter.route("/add").post(addLtGoal);

ltGoalsRouter.route("/id/:goalId").get(getLtGoalById);

ltGoalsRouter.route("/all/:tab").get(getLtGoals);

ltGoalsRouter.route("/delete").post(deleteLtGoal);

ltGoalsRouter.route("/statusupdate/:goalId").post(updateLtGoalStatus);

ltGoalsRouter.route("/edit/:goalId").post(editLtGoal);

module.exports = ltGoalsRouter;
