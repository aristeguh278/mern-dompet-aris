const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose.connect(process.env.DB_CONNECT, options, (err, db) => {
  if (err) console.error(err);
  else console.log(` database connection`);
});

module.exports = { mongoose };
