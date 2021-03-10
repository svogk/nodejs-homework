const express = require("express");
const router = express.Router();
const validate = require("./validation");
const usersController = require("../../../controllers/users");
const guard = require("../../../helpers/guard");

router.post("/auth/register", validate.regUser, usersController.reg);
router.post("/auth/login", validate.loginUser, usersController.login);
router.post("/auth/logout", guard, usersController.logout);
router.get("/current", guard, usersController.currentUser);

module.exports = router;
