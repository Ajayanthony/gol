const deleteLtGoalFromGoalCol = require("../../data/goal/long-term-goals/delete-lt-goal");
const { getGolDb } = require("../../data/common/mongo-common-impl");
const { Intervals } = require("../../config/intervals");
const { ObjectID } = require("mongodb");

async function deleteLtGoal(req, res, next) {
    const db = await getGolDb();
    const collection = db.collection(
        Intervals.get("LONGTERM").collection_name
    );
    const goalId = req.body.goalId;
    const query = {};
    query[Intervals.get("LONGTERM").id] = "ajay";
    query["current"] = {
        $elemMatch: { $eq: new ObjectID(goalId) },
    };

    const isGoalIdValid = await collection.findOne(query);
    if (!isGoalIdValid) {
        res.status(404).send(
            "LT Goal not found."
        );
        return;
    }

    await collection.updateOne(query, {
        $pullAll: { current: [new ObjectID(goalId)] },
        $push: { deleted: new ObjectID(goalId) },
    });

    const goalColResNModified = await deleteLtGoalFromGoalCol(goalId);

    res.status(200).json({
        result: goalColResNModified,
    });
}

module.exports = deleteLtGoal;