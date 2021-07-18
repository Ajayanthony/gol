const dateUtils = require("../../utils/date-utils");
const addGoalHandler = require("../../data/common/add-interval-goal-handler");

exports.addMonthlyGoal = async (req, res, next) => {
    const date = dateUtils.getStartOfMonth(req.params.date);
    const month_id = "ajay-" + date;

    const goalId = await addGoalHandler.addIntervalGoal(
        "MONTH",
        month_id,
        req
    );

    res.status(200).json({
        goalId: goalId,
    });
};
