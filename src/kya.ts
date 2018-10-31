import * as invariant from 'invariant';
import compose from './compose';
import * as types from './type';
import requiredCompose from './exist/required';
import { isFuntion, isString } from './helper/utils';

export { default as compose } from './compose';

const noop = () => new Promise((resolve) => resolve({}));

export interface Schema {
  [field: string]: FieldSchema;
}

type Type = { type: string; };

export type FieldSchema =
  (Type & {required?: boolean; }) &
  {
    // tslint:disable-next-line:no-any
    [customrule: string]: (value: any) => Promise<boolean> | boolean
  };

export interface Messages {
  [field: string]: Object;
}

/**
 * @todo: fieldErrorMessages suport passed-in function that returns message.
 */
export interface FieldErrorMessages {
  // tslint:disable-next-line
  [rule: string]: any // Function | String;
}

function getValidator(fieldSchmea: FieldSchema, fieldMessages: FieldErrorMessages, field: string): Function {
  invariant(fieldSchmea.type, `Kya: type is nessasray in ${field}\'s schema`);
  const { type, required, ...rest } = fieldSchmea;
  // adaptation API into inner logic which return false mean validation correct, and return string
  // mean validation error.
  const rules = Object.keys(rest).map((ruleKey) => {
    const fieldMsgProducer = (fieldMessages[ruleKey] || '');
    // tslint:disable-next-line:no-any
    return async (value: any) => {
      let fieldMsg;

      if (isFuntion(fieldMsgProducer)) {
        // we make fieldMsgProducer is executable by isFunction.
        fieldMsg = fieldMsgProducer(value) || '';
      } else if (isString(fieldMsgProducer)) {
        fieldMsg = fieldMsgProducer;
      } else {
        invariant(false, 'Kya: message field should be either Function or String');
      }

      return await rest[ruleKey](value) ? false : { message: fieldMsg };
    };
  });

  const composed = compose(types[type].type(fieldMessages.type), ...rules);

  if (required) {
    return requiredCompose(composed, fieldMessages.required);
  }

  return composed;
}

export default function kya(schema: Schema = {}, messages: Messages = {}) {

  async function validate(target: Object = {}): Promise<Object> {
    const fields = Object.keys(schema);
    const results = await fields.reduce(
      async (accuP, field) => {
        const schemaObj = schema[field];
        const messagesObj = messages[field] || {};

        if (!schemaObj) {return accuP; }

        const validator = getValidator(schemaObj, messagesObj, field);
        const result = await validator(target[field]);
        const accuResult = await accuP;

        return Promise.resolve({
          ...accuResult,
          [field]: result
        });
      },
      noop()
    );

    return results;
  }

  async function validateOn(target: Object = {}, ...onfields: Array<string>): Promise<Object> {
    const results = await onfields.reduce(
      async (accuP, field) => {
        const schemaObj = schema[field];
        const messagesObj = messages[field] || {};

        if (!schemaObj) {return accuP; }

        const validator = getValidator(schemaObj, messagesObj, field);
        await validator(target[field])
          // tslint:disable-next-line:no-any
          .then((result: any) => {
            accuP.then((accu) => {
              accu[field] = result;
            });
          });
        return accuP;
      },
      noop()
    );

    return results;
  }

  return {
    validate,
    validateOn,
  };
}
