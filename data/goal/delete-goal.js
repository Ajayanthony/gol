const mongo = require("../common/mongo-common-impl");
const moment = require("moment");
const ObjectID = require("mongodb").ObjectID;

exports.baseDeleteGoal = async (req) => {
    const db = await mongo.getGolDb();
    const collection = db.collection("goals");
    const result = await collection.updateOne(
        {
            _id: new ObjectID(req.body.goalId),
        },
        {
            $set: {
                is_deleted: true,
                updated_date: moment().toString(),
            },
        }
    );

    return result;
};
