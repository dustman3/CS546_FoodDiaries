const express = require("express");
const router = express.Router();
//const bcrypt = require("bcrypt");
//const usersdata = require("./data")
router.get("/", async (req, res) => {
    res.render("upload");
});

module.exports = router;