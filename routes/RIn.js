const path = require("path");

const constructorMethod = app => {
  app.get("/public/css/site.css", (req, res) => {
    res.sendFile(path.resolve("public/css/site.css"));
  });
  app.get("/data/users.js", (req, res) => {
    res.sendFile(path.resolve("data/users.js"));
  });
  app.get("/views/images.png", (req, res) => {
    res.sendFile(path.resolve("views/images.png"));
  });
};

module.exports = constructorMethod;
