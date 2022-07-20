const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const Joi = require("joi");

const diarySchema = new Schema(
  {
    date: { type: String, default: Date.now() },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    consumedProducts: {
      type: [
        {
          _id: { type: String, required: true },
          title: {
            type: Object,
            ua: {
              type: String,
            },
            en: {
              type: String,
            },
          },
          weight: { type: Number, required: true },
          kcal: { type: Number, required: true },
        },
      ],
      default: [],
    },
    total: { type: Number, default: 0 },
  },
  { versionKey: false }
);

const joiAddProductSchema = Joi.object({
  id: Joi.string().required(),
  weight: Joi.number().required(),
});

const Diary = model("diary", diarySchema);

module.exports = {
  Diary,
  joiAddProductSchema,
};
