const mongo = require("../../common/mongo-common-impl");
const ObjectID = require("mongodb").ObjectID;

async function getLtGoalById(req, res, next) {
    const db = await mongo.getGolDb();
    const collection = db.collection("goals");

    const ltg = await collection.findOne({
        _id: new ObjectID(req.params.goalId),
    });

    res.status(200).json({
        ltg: ltg,
    });
}

module.exports = getLtGoalById;
