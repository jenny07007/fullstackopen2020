const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    minlength: 3,
    require: true,
    uniqueCaseInsensitive: true
  },
  number: {
    type: String,
    unique: true,
    validate: {
      validator: function(v) {
        return /^\d{10}$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    minlength: 8,
    require: true
  }
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

personSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Person", personSchema);
