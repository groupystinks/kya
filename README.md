# Kya - Javascript Object Validation

## Kya is written to make form validation easier. So it support JS type, required field and easy customized validate function, all in single object as descriptor.

## Install

```bash
npm i kya --save
```

### Examples
```javascript
  const usernameValidator = {
    required: true,
    type: 'string',
  }
  const telephoneValidator = {
    type: 'string',
    limit(value) {
      if (value.length < 5 || value.length > 13) {
        return false
      }
      return true;
    }
  }

  const schema = kya(
    {
      username: usernameValidator,
      telephone: telephoneValidator,
    },
    {
      username: {
        required: 'username is required',
        type: 'Type error!'
      },
      telephone: {
        type: 'Type error!',
        limit: 'Limit error!'
      },
    }
  )

  schema
    .validate({ username: 'kya', telephone: '1989230' })
    .then(result => {
      console.log('result', result) // { username: { valid: true }, telephone: { valid: true } }​​​​​
    })
```

## API
### kya
```typescript
  function kya(schema?: Schema, messages?: Messages): {
    validate: (target?: Object) => Promise<Object>;
    validateOn: (target?: Object, ...onfields: string[]) => Promise<Object>;
  };
```

```typescript
interface Schema {
  [field: string]: FieldSchema;
}
type FieldSchema =
  { type: string; } &
  {required?: boolean; } &
  {
    [customrule: string]: (value: any) => Promise<boolean> | boolean
  };
export interface Messages {
  [field: string]: Object;
}
```

There are two arguments, schema and message, in kya.
Schema is an object that specify fields you want to check, and in each field you wanna specify field schema, where your validation rule goes here.
Message is the error message it gonna show whenever your field validation is not valid.
