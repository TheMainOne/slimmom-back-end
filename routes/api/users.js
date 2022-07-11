const express = require('express');

const { users: ctrl } = require('../../controllers');
const { auth, ctrlWrapper, validation } = require('../../middlewares');
const { getDailyInfo, saveDailyInfo } = require('../../controllers/users');
const { joiDailyInfoSchema: schema } = require('../../models/user');
const router = express.Router();

router.get('/current', auth, ctrlWrapper(ctrl.getCurrent));

router.get(
  '/daily-norma',
  auth,
  ctrlWrapper(getDailyInfo.privarR),
  saveDailyInfo,
);

router.post(
  '/daily-norma',
  validation(schema),
  ctrlWrapper(getDailyInfo.publicR),
);

module.exports = router;
