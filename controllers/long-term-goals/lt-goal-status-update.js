const { getGolDb } = require("../../data/common/mongo-common-impl");
const { Intervals } = require("../../config/intervals");
const { ObjectID } = require("mongodb");

async function updateLtGoalStatus(req, res, next) {
    const prevStatus = req.body.prevStatus;
    const newStatus = req.body.newStatus;
    const goalId = req.params.goalId;

    const db = await getGolDb();
    const collection = db.collection(
        Intervals.get("LONGTERM").collection_name
    );

    const query = {};
    query[Intervals.get("LONGTERM").id] = "ajay";

    const result = await collection.updateOne(query, {
        $pullAll: { [prevStatus]: [new ObjectID(goalId)] },
        $push: { [newStatus]: new ObjectID(goalId) },
    });

    res.status(200).json({
        updatedCount: result.result.nModified,
    });
}

module.exports = updateLtGoalStatus;