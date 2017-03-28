const { expect } = require('chai')
const User = require('../user.js')

let Ari

describe('reading users from the database', () => {
  beforeEach((done)=>{
    Ari = new User({name: 'Ari'})
    Ari.save().then(() => { done() })
  })

  it('finds all users named Ari', (done) => {
    User.find({name: 'Ari'})
    .then((Aris)=>{
      
      // Mongo creates an id for each entry before ever saving it to the db
      expect(Aris[0]._id).to.deep.equal(Ari._id)
      /* Mongo wraps ids in an Objectid object - to access the id as a string use .toString()
      alternative to deep equal if not available
      expect(Aris[0]._id.toString()).to.deep.equal(Ari._id.toString())
      */
      done()
    })
  })

  it('finds a particular user by id', (done) => {
    User.findOne({_id: Ari._id})
      .then((oneAri)=>{
        expect(oneAri.name).to.equal('Ari')
        done()
      })
  })
  
})
