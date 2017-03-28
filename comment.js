const mongoose = require('mongoose')
const Schema = mongoose.Schema

/*
pass in to the author field a configuration object
Type says that it will be an ObjectId
ref is like a foreign key, telling it to look at the model 
by the name of Comment to populate this array
*/
const commentSchema = new Schema({
  content: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
})

const Comment = mongoose.model('comment', commentSchema)

module.exports = Comment