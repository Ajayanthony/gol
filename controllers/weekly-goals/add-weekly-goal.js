const dateUtils = require("../../utils/date-utils");
const addGoalHandler = require("../../data/common/add-interval-goal-handler");

exports.addWeeklyGoal = async (req, res, next) => {
  const date = dateUtils.getWeekStartDate(req.params.date);
  const week_id = "ajay-" + date;

  const goalId = await addGoalHandler.addIntervalGoal(
    "WEEK",
    week_id,
    req
  );

  res.status(200).json({
    goalId: goalId,
  });
};
