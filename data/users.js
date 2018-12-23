const mongoCollections = require("./mongoCollections");
const users = mongoCollections.users;
const uuidv4 = require("node-uuid");
const bcrypt = require("bcrypt");
const saltRounds = 16;


let exportedMethods = {

  async getAllUsers() {
    try {
      const userCollection = await users();
      return userCollection.find({}).toArray();
    } catch (e) {
      throw e;
    }
  },

  async addUsers(username, password, firstName, lastName, email) {
    try {


      const userCollection = await users();
      const hashedPassword = await bcrypt.hash(password, saltRounds);//password
      return users().then(userCollection => {
        return userCollection.findOne({ username: username }).then(user => {
          if (!user) {
            return users().then(userCollection => {
              let newUser = {
                // _id: uuidv4(),
                _id: uuidv4.v4(),
                username: username,
                hashedPassword: hashedPassword,
                firstName: firstName,
                lastName: lastName,
                email: email,
                //_id: uuid.v4(), 
              };

              return userCollection
                .insertOne(newUser)
                .then(newInsertInformation => {
                  return newInsertInformation.insertedId;
                })
                .then(newId => {
                  return this.getUserById(newId);
                });
            });
          } else {
            return ("error")
          }
        });
      });
    } catch (error) {
      throw error;
    }
  },

  async getUserById(id) {
    if (!id) throw "id is empty"
    try {

      const userCollection = users();
      return users().then(userCollection => {
        return userCollection.findOne({ _id: id }).then(user => {
          if (!user) throw "Users not found";
          return user;
        });
      });

    } catch (error) {
      throw error;
    }
  },

  async checkUsers(username, password) {
    try {
      const userCollection = users();
      return users().then(userCollection => {
        return userCollection.findOne({ username: username }).then(user => {
          compareToMatch = bcrypt.compare(password, user.hashedPassword);
          return (compareToMatch)

        });
      });
    } catch (error) {
      throw error;
    }
  },

};

module.exports = exportedMethods;
