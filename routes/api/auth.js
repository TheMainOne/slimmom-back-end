const express = require("express");

const { auth: ctrl } = require("../../controllers");
const { validation, ctrlWrapper } = require("../../middlewares");
const { joiSchema } = require("../../models/user");
const router = express.Router();

router.post("/signup", validation(joiSchema), ctrlWrapper(ctrl.signup));

module.exports = router;
