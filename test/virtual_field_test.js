const { expect } = require('chai')
const User = require('../user.js')

describe('virtual fields', () => {
  it('checks postCount as a virtual field', (done) => {
    const user = new User({name: 'Ari', posts: [{title: 'the great adventure'}]})
    user.save()
      .then(() => User.findOne({name: 'Ari'}))
      .then((oneAri) => {
        expect(oneAri.postCount).to.equal(1)
        done()
      })
  })
})
