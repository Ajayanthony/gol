const dateUtils = require("../../utils/date-utils");
const getDataHandler = require("../../data/common/get-interval-data-handler");

exports.getMonthlyData = async (req, res, next) => {
    const date = dateUtils.getStartOfMonth(req.params.date);
    const month_id = "ajay-" + date;

    const data = await getDataHandler.getIntervalData(
        "MONTH",
        month_id
    );

    res.status(200).json({
        interval_data: data,
    });
};
