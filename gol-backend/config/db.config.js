let user = process.env.MONGO_USER;
let pwd = process.env.MONGO_PWD;
let url = process.env.HOST_URL;
let port = process.env.PORT;

exports.dbConnectionString =
    "mongodb://" + user + ":" + pwd + "@" + url + ":" + port + "/gol%5fdb";
