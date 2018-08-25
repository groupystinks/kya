import messages from './messages';

interface StringType {
  type: Function,
}

function typeCheck(target: any) {
  return typeof target === 'string'
}

const StringType: StringType = {
  type(errorMsg?: String) {
    return (target: any) => {
      if (typeCheck(target)) {return false}

      return errorMsg || messages.string
    }
  },

  // no support for common string pattern?

  // email(errorMsg?: String) {
  //   return function(target: any) {
  //     if (emailPattern.test(target)) {
  //       return false
  //     }
  //     return errorMsg || messages.email
  //   }
  // },
  // length(length: Number, errorMsg?: String) {
  //   return function (target: any) {
  //     invariant(typeCheck(target), 'Kya: string.length should only be applied on String type')

  //     if (target.length !== length) {
  //       return errorMsg || messages.lengthMsg
  //     }
  //     return false
  //   }
  // },
  // max(length: Number, errorMsg?: String) {
  //   return function (target: any) {
  //     invariant(typeCheck(target), 'Kya: string.max should only be applied on String type')

  //     if (target.length > length) {
  //       return errorMsg || messages.max
  //     }
  //     return false
  //   }
  // },
  // min(length: Number, errorMsg?: String) {
  //   return function (target: any) {
  //     invariant(typeCheck(target), 'Kya: string.min should only be applied on String type')

  //     if (target.length < length) {
  //       return errorMsg || messages.min
  //     }
  //     return false
  //   }
  // },
}

export default StringType
