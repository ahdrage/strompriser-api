/* const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  monthValues: [Number],
});

module.exports = mongoose.model("Month", userSchema);
 */

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const yourSchema = new Schema({
  name: {
    type: String,
  },
  prices: [Number],
});

module.exports = mongoose.model("Month", yourSchema);
