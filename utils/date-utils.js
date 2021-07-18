const moment = require("moment");
const {
    intervalIdSuffixFormat,
    monthIdSuffixFormat,
} = require("../config/constants");

exports.getStartOfDay = (dateStr_d_MM_YYYY) => {
    return moment(dateStr_d_MM_YYYY, "DD-MM-YYYY")
        .startOf("day")
        .format(intervalIdSuffixFormat);
};

exports.getWeekStartDate = (dateStr_d_MM_YYYY) => {
    const temp = moment(dateStr_d_MM_YYYY, "DD-MM-YYYY");
    return temp.day() == 0
        ? temp.day(-6).format(intervalIdSuffixFormat)
        : temp.day(1).format(intervalIdSuffixFormat);
};

exports.getStartOfMonth = (dateStr_d_MM_YYYY) => {
    return moment(dateStr_d_MM_YYYY, "DD-MM-YYYY")
        .startOf("month")
        .format(monthIdSuffixFormat);
};
