const router = require("express").Router();
const git_auth = require("./git_auth");

router.use("/gitAuth", git_auth);

module.exports = router;
