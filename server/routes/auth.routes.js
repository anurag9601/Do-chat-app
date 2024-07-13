const express = require("express");
const { signup } = require("../controllers/auth.controller");

const router = express.Router()

router.get("/login", (req, res) => {
    res.send("This is login route");
})

router.post("/signin", signup)

module.exports = router;