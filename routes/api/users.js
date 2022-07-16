const express = require('express');
const dailyNormaRouter = require('./dailyNorma');

const { users: ctrl } = require('../../controllers');
const { auth, ctrlWrapper } = require('../../middlewares');

const router = express.Router();

router.get('/current', auth, ctrlWrapper(ctrl.getCurrent));

router.use('/daily-norma', dailyNormaRouter);

module.exports = router;
