const express = require('express');
const { products: ctrl } = require('../../controllers');
const { auth, ctrlWrapper } = require('../../middlewares');

const router = express.Router();

router.get('/', auth, ctrlWrapper(ctrl.getAllProducts));

module.exports = router;
