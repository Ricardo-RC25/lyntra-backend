const router = require("express").Router();
const { getProfile } = require("../controllers/user.controller");
const verifyToken = require("../middlewares/auth.middleware");

router.get("/profile", verifyToken, getProfile);

module.exports = router;
