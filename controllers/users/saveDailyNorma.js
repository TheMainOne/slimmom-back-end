const { User } = require('../../models');
const { BadRequest } = require('http-errors');

const saveDailyNorma = async ({ user: { _id, userData } }, res, next) => {
  try {
    await User.findByIdAndUpdate(_id, { userData }, { new: true });
  } catch (error) {
    next(BadRequest('User not found or cant Uppdate'));
  }
};

module.exports = saveDailyNorma;
