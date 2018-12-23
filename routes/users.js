const express = require("express");
const router = express.Router();
const data = require("../data");
const userData = data.users;
let xss = require('xss')
module.exports = router;

router.get("/", async (req, res) => {
  try {
    if (req.cookies.AuthCookie) {
      res.status(200).redirect("/");
    } else {
      res.status(200).render("users/in", {css: "login.css"});
    }
  } catch (error) {
    res.status(404).render("error", { error: "Error: Page not found", css: "error.css" });
  }
});

router.get("/signup", async (req, res) => {
  res.status(200).render("users/sign", {css:"signup.css"});
});


router.post("/login", async (req, res) => {
  let body = req.body;
  try {
    const username = xss(body.username)
    const password = xss(body.password)

    const body1 = await userData.checkUsers(username, password);
    if (body1 === true) {
      res.cookie("AuthCookie", username, { maxAge: 36000000 });
      res.status(200).redirect("/")
    } else {
      res.status(200).render("users/in", { message: "Invalid username or password!", css: "login.css" });
    }
  } catch (e) {
    //res.sendStatus(500);
    res.status(200).render("users/in", { message: "Invalid username or password!", css: "login.css" });
  }
});

router.get("/logout", async (req, res) => {
  res.clearCookie("AuthCookie");
  res.status(200).render("users/logout", {
    notice: "You are logged out!", 
    css:"logout.css"
  });
});

router.post("/sign", async (req, res) => {
  let body = req.body;
  console.log(req.body);
  try {
    const username = xss(body.username)
    const password = xss(body.password)
    const firstName = xss(body.firstName)
    const lastName = xss(body.lastName)
    const Email = xss(body.email)

    const userDetails = await userData.addUsers(username, password, firstName, lastName, Email);
    if (userDetails == "error") {
      res.status(200).render("users/sign", { message: "This username already exists!", css: "signup.css" });
    } else {
      res.status(200).render("users/in", {
        notice: "now you have signed up successfully!", css: "login.css"
      });
    }
  } catch (e) {
    res.status(500).render("error", { error: e, css: "error.css" });
  }
});
