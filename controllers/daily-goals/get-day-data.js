const dateUtils = require("../../utils/date-utils");
const getDataHandler = require("../../data/common/get-interval-data-handler");

exports.getDayData = async (req, res, next) => {
    const date = dateUtils.getStartOfDay(req.params.date);
    const day_id = "ajay-" + date;

    const data = await getDataHandler.getIntervalData("DAY", day_id);

    res.status(200).json({
        interval_data: data,
    });
};
