const { Intervals } = require("../../config/intervals");
const mongo = require("../../data/common/mongo-common-impl");
const addLtGoalToGoalsCol= require("../../data/goal/long-term-goals/add-lt-goal");

async function addLtGoal(req, res) {
    const goalId = await addLtGoalToGoalsCol(req);

    const db = await mongo.getGolDb();
    const collection = db.collection(
        Intervals.get("LONGTERM").collection_name
    );

    const query = {};
    query[Intervals.get("LONGTERM").id] = "ajay";

    await collection.updateOne(
        query,
        {
            $setOnInsert: query,
            $push: { current: goalId },
        },
        { upsert: true }
    );

    res.status(200).json({
        goalId: goalId,
    });
}

module.exports = addLtGoal;