const { expect } = require('chai')
const User = require('../user.js')

let Ari

describe('reading users from the database', () => {
  beforeEach((done)=>{
    Ari = new User({name: 'Ari'})
    Joe = new User({name: 'Joe'})
    Jim = new User({name: 'Jim'})
    John = new User({name: 'John'})
    Promise.all([Ari.save(), Joe.save(), Jim.save(), John.save()])
      .then(() => { done() })
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

  it('finds a particular user by id using findOne', (done) => {
    User.findOne({_id: Ari._id})
      .then((oneAri)=>{
        expect(oneAri.name).to.equal('Ari')
        done()
      })
  })

  it('uses skip and limit to select results', (done) => {
    /* sort takes an object argument with a field to sort by and 1 asc -1 desc
    skip says skip the first two results
    limit says take only two results */
    User.find({})
      .sort({name: 1})
      .skip(2)
      .limit(2)
      .then((users)=>{
        expect(users.length === 2)
        expect(users[0].name === 'Jim')
        expect(users[1].name === 'John')
        done()
      })
  })
  
})
