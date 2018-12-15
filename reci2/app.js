const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const static = express.static(__dirname + "/public");
const cookieParser = require("cookie-parser");

const userData = require("./data/users");

const configRoutes = require("./routes");
const exphbs = require("express-handlebars");

app.use("/public", static);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieParser());
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.get("/", async(req, res) => {
  console.log(req.cookies);
    if(req.cookies.AuthCookie){

      res.redirect("/private");
     
   }else{
    
    res.render("users/in");
    
   }
});

app.get("/signup",async(req, res) => {
    
    res.render("users/sign");
  
});


app.post("/login", async (req, res) => {
  let body = req.body;

  try {

    const body1=  await userData.checkUsers(body.username,body.password);
    if(body1=== true){
      
      res.cookie("AuthCookie",body.username,{maxAge:36000000});

      res.redirect("/private")
    }else{
      res.render("users/in",{message:"invalid username or password!"});
     
    }
       
  } catch (e) {
    //res.sendStatus(500);
    res.render("users/in",{message:"invalid username or password!"});
  }
});


  const needProtect= (req,res,next)=> {
    if (!req.cookies.AuthCookie){
      res.status(403).json({error:"you are not logged in! Log in first!"});
    }else{
      next();
    }
  }


  app.get("/private", needProtect, async(req, res) => {
    var body = req.query;
    var body1=  await userData.getUsers(req.cookies.AuthCookie);
    console.log(body1);
    res.render("users/single",body1);
    //res.render("users/success");
    res.status(500);
   
  });
   

    app.get("/logout", async(req, res) => {

      res.clearCookie("AuthCookie");
      res.render("users/logout",{
        notice:"now you have been logged out!",
      });
    });

    app.post("/sign", async (req, res) => {
      let body = req.body;
    
      try {
    
        const bo=  await userData.addUsers(body.username,body.password,body.firstName,body.lastName,body.Email);
        console.log(bo);
        res.render("users/signwell",{
          notice:"now you have signed up successfully!",
        });
           
      } catch (e) {
        res.sendStatus(500);
      }
    });

configRoutes(app);

app.listen(3000, function() {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
  if (process && process.send) process.send({done: true}); 
});
