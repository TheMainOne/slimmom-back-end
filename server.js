const mongoose = require("mongoose");
require("dotenv").config();

const { DB_HOST, PORT = 4000 } = process.env;

const app = require("./app");

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT);
    console.log(`Server started on PORT = ${PORT}`);
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
