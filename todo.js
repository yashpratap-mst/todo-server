const mongoose = require("mongoose");
const validator = require("validator");

//..........create new schema...........!!!!!!!!!!!!

const toDOSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
    trim: true,
    validate: [
      {
        validator: (value) => validator.isLength(value, { min: 1, max: 100 }),
        message: (props) => `${props.value} is not a valid title.`,
      },
      //  {
      //   validator: function (v) {
      //     return (!/^[A-Za-z0-9\s]+$/.test(v));
      //   },

      //   message: props => `${props.v} is not a valid title! Only letters and spaces are allowed.`,
      // }
    ],
  },

  description: {
    type: String,
    require: true,
    trim: true,
  },
  status: {
    type: String,
    require: true,
    enum: ["pending", "completed"],
    default: "pending",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

//...............create new models/collection

const toDo = new mongoose.model("toDo", toDOSchema);

module.exports = toDo;
