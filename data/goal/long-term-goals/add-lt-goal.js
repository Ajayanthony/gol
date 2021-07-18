const LtGoal = require("../../../config/lt-goal");

const mongo = require("../../common/mongo-common-impl");

async function addLtGoalToGoalsCol(req) {
    const db = await mongo.getGolDb();
    const collection = db.collection("goals");
    const request = req.body;
    let result = await collection.insertOne(new LtGoal(request));
    return result.insertedId;
}

module.exports = addLtGoalToGoalsCol;