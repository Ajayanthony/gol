const { ltgDateFormat } = require("./constants");
const moment = require("moment");

class LtGoal {
    constructor(req) {
        this.goal_title = req.goal_title;
        this.description = req.description;
        this.outcome = req.outcome;
        this.obstacles = req.obstacles;
        this.plan = req.plan;
        this.created_date = moment().format(ltgDateFormat);
        this.updated_date = moment().format(ltgDateFormat);
        this.priority = req.priority;
        this.goal_type = req.goal_type;
        this.total_parts = req.total_parts;
        this.completed_parts = 0;
        this.is_deleted = false;
        this.is_long_term = true;
        this.target_date = req.target_date;
        this.closing_comment = "N/A";
    }
}

module.exports = LtGoal;

// id;
// goal_title;
// description;
// outcome;
// obstacles;
// plan;
// created_date;
// updated_date;
// priority;
// goal_type;
// total_parts;
// completed_parts;
// is_deleted;
// is_long_term;
// target_date;
// closing_comment;
