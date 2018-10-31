import messages from './messages';

interface ObjectType {
  type: Function;
}

const ObjectType: ObjectType = {
  type(errorMsg?: String) {
    return function (target: {}) {
      if (Object.prototype.toString.call(target) === '[object Object]') {
        return false;
      }
      return {message: errorMsg} || {message: messages.object};
    };
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
};

export default ObjectType;