const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: {
    type: String,
    /*custom type validator*/
    validate: [
    {
      validator: name => name[0] === name[0].toUpperCase() && name.slice(1).split('').every(letter => letter !== letter.toUpperCase),
      message: 'Names must be properly capitalized.'
    },
    {
      validator: name => name.split('').every(letter => letter !== ' '),
      message: 'Names must not contain spaces.'
    }
    ],
    /*required type validator*/
    required: [true, 'Name is required.']
  },
  postCount: Number
})

// these belong to the collection called user. Create it if it doesn't exist
// userSchema is the class that a User object should have
// User is a class/model for Users
const User = mongoose.model('user', UserSchema)

module.exports = User