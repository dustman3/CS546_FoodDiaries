const MongoClient = require("mongodb").MongoClient;

const settings = {
  mongoConfig: {
    serverUrl: "mongodb://localhost:27017/MyDB",
    database: "recipes"
  }
};

let fullMongoUrl =
  settings.mongoConfig.serverUrl + settings.mongoConfig.database;
let _connection = undefined;

let connectDb = () => {
  if (!_connection) {
    _connection = MongoClient.connect(fullMongoUrl,{ useNewUrlParser: true }).then(client => {
      var db = client.db('myrecipedb');
      return db;
      
    });
  }

  return _connection;

 
};

module.exports = connectDb;