//  equivelant to expect = require('chai').expect
const { expect }  = require('chai')
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