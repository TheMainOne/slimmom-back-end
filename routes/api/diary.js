const express = require("express");

const { diary: ctrl } = require("../../controllers");
const { auth, validation, ctrlWrapper } = require("../../middlewares");
const {
  joiAddProductSchema,
  joiRemoveProductSchema,
  joiDayInfoSchema,
} = require("../../models/diary");

const router = express.Router();

router.post(
  "/",
  auth,
  validation(joiAddProductSchema),
  ctrlWrapper(ctrl.addProduct)
);

router.delete(
  "/",
  auth,
  validation(joiRemoveProductSchema),
  ctrlWrapper(ctrl.removeProduct)
);

router.post(
  "/day",
  auth,
  validation(joiDayInfoSchema),
  ctrlWrapper(ctrl.infoPerDay)
);

module.exports = router;
