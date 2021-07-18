const mongo = require("../../common/mongo-common-impl");
const { ltgDateFormat } = require("../../../config/constants");

const moment = require("moment");
const ObjectID = require("mongodb").ObjectID;

async function editLtGoal(req, res, next) {
    const db = await mongo.getGolDb();
    const collection = db.collection("goals");
    const updatedFields = req.body;

    const currentValue = await collection.findOne({
        _id: new ObjectID(req.params.goalId),
    });
    const last_updated_date = moment(
        currentValue.updated_date, ltgDateFormat);
    if (
        last_updated_date.isAfter(
            moment(updatedFields.prev_updated_date, ltgDateFormat)
        )
    ) {
        res.status(400).send(
            "Edit Lt goal failed as request contains stale data."
        );
        return;
    }
    delete updatedFields.prev_updated_date;
    updatedFields.updated_date = moment().format(ltgDateFormat);
    const result = await collection.updateOne(
        {
            _id: new ObjectID(req.params.goalId),
        },
        {
            $set: updatedFields,
        }
    );

    res.status(200).json({
        result: result.result.nModified,
    });
}

module.exports = editLtGoal;
