const recipeData = require("./uploadData");
const userRoutes = require("./users");

let constructorMethod = app => {
  app.use("/uploaded", recipeData);
  app.use("/user", userRoutes);
};

module.exports = {
  rData: require("./uploadData"),
  users: require("./users")
};
