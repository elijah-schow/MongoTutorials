const { expect } = require('chai')
const User = require('../user.js')

let Ari

describe('updating users', () => {
  beforeEach((done) => {
    Ari = new User({ name: 'Ari', postCount: 1 })
    Ari.save().then(() => done())
  })

  function checkUpdated(queryResult, done){
    queryResult
      .then(() => 
        // find all users by passing in an empty object to User.find
        User.find({}))
      .then((Users) => {
        expect(Users.length).to.equal(1)
        expect(Users[0].name).to.equal('Joe')
        done()
      })
  }
  
  // this is a good method for one update at a time
  // e.g. maybe you have conditional changes based on API calls
  it('updates users with instance methods set and save', (done) => {
    Ari.set('name', 'Joe')
    checkUpdated(Ari.save(), done)
  })

  // this is useful for updating in one line
  it('updates user with instance method update', (done) => {
    checkUpdated(Ari.update({name: 'Joe'}), done)
  }) 

  
  it('updates user with class method findOneAndUpdate', (done) => {
    checkUpdated(User.findOneAndUpdate({name: 'Ari'}, {name: 'Joe'}), done)
  })

  it('updates user with class method update', (done) => {
    checkUpdated(User.findByIdAndUpdate(Ari._id, {name: 'Joe'}), done)
  })

  it('decrements a user postCount with update operator $inc', (done) => {
    User.findOneAndUpdate({name: 'Ari'}, {$inc: {postCount: -1}} )
      .then(() => User.findOne({name: 'Ari'}))
      .then((oneAri) => {
        expect(oneAri.postCount).to.equal(0)
        done()
      })
  })
})