const dateUtils = require("../../utils/date-utils");
const addGoalHandler = require("../../data/common/add-interval-goal-handler");

exports.addDailyGoal = async (req, res, next) => {
  
  const date = dateUtils.getStartOfDay(req.params.date);
  const day_id = "ajay-" + date;

  const goalId = await addGoalHandler.addIntervalGoal(
    "DAY",
    day_id,
    req
  );

  res.status(200).json({
    goalId: goalId,
  });
};
