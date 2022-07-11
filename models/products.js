const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const Joi = require("joi");

const productSchema = new Schema({});
const Product = model("product", productSchema);

module.exports = {
  Product,
};
