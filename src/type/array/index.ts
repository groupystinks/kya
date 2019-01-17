import messages from './messages';
import { typeOptions } from '../../helper/getType';
import { isArray } from '../../helper/utils';
import { supportTypeValidate } from '../index';

interface ArrayType {
  type: Function;
}

const ArrayType: ArrayType = {
  type(errorMsg?: String, options: typeOptions = {}) {
    return function (target: {}) {
      if (!isArray(target)) { return {message: errorMsg} || {message: messages.array}; }

      if (options.arrayOf === undefined) {
        return false;
      }

      return supportTypeValidate[options.arrayOf].type(errorMsg, options)(target[0]);
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
