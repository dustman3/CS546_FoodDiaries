const recepieRoutes = require("./recepies");
const uploadform = require("./uploadForm");
const uploadData = require("./uploadData");

const path = require("path");
const cookieParser = require("cookie-parser");


const constructorMethod = app => {

    app.use(cookieParser());

    app.use("/", recepieRoutes);
    app.use("/uploadForm", uploadform);
    app.use("/uploadRecepieData", uploadData);


    app.use("*", (req, res) => {
        res.redirect("/");
    });
};

module.exports = constructorMethod;