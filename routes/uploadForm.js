const express = require("express");
const router = express.Router();
//const bcrypt = require("bcrypt");
//const usersdata = require("./data")
router.post("/", async (req, res) => {
    res.render("uploadfull");
});

module.exports = router;