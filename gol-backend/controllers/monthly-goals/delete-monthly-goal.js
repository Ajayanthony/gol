const dateUtils = require("../../utils/date-utils");
const deleteGoalHandler = require("../../data/common/delete-interval-goal-handler");

exports.deleteMonthlyGoal = async (req, res, next) => {
    const date = dateUtils.getStartOfMonth(req.params.date);
    const month_id = "ajay-" + date;

    await deleteGoalHandler.deleteIntervalGoal("MONTH", month_id, req, res);
};
