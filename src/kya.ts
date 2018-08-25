import compose from './compose';
import * as types from './type';
import requiredCompose from './exist/required';

export { default as compose } from './compose'

const noop = () => new Promise((resolve)=> resolve({}))

export interface Schema {
  [field: string]: FieldSchema;
}

export interface FieldSchema {
  type: string;
  required?: boolean;
  [field: string]: any;
}

export interface Messages {
  [field: string]: any
}

export interface FieldErrorMessages {
  [field: string]: any;
}

function getValidator(fieldSchmea: FieldSchema, fieldMessages: FieldErrorMessages = {}): Function {
  const { type, required, ...rest } = fieldSchmea;
  // adaptation API into inner logic which return false mean validation correct, and return string
  // mean validation error.
  const rules = Object.keys(rest).map((ruleKey) => {
    const fieldMsg = (fieldMessages[ruleKey] || '')
    return async (value: any) => {
      return await rest[ruleKey](value) ? false : fieldMsg
    }
  });

  const composed = compose(types[type].type(fieldMessages.type), ...rules);

  if (required) {
    return requiredCompose(composed, fieldMessages.required);
  }

  return composed;
}

export default function kya(schema: Schema = {}, messages: Messages = {}) {

  async function validate(target:Object = {}): Promise<Object> {
    const fields = Object.keys(schema)
    const results = await fields.reduce(async (accuP, field) => {
      const schemaObj = schema[field];
      const messagesObj = messages[field];
      const validator = getValidator(schemaObj, messagesObj);

      await validator(target[field])
        .then((result: any) => {
          accuP.then((accu) => {
            accu[field] = result
          })
        })
      return accuP
    }, noop())

    return results
  }

  async function validateOn(target:Object = {}, ...onfields: Array<string>): Promise<Object> {
    const results = await onfields.reduce(async (accuP, field) => {
      const schemaObj = schema[field];
      const messagesObj = messages[field];
      const validator = getValidator(schemaObj, messagesObj);

      await validator(target[field])
        .then((result: any) => {
          accuP.then((accu) => {
            accu[field] = result
          })
        })
      return accuP
    }, noop())

    return results
  }

  return {
    validate,
    validateOn,
  }
}
