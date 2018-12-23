const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
const configRoutes = require("./routes");
const exphbs = require("express-handlebars");
// const expressfileupload = require("express-fileupload");
const static = express.static(__dirname + "/public");
app.use("/public", static);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

configRoutes(app);

app.listen(3000, function () {
    console.log("Server is up and listening to port 3000!");
    console.log("Navigate to http://localhost:3000 to access it");
});