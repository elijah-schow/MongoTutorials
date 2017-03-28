const { expect } = require('chai')
const User = require('../user.js')

describe('validating records', () => {
  it('requires a user name', (/*done*/) => {
    const user = new User({name: undefined})
    /* asynchronously validate user
    Takes a callback
    Useful for asynchronous types of validation
    user.validate( (callback) => {
      callback to handle validationResultObject
      done()
    })
    Alternatively,
    Synchronously validate user with validateSync
    returns a validation object. */
    const validationResult = user.validateSync()
    const { message } = validationResult.errors.name
    expect(message).to.equal('Name is required.')
  })

  it('requires a user\'s name to be capitalized correctly', (/*done*/) => {
    const user = new User({name: 'ari'})
    /* asynchronously validate user
    Takes a callback
    Useful for asynchronous types of validation
    user.validate( (callback) => {
      callback to handle validationResultObject
      done()
    })
    Alternatively,
    Synchronously validate user with validateSync
    returns a validation object. */
    const validationResult = user.validateSync()
    const { message } = validationResult.errors.name
    expect(message).to.equal('Names must be properly capitalized.')
  })

  it('requires a user\'s name not to contain spaces', () => {
    const user = new User({name: 'Ari '})
    const validationResult = user.validateSync()
    const { message } = validationResult.errors.name
    expect(message).to.equal('Names must not contain spaces.')
  })

  it('disallows a user\'s name with spaces from being saved', (done) => {
    const user = new User({name: 'Ari '})
    user.save()
      .catch((validationResult) => {
        const { message } = validationResult.errors.name
        expect(message).to.equal('Names must not contain spaces.')
        done()
      })
  })
})