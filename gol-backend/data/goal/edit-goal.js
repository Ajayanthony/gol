const mongo = require("../common/mongo-common-impl");
const moment = require("moment");
const ObjectID = require("mongodb").ObjectID;

exports.editGoal = async (req, res, next) => {
    const db = await mongo.getGolDb();
    const collection = db.collection("goals");
    const updatedFields = getUpdatedFields(req.body);
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
};

function getUpdatedFields(request) {
    const updatedFields = {};
    updatedFields.updated_date = moment().toString();
    if (!!request.goal_title) {
        updatedFields.goal_title = request.goal_title;
    }
    if (request.goal_description) {
        updatedFields.goal_description = request.goal_description;
    }
    if (!!request.priority) {
        updatedFields.priority = request.priority;
    }
    if (!!request.goal_type) {
        updatedFields.goal_type = request.goal_type;
    }
    if (request.actual_val) {
        updatedFields.actual_val = request.actual_val;
    }
    if (request.target_val) {
        updatedFields.target_val = request.target_val;
    }

    return updatedFields;
}
