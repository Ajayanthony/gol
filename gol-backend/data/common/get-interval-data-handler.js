const mongo = require("./mongo-common-impl");
const Intervals = require("../../config/intervals").Intervals;

exports.getIntervalData = async (interval_type, interval_id) => {
  const db = await mongo.getGolDb();
  const collection = db.collection(
    Intervals.get(interval_type).collection_name
  );

  const query = {};
  query[Intervals.get(interval_type).id] = interval_id;
  console.log(query);
  const result = await collection.aggregate([
    { $match: query },
    {
      $lookup: {
        from: "goals",
        localField: "goals_list",
        foreignField: "_id",
        as: "goals_list",
      },
    },
  ]);

  let data;
  if (await result.hasNext()) {
    data = await result.next();
  }
  console.log(data);
  return data;
};
