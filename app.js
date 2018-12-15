const express = require('express');
const app = express();
const configRoutes = require("./routes");
// const cookieParse = require('cookie-parser')
const bodyParser = require('body-parser')
const exphbs  = require('express-handlebars')

// app.use(cookieParse())

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.engine('handlebars', exphbs({defaultLayout: 'main'})); // config engine -->  various
app.set('view engine', 'handlebars');

app.use('/public', express.static(__dirname + '/public'))

configRoutes(app);
app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
    if (process && process.send) process.send({done: true}); // ADD THIS LINE
  });
  