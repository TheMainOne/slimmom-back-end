const { User } = require('../../models');
const { BadRequest } = require('http-errors');

const saveUserDataById = async (_id, userData) => {
  try {
    await User.findByIdAndUpdate(_id, { userData }, { new: true });
  } catch (error) {
    throw new BadRequest('User not found or cant Uppdate');
  }
};

module.exports = saveUserDataById;
