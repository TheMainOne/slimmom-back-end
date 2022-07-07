const { Schema, model } = require("mongoose");
const userSchema = Schema();

const User = model("user", userSchema);

module.exports = { User, joiSchema };
