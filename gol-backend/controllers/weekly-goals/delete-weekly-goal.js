const dateUtils = require("../../utils/date-utils");
const deleteGoalHandler = require("../../data/common/delete-interval-goal-handler");

exports.deleteWeeklyGoal = async (req, res, next) => {
    const date = dateUtils.getWeekStartDate(req.params.date);
    const week_id = "ajay-" + date;

    await deleteGoalHandler.deleteIntervalGoal(
        "WEEK",
        week_id,
        req,
        res
    );
};
