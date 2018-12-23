const express = require("express");
const router = express.Router();
const requireCookie = require("./users");

router.get("/", async (req, res) => {
    try {
        if (req.cookies.AuthCookie) {
            res.status(200).render("uploadfull", { css: "form.css" });
        }
        else {
            res.status(200).redirect("/userlogin");
        }
    } catch (error) {
        res.status(404).render("error", { error: "Error: Page not found", css: "error.css" });
    }
});

router.get("/video", async (req, res) => {

    try {
        if (req.cookies.AuthCookie) {
            res.status(200).render("uploadVideo", { css: "form.css" });
        }
        else {
            res.status(200).redirect("/userlogin");
        }
    } catch (error) {
        res.status(404).render("error", { error: "Error: Page not found", css: "error.css" });
    }
});


module.exports = router;