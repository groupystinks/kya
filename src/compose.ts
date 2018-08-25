import * as invariant from 'invariant'
import isBypassing, { isEmpty } from './exist/bypass'
import requiredMsgDefault from './exist/messages'

/**
 * @param funcs validator functions which return error message or false if there's no error
 */
export default function compose(...funcs: Array<Function>): Function {
  const funcsLength = funcs.length

  // compose will accept at least one function. Otherwise, it's no point of using it.
  invariant(funcsLength !== 0, 'Kya: at least one function should be passed in')

  if (funcsLength === 1) {
    return async function (arg: any, bypass_flag: Boolean, errorMsg?: String ) {
      // if required mode is not turned on, we bypass empty condiction in each type of
      // validation.
      if (isEmpty(arg) && isBypassing(bypass_flag)) {
        return {valid: true}
      }
      // if arg is empty and bypassing is turned off, we return field required error.
      if (isEmpty(arg) && !isBypassing(bypass_flag)) {
        return {
          error: errorMsg || requiredMsgDefault.required,
          valid: false,
        }
      }

      try {
        const result = await funcs[0](arg)
        if (typeof result === 'string') {
          return {
            error: result,
            valid: false,
          }
        }
        return {
          valid: true
        }
      } catch(e) {
        return invariant(false, `Kya: ${e}`)
      }
    }
  }

  return funcs.reduceRight((a, b, index) => async (arg: any, bypass_flag: Boolean, errorMsg?: String ) => {
    // if required mode is not turned on, we bypass empty condiction in each type of
    // validation.
    if (isEmpty(arg) && isBypassing(bypass_flag)) {
      return {valid: true}
    }

    // if arg is empty and bypassing is turned off, we return field required error.
    if (isEmpty(arg) && !isBypassing(bypass_flag)) {
      return {
        error: errorMsg || requiredMsgDefault.required,
        valid: false,
      }
    }

    try {
      // if validator function return a 'string', that means error occur.
      // We prevent further evoking next validation function, making this loop dumb
      // executing the last function.
      const bout = await b(arg)
      if (typeof bout === 'string') {
        return {
          error: bout,
          valid: false
        }
      }

      const aout = await a(arg)
      // If it's the last item and there's no error, we end up returning valid = true
      if (funcsLength - 2 === index) {
        if (typeof aout === 'string') {
          return {
            error: aout,
            valid: false
          } 
        }
        return {
          valid: true,
        }
      }
      
      return aout
    } catch(e) {
      invariant(false, `Kya: ${e}`)
    }
  })
}
