const recipeData = require("./uploadData");

let constructorMethod = app => {
  app.use("/uploaded", recipeData);
};

module.exports = {
  rData: require("./uploadData")
};
