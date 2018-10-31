import messages from './messages';

interface ArrayType {
  type: Function;
}

const ArrayType: ArrayType = {
  type(errorMsg?: String) {
    return function (target: {}) {
      if (Object.prototype.toString.call(target)  === '[object Array]') {
        return false;
      }
      return {message: errorMsg} || {message: messages.array};
    };
  },
  // length(length: Number, errorMsg?: String) {
  //   return function (target: any) {
  //     invariant(typeCheck(target), 'Kya: array.length should only be applied on Array type')

  //     if (target.length !== length) {
  //       return errorMsg || messages.lengthMsg
  //     }
  //     return false
  //   }
  // },
  // max(length: Number, errorMsg?: String) {
  //   return function (target: any) {
  //     invariant(typeCheck(target), 'Kya: array.max should only be applied on Array type')

  //     if (target.length > length) {
  //       return errorMsg || messages.max
  //     }
  //     return false
  //   }
  // },
  // min(length: Number, errorMsg?: String) {
  //   return function (target: any) {
  //     invariant(typeCheck(target), 'Kya: array.min should only be applied on Array type')

  //     if (target.length < length) {
  //       return errorMsg || messages.min
  //     }
  //     return false
  //   }
  // },
};

export default ArrayType;
