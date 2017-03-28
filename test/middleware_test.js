const mongoose = require('mongoose')
const { expect } = require('chai')
const User = require('../user.js')
const BlogPost = require('../blogPost.js')

describe('Middleware', () => {
  let user, blogPost

  beforeEach((done) => {
    user = new User({ name: 'Ari'})
    blogPost = new BlogPost({ title: 'I <3 JS', content: 'bla bla bla'})
    user.blogPosts.push(blogPost)

    Promise.all([
      user.save(),
      blogPost.save()
    ])
      .then(() => done())
  })

  it('should remove a user\'s blog posts when a user is deleted', (done) => {
    user.remove()
    /*.count() returns the number of a model's instances in the database */
      .then(() => BlogPost.count())
      .then(blogPostcount => {
        expect(blogPostcount === 0)
        done()
      })
  })
})