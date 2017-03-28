const chai = require('chai')
const expect = chai.expect
const User = require('../user.js')

describe('CRUD tests', () => {
  it('creates users', (done) => {
    const Ari = new User({name: 'Ari'})
    // .save returns a promise
    Ari.save()
    .then(()=>{
      // isNew means has not yet been saved into the Database
      expect(Ari.isNew).to.be.false
      done()
    })
  })
})