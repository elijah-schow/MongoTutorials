const mongoose = require('mongoose')
const { expect } = require('chai')
const User = require('../user.js')
const Comment = require('../comment.js')
const BlogPost = require('../blogPost.js')

describe('Associations', (done) => {
  let user, blogPost, comment
  beforeEach((done) => {
    user = new User({ name: 'Ari'})
    blogPost = new BlogPost({ title: 'I <3 JS', content: 'bla bla bla'})
    comment = new Comment({content: 'sure is'})
    // behind the scenes Mongo is, probably using a setter, setting up references to objectId
    // here rather than taking the whole object as if it were a subdocument
    user.blogPosts.push(blogPost)
    blogPost.comments.push(comment)
    comment.author = user

    Promise.all([
      user.save(),
      blogPost.save(),
      comment.save()
    ])
      .then(() => done())
  })
  
  it('should load a user\'s blog posts', (done) => {
    // use populate to fill in the array of blogPost ids with blogPost models
    // populate can recursively populate within a populated field
    // Pass in a path (field name) and a model from with which to populate from that path
    // Note that the model declaration is only necessary in nested populate calls
    User.findOne({name: 'Ari'})
      .populate({
        path: 'blogPosts',
        populate: {
          path: 'comments',
          model: 'comment',
          populate: {
            path: 'author',
            model: 'user'
          }
        }
      })
      .then((oneAri) => {
        expect(oneAri.blogPosts[0].title === 'I <3 JS')
        expect(oneAri.blogPosts[0].comments[0].content === 'bla bla bla')
        expect(oneAri.blogPosts[0].comments[0].author.name === 'Ari')
        done()
      })
  })
})