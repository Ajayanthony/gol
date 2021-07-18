const moment = require("moment");
const { ObjectID } = require("mongodb");

const mongo = require("../../common/mongo-common-impl");
const { ltgDateFormat } = require("../../../config/constants");

async function deleteLtGoalFromGoalCol(goalId) {
    const db = await mongo.getGolDb();
    const collection = db.collection("goals");
    const result = await collection.updateOne(
        {
            _id: new ObjectID(goalId),
        },
        {
            $set: {
                is_deleted: true,
                updated_date: moment().format(ltgDateFormat),
            },
        }
    );
    return result.result.nModified;
}

module.exports = deleteLtGoalFromGoalCol;
