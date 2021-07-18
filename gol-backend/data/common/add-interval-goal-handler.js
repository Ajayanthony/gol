const mongo = require("./mongo-common-impl");
const addGoalHandler = require("../goal/add-goal");
const Intervals = require("../../config/intervals").Intervals;

exports.addIntervalGoal = async (interval_type, interval_id, req) => {
    const goalId = await addGoalHandler.addGoal(req);

    const db = await mongo.getGolDb();
    const collection = db.collection(
        Intervals.get(interval_type).collection_name
    );

    const query = {};
    query[Intervals.get(interval_type).id] = interval_id;

    await collection.updateOne(
        query,
        {
            $setOnInsert: query,
            $push: { goals_list: goalId },
        },
        { upsert: true }
    );

    return goalId;
};
