const settings= require("./settings");
const mongoClient = require("mongodb").MongoClient;
const config = settings.config;

let _db = undefined;
let _connection = undefined;

module.exports = async ()=> {
    if(!_connection){
        _connection = await mongoClient.connect(config.serverURL);
        _db= await _connection.db(config.database);
    }
    return _db;
};