const router = require("express").Router();
const controllerGitauth = require("../controller/git_auth/index")

router.post(
    "/gitTokenCallback",
    controllerGitauth.token_callback
);

router.post(
    "/removeGitUser",
    controllerGitauth.remove_user
);

module.exports = router;