const dateUtils = require("../../utils/date-utils");
const deleteGoalHandler = require("../../data/common/delete-interval-goal-handler");

exports.deleteDailyGoal = async (req, res, next) => {
    const date = dateUtils.getStartOfDay(req.params.date);
    const day_id = "ajay-" + date;

    await deleteGoalHandler.deleteIntervalGoal("DAY", day_id, req, res);
};
