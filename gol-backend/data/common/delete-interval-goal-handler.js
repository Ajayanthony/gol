const mongo = require("./mongo-common-impl");
const deleteGoalHandler = require("../goal/delete-goal");
const Intervals = require("../../config/intervals").Intervals;
const ObjectID = require("mongodb").ObjectID;

exports.deleteIntervalGoal = async (
    interval_type,
    interval_id,
    req,
    res
) => {
    const db = await mongo.getGolDb();
    const collection = db.collection(
        Intervals.get(interval_type).collection_name
    );
    const query = {};
    query[Intervals.get(interval_type).id] = interval_id;
    query["goals_list"] = {
        $elemMatch: { $eq: new ObjectID(req.body.goalId) },
    };
    console.log(query);

    const isGoalIdValid = await collection.findOne(query);
    if (!isGoalIdValid) {
        res.status(404).send(
            "Goal not found for selected interval or is already deleted."
        );
        return;
    }

    await collection.updateOne(query, {
        $pullAll: { goals_list: [new ObjectID(req.body.goalId)] },
        $push: { deleted_goals_list: new ObjectID(req.body.goalId) },
    });

    const goalCollectionRes = await deleteGoalHandler.baseDeleteGoal(
        req
    );

    res.status(200).json({
        result: goalCollectionRes.result.nModified,
    });
};
