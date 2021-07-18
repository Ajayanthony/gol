const dateUtils = require("../../utils/date-utils");
const getDataHandler = require("../../data/common/get-interval-data-handler");

exports.getWeeklyData = async (req, res, next) => {
    const date = dateUtils.getWeekStartDate(req.params.date);
    const week_id = "ajay-" + date;

    const data = await getDataHandler.getIntervalData(
        "WEEK",
        week_id
    );

    res.status(200).json({
        interval_data: data,
    });
};
