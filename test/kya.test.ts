/*
** @TODO: change kya from dist to src.
*/ 
import kya from '../dist'
const emailPattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

test(`
  kya validate function
  1) validate function returns a promise,
  2) Promise should resolve as an object like:
     {
       email: {
         valid: true
       }
     }
`, () => {
  const emailValidator = {
    type: 'string',
    email(target) {
      return emailPattern.test(target)
    }
  }
  const schema = kya({
    email: emailValidator,
  })

  const resultP = schema.validate({ email: 'jj@jj.jj' })

  // 1)
  expect(typeof resultP.then).toEqual('function')
  // 2)
  return resultP.then(result => {
    expect(result.email.valid).toEqual(true)
  })
})

function emailDomainPromise(target: String) {
  return new Promise(resolve => {
    setTimeout(function() {
      const targetDomain = target.split('@')[1]
      if (targetDomain === 'jj.jj') {
        resolve(true)
      } else {
        resolve(false)
      }
    }, 1000);
  });
}

test(`
  email field is email and with domain "jj.jj",
  domain data will be asynchronous
`, () => {
  const emailValidator = {
    type: 'string',
    email(target) {
      return emailPattern.test(target)
    },
    emailDomainPromise(value) {
      return emailDomainPromise(value)
    },
  }
  const schema = kya({
    email: emailValidator,
  })

  const resultP = schema.validate({ email: 'jj@jj.sjj' })

  // 1)
  expect(typeof resultP.then).toEqual('function')
  // 2)
  return resultP.then(result => {
    expect(result.email.valid).toEqual(false)
  })
})
