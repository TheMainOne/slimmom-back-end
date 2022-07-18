const { Schema, model } = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcryptjs');

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 8,
      maxlength: 100,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      minlength: 3,
      maxlength: 254,
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      minlength: 3,
      maxlength: 254,
    },
    token: {
      type: String,
      default: null,
    },
    userData: {
      currentWeight: { type: Number, default: null },
      height: { type: Number, default: null },
      age: { type: Number, default: null },
      desiredWeight: { type: Number, default: null },
      bloodType: { type: Number, enum: [1, 2, 3, 4], default: null },
      dailyRate: { type: Number, default: null },
      bannedProducts: { type: Array, default: null },
    },
  },
  { versionKey: false, timestamps: true },
);

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const joiRegisterSchema = Joi.object({
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{8,100}$/)
    .min(8)
    .max(100)
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .min(3)
    .max(254)
    .required()
    .messages({
      'string.email': "email should be a type of 'email'",
      'string.empty': 'email cannot be an empty field',
    }),
  name: Joi.string().min(3).max(254).required().messages({
    'string.base': "name should be a type of 'text'",
    'string.empty': 'name cannot be an empty field',
    'any.required': 'missing required name field',
  }),
  userData: Joi.object({
    currentWeight: Joi.number().integer(),
    height: Joi.number().integer(),
    age: Joi.number().integer(),
    desiredWeight: Joi.number().integer(),
    bloodType: Joi.number().valid(1, 2, 3, 4),
    dailyRate: Joi.number().integer(),
    bannedProducts: Joi.array(),
  }),
});

const joiLoginSchema = Joi.object({
  password: Joi.string().alphanum().min(8).max(100).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .min(3)
    .max(254)
    .required()
    .messages({
      'string.email': "email should be a type of 'email'",
      'string.empty': 'email cannot be an empty field',
    }),
});

const joiDailyNormaSchema = Joi.object({
  currentWeight: Joi.number().integer().min(20).max(500).allow(null).required(),
  height: Joi.number().integer().min(100).max(250).allow(null).required(),
  age: Joi.number().integer().min(18).max(100).allow(null).required(),
  desiredWeight: Joi.number().integer().min(20).max(500).allow(null).required(),
  bloodType: Joi.number().valid(1, 2, 3, 4).allow(null).required(),
});

const User = model('user', userSchema);

module.exports = {
  User,
  joiRegisterSchema,
  joiLoginSchema,
  joiDailyNormaSchema,
};
