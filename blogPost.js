const mongoose = require('mongoose')
const Schema = mongoose.Schema

/*
comments will be an array
pass in to this array a configuration object
type specifies that it will be an array of ObjectId objects
ref is like a foreign key, telling it to look at the model 
by the name of Comment to populate this array
*/
const BlogPostSchema = new Schema({
  title: String,
  content: String,
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'comment'
  }]
})

const BlogPost = mongoose.model('blogPost', BlogPostSchema)

module.exports = BlogPost