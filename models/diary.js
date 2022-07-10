const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const Joi = require("joi");

const diarySchema = new Schema({
  consumedProducts: [
    {
      title: { type: String, required: true },
      weight: { type: Number, required: true },
      kcal: { type: Number, required: true },
    },
  ],
  summary: {
    left: { type: Number, required: true },
    consumed: { type: Number, required: true },
    dailyRate: { type: Number, required: true },
    percentsOfNormal: { type: Number, required: true },
  },
  date: { type: String, required: true },
});

const joiAddProductSchema = Joi.object({
  date: Joi.date().required(),
  productId: Joi.string().required(),
  weight: Joi.number().required(),
});

const joiRemoveProductSchema = Joi.object({
  dayId: Joi.string().required(),
  productId: Joi.string().required(),
});

const joiDayInfoSchema = Joi.object({
  date: Joi.date().required(),
});

const Diary = model("diary", diarySchema);

module.exports = {
  Diary,
  joiAddProductSchema,
  joiRemoveProductSchema,
  joiDayInfoSchema,
};
