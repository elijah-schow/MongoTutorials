const expect = require('chai').expect
const User = require('../user.js')

let Ari

describe('deleting users from the db', () => {
  beforeEach((done) => {
    Ari = new User({name: 'Ari'})
    Ari.save().then(()=>{ done() })
  })

  function checkDeleted(queryResult, done){
    queryResult
      .then(() => 
        // find all users by passing in an empty object to User.find
        User.findOne({name: 'Ari'}))
      .then((oneAri) => {
        expect(oneAri).to.equal(null)
        done()
      })
  }

  it('deletes a user by model instanace method remove', (done) => {
    // remove Ari from the database
    checkDeleted(Ari.remove(), done)
  })

  it('deletes a user by model class method remove', (done) => {
    // remove all instances of the User model with given name 'Ari'
    checkDeleted(User.remove({name: 'Ari'}), done)
  })

  it('deletes a user by model class method findOneAndRemove', (done) => {
    // remove the first instance of User that matches the given criteria
    checkDeleted(User.findOneAndRemove({name: 'Ari'}), done)
  })

  it('deletes a user by model class method findOneAndRemove', (done) => {
    // remove an instances of the User model with given id
    checkDeleted(User.findByIdAndRemove(Ari._id), done)
  })
})