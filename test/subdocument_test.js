const { expect } = require('chai')
const User = require('../user.js')

describe('savig subdocuments', () => {
  it('allows a user to have posts', (done) => {
    const user = new User({ name: 'Ari', posts: [{JS: 'Me and JS'}] })
    user.save()
      .then(() => User.findOne({_id: user._id}) )
      .then((oneUser) => {
        expect(oneUser.posts.length).to.equal(1)
        done()
      })
  })

  it('allows a post to be added to a user', (done) => {
    const user = new User({ name: 'Ari', posts: [{JS: 'Me and JS'}] })
    user.save()
      .then(() => User.findOne({name: 'Ari'}))
      .then((oneAri) => {
        // simply push new subdocuments
        oneAri.posts.push({ title: 'New Post'})
        return oneAri.save()
      })
      .then(() => User.findOne({name: 'Ari'}))
      .then((oneAri) => {
        expect(oneAri.posts[1].title).to.equal('New Post')
        done()
      })
  })

  it('allows a post to be removed from a user', (done) => {
    const user = new User({ name: 'Ari', posts: [{JS: 'Me and JS'}] })
    user.save()
      .then(() => User.findOne({name: 'Ari'}))
      .then((oneAri) => {
        // use Mongo's .remove() rather than Array manipulation to remove subdocuments
        oneAri.posts[0].remove()
        return oneAri.save()
      })
      .then(() => User.findOne({name: 'Ari'}))
      .then((oneAri) => {
        expect(oneAri.posts.length).to.equal(0)
        done()
      })
  })

})