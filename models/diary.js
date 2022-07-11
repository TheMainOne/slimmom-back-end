const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const Joi = require("joi");

const diarySchema = new Schema(
  {
    date: { type: String, required: true },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    title: { type: String, required: true },
    weight: { type: Number, required: true },
    kcal: { type: Number, required: true },
  },
  { versionKey: false }
);

const joiAddProductSchema = Joi.object({
  date: Joi.string().required(),
  title: Joi.string().required(),
  weight: Joi.number().required(),
  kcal: Joi.number().required(),
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
