const recepieRoutes = require("./recepies");
const uploadform = require("./uploadForm");
const uploadData = require("./uploadData");
const userRoutes = require("./users");
const RIn = require("./RIn")
const cookieParser = require("cookie-parser");


const constructorMethod = app => {

    app.use(cookieParser());
    app.use("/userlogin", userRoutes);
    app.use("/RIn",RIn);   
    app.use("/", recepieRoutes);
    app.use("/uploadForm", uploadform);
    app.use("/uploadRecepieData", uploadData);
    app.get("/aboutus", function(req, res){
        res.render('aboutus'), { css: "style.css"}});

    app.use("*", (req, res) => {
        res.redirect("/");
    });
};

module.exports = constructorMethod;