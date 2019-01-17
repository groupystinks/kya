# Kya - Javascript Object Validation

## Kya is written to make object validation easier. It support JS native type, required field and easy customized validate function, all in single object as descriptor. The validation is asynchronous.

## Install

```bash
npm i kya --save
```

## Support type
- String
- Number
- Date
- Boolean
- Array
- Array<type> validation
- Nested object validation

### Examples
```javascript
  const usernameValidator = {
    required: true,
    type: String,
  }

  const schema = kya(
    {
      username: usernameValidator,
      telephone: Number,
    },
    {
      username: {
        required: 'username is required',
        type: 'Type error!'
      },
      telephone: {
        type: 'Type error!'
      },
    }
  )

  schema
    .validate({ username: 'kya', age: 19 })
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
type SupportType = String | Number | Boolean | Array<any> | Date | Object;
type Type = { type: string; } | SupportType;
type FieldSchema =
  (Type & {required?: boolean; }) &
  {
    [customrule: string]: any
  };
export interface Messages {
  [field: string]: Object;
}
```

There are two arguments, schema and message, in kya.
Schema is an object that specify fields you want to check, and in each field you wanna specify field schema, where your validation rule goes here.
Message is the error message it gonna show whenever your field validation is not valid.
