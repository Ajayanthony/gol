const { getGolDb } = require("../../data/common/mongo-common-impl");
const { Intervals } = require("../../config/intervals");

async function getLtGoals(req, res, next) {
    const db = await getGolDb();
    const collection = db.collection(
        Intervals.get("LONGTERM").collection_name
    );

    const query = {};
    query[Intervals.get("LONGTERM").id] = "ajay";
    const list_name = req.params.tab;
    const result = await collection.aggregate([
        { $match: query },
        {
            $lookup: {
                from: "goals",
                localField: list_name,
                foreignField: "_id",
                as: "goals_list",
            },
        },
    ]);

    let data;
    if (await result.hasNext()) {
        data = (await result.next()).goals_list;
    }
    res.status(200).json({
        goals_list: data,
    });
}

module.exports = getLtGoals;