const mongo = require("../common/mongo-common-impl");
const moment = require("moment");

exports.addGoal = async (req) => {
    const db = await mongo.getGolDb();
    const collection = db.collection("goals");
    const request = req.body;
    let result = await collection.insertOne({
        goal_title: request.goal_title,
        goal_description: request.goal_description,
        created_date: moment().toString(),
        updated_date: moment().toString(),
        priority: request.priority,
        goal_type: request.goal_type,
        start_date: request.start_date,
        actual_val: 0,
        target_val: request.target_val || 0,
        status: "in_progress",
    });
    return result.insertedId;
};
