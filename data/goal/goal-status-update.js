const mongo = require("../common/mongo-common-impl");
const moment = require("moment");
const ObjectID = require("mongodb").ObjectID;

exports.updateGoalStatus = async (req, res, next) => {
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
    result: result.result.nModified
  });
};

function getUpdatedFields(request) {
  const updatedFields = {};

  updatedFields.status = request.status;
  updatedFields.updated_date = moment().toString();

  if (request.status !== "in_progress" && !!request.close_comment) {
    updatedFields.close_comment = request.close_comment;
  }

  return updatedFields;
}
