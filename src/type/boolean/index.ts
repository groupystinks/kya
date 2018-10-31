import messages from './messages';

interface BooleanType {
  type: Function;
}

const BooleanType: BooleanType = {
  type(errorMsg?: String) {
    return function (target: {}) {
      if (typeof target === 'boolean') {
        return false;
      }
      return {message: errorMsg} || {message: messages.boolean};
    };
  }
};

export default BooleanType;