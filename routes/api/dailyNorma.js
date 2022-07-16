const express = require('express');
const router = express.Router();

const { auth, ctrlWrapper, validation } = require('../../middlewares');
const { joiDailyNormaSchema: schema } = require('../../models/user');
const { privateR, publicR } = require('../../controllers/users/getDailyNorma');

router.post('/private', auth, validation(schema), ctrlWrapper(privateR));

router.post('/public', validation(schema), ctrlWrapper(publicR));

module.exports = router;
