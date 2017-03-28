const mongoose = require('mongoose')
const Schema = mongoose.Schema
const postSchema = require('./post.js')

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
  followers: Number,
  posts: [postSchema]
})

// virtual fields must be added post facto to the schema with .virtual()
// virtual fields can make use of JS getters, which allow one to set a function as a property
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get
// This function will take a this context of the object on which its a property
// Because of the dependence on the this context, we use a function() not a ()=>, which would 
// preserve the this from the context of the file rather than take it from the call to .get
UserSchema.virtual('postCount').get(function(){
  return this.posts.length
})

// these belong to the collection called user. Create it if it doesn't exist
// userSchema is the class that a User object should have
// User is a class/model for Users
const User = mongoose.model('user', UserSchema)

module.exports = User