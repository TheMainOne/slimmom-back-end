const express = require('express');

const { users: ctrl } = require('../../controllers');
const { auth, ctrlWrapper, validation } = require('../../middlewares');
const { getDailyNorma, saveDailyNorma } = require('../../controllers/users');
const { joiDailyNormaSchema: schema } = require('../../models/user');
const router = express.Router();

router.get('/current', auth, ctrlWrapper(ctrl.getCurrent));

router.get(
  '/daily-norma',
  auth,
  ctrlWrapper(getDailyNorma.privarR),
  saveDailyNorma,
);

router.post(
  '/daily-norma',
  validation(schema),
  ctrlWrapper(getDailyNorma.publicR),
);

module.exports = router;
