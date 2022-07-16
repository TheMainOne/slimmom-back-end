const express = require('express');
const router = express.Router();

const { auth, ctrlWrapper, validation } = require('../../middlewares');
const { saveDailyNorma } = require('../../controllers/users');
const { joiDailyNormaSchema: schema } = require('../../models/user');
const { privateR, publicR } = require('../../controllers/users/getDailyNorma');

router.post(
  '/private',
  auth,
  validation(schema),
  ctrlWrapper(privateR),
  saveDailyNorma,
);

router.post('/public', validation(schema), ctrlWrapper(publicR));

module.exports = router;
