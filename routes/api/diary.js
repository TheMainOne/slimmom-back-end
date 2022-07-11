const express = require("express");

const { diary: ctrl } = require("../../controllers");
const { auth, validation, ctrlWrapper } = require("../../middlewares");
const { joiAddProductSchema } = require("../../models/diary");

const router = express.Router();

router.post(
  "/",
  auth,
  validation(joiAddProductSchema),
  ctrlWrapper(ctrl.addProduct)
);

router.delete("/:productId", ctrlWrapper(ctrl.removeProduct));

module.exports = router;
