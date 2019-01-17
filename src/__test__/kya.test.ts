/* tslint:disable */
import kya from '../kya';
import getType from '../helper/getType';
const emailPattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

function emailDomainPromise(target: String) {
  return new Promise(resolve => {
    setTimeout(function() {
      const targetDomain = target.split('@')[1];
      if (targetDomain === 'jj.jj') {
        resolve(true);
      } else {
        resolve(false);
      }
    },         1000);
  });
}

describe('kya validation', () => {
  test(`
    1) validate function returns a promise,
    2) Promise should resolve as an object like:
      {
        email: {
          valid: true
        }
      }
  `,
  () => {
    const emailValidator = {
      type: String,
      email(target) {
        return emailPattern.test(target);
      }
    };
    const schema = kya({ email: emailValidator });

    const resultP = schema.validate({ email: 'jj@jj.jj' });

    // 1)
    expect(typeof resultP.then).toEqual('function');
    // 2)
    return resultP.then(result => {
      expect(result.email.valid).toEqual(true);
    });
  });

  test(`
    email field is email and with domain "jj.jj",
    domain data will be asynchronous
  `,   () => {
    const emailValidator = {
      type: String,
      email(target) {
        return emailPattern.test(target);
      },
      emailDomainPromise(value) {
        return emailDomainPromise(value);
      },
    };
    const schema = kya(
      {
        email: emailValidator,
        number: {
          type: 'number'
        }
      },
      {
        number: {
          type: 'NOT A NUMBER'
        }
      }
    );

    const resultP = schema.validate({ email: 'jj@jj.sjj', number: 'not number' });

    // 1)
    expect(typeof resultP.then).toEqual('function');
    // 2)
    return resultP.then(result => {
      expect(result.email.valid).toEqual(false);
      expect(result.number.valid).toEqual(false);
    });
  });
});

describe('kya types', () => {

  test('helper function getType should return supported type in Kya', () => {
    const [typeString] = getType(String);
    const [typeNumber] = getType(Number);
    const [typeBoolean] = getType(Boolean);
    const [typeArray] = getType(Array);
    const [typeDate] = getType(Date);
    const [typeObject] = getType({
      type: {
        start: {type: Number},
        end: {type: Number},
      }
    });

    expect(typeString).toEqual('string');
    expect(typeNumber).toEqual('number');
    expect(typeBoolean).toEqual('boolean');
    expect(typeArray).toEqual('array');
    expect(typeDate).toEqual('date');
    expect(typeObject).toEqual('object');
  })

  test('type in schema specify field type', async () => {
    const schema = kya({
      nameField: String,
      fruitField: [Number],
      dateField: Date,
      booleanField: Boolean,
      mixField: {
        start: [Number],
        end: String
      },
      nested: {
        required: true,
        type: {
          position: [Number],
          team: {
            apple: String,
            banana: String,
          },
        }
      },
    })

    const result = await schema.validate({
      nameField: 123,
      fruitField: [1],
      dateField: 1,
      booleanField: true,
      mixField: {
        start: [1],
        end: '10',
      },
      nested: {
        position: [1,2,3,4,5],
        team: {
          apple: 'Apple',
          banana: 'Banana',
        },
      },
    });

    expect(result.nameField.valid).toBe(false);
    expect(result.fruitField.valid).toBe(true);
    expect(result.dateField.valid).toBe(false);
    expect(result.booleanField.valid).toBe(true);
    expect(result.mixField.valid).toBe(true);
    expect(result.nested.valid).toBe(true);
  });
});
