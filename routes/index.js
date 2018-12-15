const search = require("./search");

const express = require('express');
// const cookieParser = require('cookie-parser');
const app = express();
// while todoItems is a function, so lets do this




// app.use(cookieParser());


const constructorMethod = app => {
 
  app.get('/', function(req, res){
   
    res.redirect('/search')
    
  })
  app.use("/search", search);
  //in stead of app.use("/result", result) ,just put them together

  app.use("*", (req, res) => {
    res.status(404).render("error")
    });
};
module.exports = constructorMethod;