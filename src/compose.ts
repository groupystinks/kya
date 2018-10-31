import * as invariant from 'invariant';
import isBypassing, { isEmpty } from './exist/bypass';
import requiredMsgDefault from './exist/messages';
import { isObject } from './helper/utils';

/**
 * @param funcs validator functions which return error message or false if there's no error
 */
export default function compose(...funcs: Array<Function>): Function {
  const funcsLength = funcs.length;

  // compose will accept at least one function. Otherwise, it's no point of using it.
  invariant(funcsLength !== 0, 'Kya: at least one function should be passed in');

  if (funcsLength === 1) {
    // tslint:disable-next-line:variable-name
    return async function (arg: {}, BYPASS_FLAG: Boolean, errorMsg?: String ) {
      // if required mode is not turned on, we bypass empty condiction in each type of
      // validation.
      if (isEmpty(arg) && isBypassing(BYPASS_FLAG)) {
        return {valid: true};
      }
      // if arg is empty and bypassing is turned off, we return field required error.
      if (isEmpty(arg) && !isBypassing(BYPASS_FLAG)) {
        return {
          message: errorMsg || requiredMsgDefault.required,
          valid: false,
        };
      }

      try {
        const result = await funcs[0](arg);
        if (isObject(result)) {
          return {
            message: result.message,
            valid: false,
          };
        }
        return {
          valid: true
        };
      } catch (e) {
        return invariant(false, `Kya: ${e}`);
      }
    };
  }

  // Abstract array of validation functions as one function ready to take argument to be validated.
  return funcs.reduceRight((a, b, index) => async (arg: {}, BYPASS_FLAG: Boolean, errorMsg?: String ) => {
    // if required mode is not turned on, we bypass empty condiction in each type of
    // validation.
    if (isEmpty(arg) && isBypassing(BYPASS_FLAG)) {
      return {valid: true};
    }

    // if arg is empty and bypassing is turned off, we return field required error.
    if (isEmpty(arg) && !isBypassing(BYPASS_FLAG)) {
      return {
        message: errorMsg || requiredMsgDefault.required,
        valid: false,
      };
    }

    try {
      // if validator function return a 'string', that means error occur.
      // We prevent further evoking next validation function, making this loop dumb
      // executing the last function.
      const bout = await b(arg);
      if (isObject(bout)) {
        return {
          message: bout.message,
          valid: false
        };
      }

      const aout = await a(arg);
      // If it's the last item and there's no error, we end up returning valid = true
      if (funcsLength - 2 === index) {
        if (isObject(aout)) {
          return {
            message: aout.message,
            valid: false
          }; 
        }
        return {
          valid: true,
        };
      }
      
      return aout;
    } catch (e) {
      invariant(false, `Kya: ${e}`);
    }
  });
}
