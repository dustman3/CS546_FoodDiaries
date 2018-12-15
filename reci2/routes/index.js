const userRoutes = require("./users");
const path = require("path");

const constructorMethod = app => {
  app.use("/", userRoutes);
  app.get("/public/site.css", (req, res) => {
    res.sendFile(path.resolve("publics/site.css"));
  });
  app.get("/data/users.js", (req, res) => {
    res.sendFile(path.resolve("data/users.js"));
  });
  app.get("/views/images.png", (req, res) => {
    res.sendFile(path.resolve("views/images.png"));
  });
  //app.use("/result", userRoutes);
  app.use("*", (req, res) => {
    res.status(404).json({error: "Route Not Found"});
  });
};

module.exports = constructorMethod;
