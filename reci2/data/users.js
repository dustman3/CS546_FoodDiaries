const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const uuidv4= require('uuid/v4');

const bcrypt = require("bcrypt");
const saltRounds = 16;


let exportedMethods = {
  async getAllUsers() {
    const userCollection = users();
    return users().then(userCollection => {
    return userCollection.find({}).toArray();
  
  });
  
  },
  async addUser(username,hashedPassword,firstName,lastName,email) {
    const userCollection = users();
    return users().then(userCollection => {
      let newUser = {
        _id: uuidv4(),
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
  },
  async addUsers(username,password,firstName,lastName,email) {
    const userCollection = users();
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return users().then(userCollection => {
      let newUser = {
        _id: uuidv4(),
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
  },

  async getUserById(id) {
    const userCollection = users();
    return users().then(userCollection => {
      return userCollection.findOne({ _id: id }).then(user => {
        if (!user) throw "Users not found";

        return user;
      });
    });
  },

  async checkUsers(username,password) {
    const userCollection = users();
    return users().then(userCollection => {
      return userCollection.findOne({ username: username }).then(user => {
     
      compareToMatch = bcrypt.compare(password, user.hashedPassword);
      return(compareToMatch)
  
});
});

    },

    async  getUsers(username){
      const userCollection = users();
    return users().then(userCollection => {
      return userCollection.findOne({ username: username }).then(user => {
          if(user.username==username){
           var list= new Object();
            list._id=user._id;
            list.username=user.username;
            list.firstName=user.firstName;
            list.lastName=user.lastName;
            list.email=user.email;
          }
            return list;
          });
        });
  }
  
}

module.exports = exportedMethods;
