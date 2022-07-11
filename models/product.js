const { Schema, model } = require('mongoose');
const Joi = require('joi');

const productSchema = Schema(
  {
    categories: { type: Array },
    weight: { type: Number },
    title: {
      type: {
        ru: { type: String },
        ua: { type: String },
      },
    },

    calories: { type: Number },
    groupBloodNotAllowed: {
      type: Array,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiSchema = Joi.object({
  name: Joi.string().alphanum().min(2).max(30).required(),

  phone: Joi.required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),
  favorite: Joi.boolean(),
});

const Product = model('product', productSchema);

module.exports = { Product, joiSchema };
