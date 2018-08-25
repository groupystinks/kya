import messages from './messages';

interface ObjectType {
  type: Function,
}

const ObjectType: ObjectType = {
  type(errorMsg?: String) {
    return function (target: any) {
      // To determine whether target is an object, use toString to detect object class.
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString#Using_toString()_to_detect_object_class
      if (Object.prototype.toString.call(target) === '[object Object]') {
        return false
      }
      return errorMsg || messages.object
    }
  },

  // // Object keys list
  // keys(keys: Array<string>, errorMsg?: string) {
  //   return function (target: any) {
  //     keys.forEach(key => {
  //       if (typeof target[key] === 'undefined') {
  //         return errorMsg || messages.key
  //       }
  //       return false
  //     })
  //   }
  // }
}

export default ObjectType