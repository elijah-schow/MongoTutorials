const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: String,
  postCount: Number
})

// these belong to the collection called user. Create it if it doesn't exist
// userSchema is the class that a User object should have
// User is a class/model for Users
const User = mongoose.model('user', UserSchema)

module.exports = User