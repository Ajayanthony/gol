const MongoClient = require("mongodb").MongoClient;
const dbConfig = require("../../config/db.config");

exports.getGolDb = async () => {
    console.log(dbConfig.dbConnectionString);
    const client = await MongoClient.connect(
        dbConfig.dbConnectionString,
        {
            useUnifiedTopology: true,
        }
    );

    return client.db("gol_db");
};

exports.getClient = async () => {
    return await MongoClient.connect(dbConfig.dbConnectionString, {
        useUnifiedTopology: true,
    });
};
