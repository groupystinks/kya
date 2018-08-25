import messages from './messages';

interface NumberType {
  type: Function,
}

const NumberType: NumberType = {
  type(errorMsg?: String) {
    return function (target: any) {
      if (
        typeof target === 'number' &&
        !isNaN(target)
      ) {
        return false
      }
      return errorMsg || messages.number
    }
  },
  // max(value: Number, errorMsg?: String) {
  //   return function (target: any) {
  //     invariant(typeCheck(target), 'Kya: number.max should only be applied on Number type')

  //     if (target > value) {
  //       return errorMsg || messages.max
  //     }
  //     return false
  //   }
  // },
  // min(value: Number, errorMsg?: String) {
  //   return function (target: any) {
  //     invariant(typeCheck(target), 'Kya: number.max should only be applied on Number type')

  //     if (target < value) {
  //       return errorMsg || messages.min
  //     }
  //     return false
  //   }
  // },
}

export default NumberType